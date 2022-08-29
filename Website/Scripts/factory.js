class Factory
{

  constructor (address, factoryABI, derivativeABI)
  {
    this.address = address
    this.abi = factoryABI
    this.derivativeABI = derivativeABI
    this.domEventElements = []
    this.loadFromBlockchain().then(
      result =>
      {
        this.watchForNewDerivatives()
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
            reject("Bad news... Please select an account!")

          this.web3contract = new window.web3.eth.Contract(this.abi,this.address)
          this.info = {}

          window.web3FactoryContract = this.web3contract

          resolve(this.info)
        }
      	else {
          reject(new Error("Bad news... No Web3 detected!"))
      	}
      }
    )
  }

  watchForNewDerivatives()
  {
    this.web3contract.events.NewContract
    (
      {fromBlock: 0},
      (error, event) =>
      {
        if (!event.removed)
        {
          new Derivative(event.returnValues.contractAddress,this.derivativeABI,event.transactionHash)
        }
      }
    )
    .on('error', console.error)
  }

}
