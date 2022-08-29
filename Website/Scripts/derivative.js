// Requires 'userAccount.js => checkUserAccount()'

class Derivative
{

  constructor (address, abi, transactionHash)
  {
    this.address = address
    this.abi = abi
    this.transactionHash = transactionHash

    this.domEventElements = []

    this.loadFromBlockchain().then(
      derivativeInfo =>
      {
        // All DOMs which should react on events:
        this.attachNewElement("buyLongTableBody")
        this.attachNewElement("buyShortTableBody")
        this.attachNewElement("makerTableBody")
        this.attachNewElement("acquiredTableBody")
        this.attachNewElement("dueTableBody")
        this.attachNewElement("buttonQuickBuy")
        this.attachNewElement("buyModal")
        this.attachNewElement("quickAcquireModal")
        this.attachNewElement("makerModal")
        this.attachNewElement("takerModal")
        this.attachNewElement("pastDueDateModal")

        this.dispatchEvent(new CustomEvent('NewDerivative', { detail: this.info }))

        this.watchDerivativeAlteration()
      },
      error =>
      {
        // console.log(error);
      }
    )
  }

  loadFromBlockchain ()
  {
    return new Promise(
      async (resolve, reject) =>
      {
        if (typeof web3 !== 'undefined') {

          if (window.userAccount == "undefined")
            reject(new Error("Bad news... No Web3 detected!"))

          this.web3contract = new window.web3.eth.Contract(this.abi,this.address)

          try
          {
            var returnValues = await Promise.all([
              this.web3contract.methods.masterAddress().call(),
              this.web3contract.methods.withdrawFunctionsAddress().call(),
              this.web3contract.methods.dueDate().call(),
              this.web3contract.methods.strikePrice().call(),
              this.web3contract.methods.creatorLong().call(),
              this.web3contract.methods.stakes(window.userAccount).call(),
              this.web3contract.methods.creator().call(),
              this.web3contract.methods.countCounterparties().call(),
              this.web3contract.methods.totalStakeCounterparties().call(),
              this.web3contract.methods.settlementPrice().call(),
              this.web3contract.methods.isSettled().call()
            ])
            this.info = {
              factory: returnValues[0],
              withdrawContract: returnValues[1],
              dueDate: returnValues[2],
              strikePrice: returnValues[3],
              makerLong: returnValues[4],
              stakes_User: returnValues[5],
              maker: returnValues[6],
              numberOfTakers: returnValues[7],
              totalStakeAllTakers: returnValues[8],
              settlementPrice: returnValues[9],
              isSettled: returnValues[10]
            }
            this.info.stakes_Maker = await this.web3contract.methods.stakes(this.info.maker).call()
            this.info.address = this.address
            this.info.abi = this.abi
            this.info.web3contract = this.web3contract

            this.info.transactionHash = this.transactionHash

            resolve(this.info)
          }
          catch (e)
          {
            this.info = {
              address: this.address,
              transactionHash: this.transactionHash
            }
            reject(new Error(this.address + ' could not be read. Could be selfdestructed. Message: "' + e + '".'))
          }


        }
      	else {
          reject(new Error("Bad news... No Web3 detected!"))
      	}
      }
    )
  }

  watchDerivativeAlteration()
  {
    this.web3contract.events.ContractAltered
    (
      {filter: {}, fromBlock: 'latest'},
      (error, event) =>
      {
        this.loadFromBlockchain().then
        (
          derivativeInfo =>
          {
            this.dispatchEvent(new CustomEvent('DerivativeAltered', { detail: this.info }))
          },
          error =>
          {
            console.log(error);
            this.dispatchEvent(new CustomEvent('DerivativeAltered', { detail: this.info }))
          }
        )
      }
    )
    .on('error', console.error);
  }

  attachNewElement (newDomElementID)
  {
    this.domEventElements.push(newDomElementID)
  }

  dispatchEvent (eventToDispatch)
  {
    for (var i = 0; i < this.domEventElements.length; i++)
    {
      var elem = document.getElementById(this.domEventElements[i])
      elem.dispatchEvent(eventToDispatch)
    }
  }

}
