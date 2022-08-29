function modal (modalType, derivativeInfo, amountToAcquireOfContract) {
  if (modalType == "createModal"){
    analyticsDB('createbutton');
    if (document.getElementById('selectUnderlying1').value == 1){
      document.getElementById('create_modal_asset').innerHTML = 'SPX';
			unit = "";
		}
    if (document.getElementById('selectLS').checked){
      document.getElementById('create_modal_ls').innerHTML = 'Short';
    }
    else{
      document.getElementById('create_modal_ls').innerHTML = 'Long';
    }
    document.getElementById('create_modal_lev').innerHTML = '2x';
    document.getElementById('create_modal_stake').innerHTML = parseFloat(document.getElementById('selectStake').value).toFixed(1) + " ETH";
    document.getElementById('create_modal_baseprice').innerHTML = parseFloat(document.getElementById('selectStrikePrice').value).toFixed(2);
		document.getElementById('create_modal_duedate').innerHTML = toJJJJMMDD(duedate);

		// Set Creation Confirmation button:
    var confirmCreation = document.getElementById("confirmCreation")

    // Info for freebie:
    if (window.userAccount != undefined)
    {
      var makerLong = document.getElementById("create_modal_ls").innerHTML
      makerLong = toEthereumMakerLong(makerLong,"maker")

      var dueDate = document.getElementById("create_modal_duedate").innerHTML
      dueDate = toEthereumDueDate(dueDate)

      var strikePrice = document.getElementById("create_modal_baseprice").innerHTML
      strikePrice = toEthereumStrikePrice(strikePrice)

      var stake = document.getElementById("create_modal_stake").innerHTML
      stake = toEthereumStake(stake)

      console.log("Confirmation for a contract required. Following parameters are passed to contract: Maker in long position: " + "'" + makerLong + "'. Due date: '" + dueDate + "'. Strike price: '" + strikePrice + "'. Stake: '" + stake + "'" );

      create_modal_freebieText.style.display = "none"


      var acceptTerms = document.getElementById("terms1")
  		confirmCreation.onclick = null

      console.log(makerLong,dueDate,strikePrice,window.userAccount,stake);
      console.log(window.web3FreebieContract);
      window.web3FreebieContract.methods
        .createContractWithBounty(makerLong,dueDate,strikePrice)
        .estimateGas({from: window.userAccount, value: stake}, (error, result) =>
        {
          if (!error) {
            estimatedCosts = result * 5 * window.web3.utils.toWei('1', 'gwei');
            console.log(estimatedCosts);
            estimatedCosts = window.web3.utils.fromWei(estimatedCosts.toString(), 'ether');
            console.log("Costs for this transaction: " + result + " gas which equals " + estimatedCosts + " ETH for 5 GWei gas costs.");
            create_modal_freebieText.style = {}
            confirmCreation.onclick = async () =>
        			{
                if (!termsAndConditionsAccepted (acceptTerms)) return;

                window.web3FreebieContract.methods.createContractWithBounty
                  (
                    makerLong,
                    dueDate,
                    strikePrice
                  )
                  .send({from: window.userAccount, value:  stake})
                  .on('transactionHash', async (hash) =>{
                      await makersDB(hash);
                      analyticsDB('signcreate');
                      this.modal("feedbackModal");
                  });
                modal.style.display = "none";
              }
          }
          else
          {
            confirmCreation.onclick = async () =>
              {
                if (!termsAndConditionsAccepted (acceptTerms)) return;

                window.web3FactoryContract.methods.createConditionalPayment
                (
                  window.userAccount,
                  makerLong,
                  dueDate,
                  strikePrice
                )
                .send({from: window.userAccount, value:  stake})
                .on('transactionHash', async (hash) =>{
                    await makersDB(hash);
                    analyticsDB('signcreate');
                    this.modal("feedbackModal");
                });
                modal.style.display = "none";
              }
          }
        })
    }
    else{
      confirmCreation.onclick = async () =>
        {
          modal.style.display = "none";
          this.modal('noEthereumModal');
        }
    }
  }
	if (modalType == "buyModal"){
    analyticsDB('acquiretableitem', derivativeInfo.address)
    if (window.userAccount == undefined){
      this.modal('noEthereumModal');
    }
    document.getElementById('buy_modal_linkToEtherscan').href = "//ropsten.etherscan.io/address/" + derivativeInfo.address
    document.getElementById('buy_modal_contractAddress').innerHTML = "Contract: " + derivativeInfo.address + ""
		document.getElementById('buy_modal_underlying').innerHTML = "SPX";
		document.getElementById('buy_modal_type').innerHTML = toJSMakerLong(derivativeInfo.makerLong, "taker");
		document.getElementById('buy_modal_stake').innerHTML = toJSStake(derivativeInfo.stakes_Maker-derivativeInfo.totalStakeAllTakers).toFixed(1) +" ETH";
    document.getElementById('buy_modal_numberTakers').innerHTML = derivativeInfo.numberOfTakers;
		document.getElementById('buy_modal_leverage').innerHTML = "2x";
		document.getElementById('buy_modal_strikeprice').innerHTML = toJSStrikePrice(derivativeInfo.strikePrice).toFixed(2);
		document.getElementById('buy_modal_duedate').innerHTML = toJJJJMMDD(derivativeInfo.dueDate);
		document.getElementById('buy_modal_amountToBuy').value = toJSStake(derivativeInfo.stakes_Maker-derivativeInfo.totalStakeAllTakers).toFixed(1);

    // Set Acquire Button:

		var confirmBuy = document.getElementById("confirmBuy")
		confirmBuy.onclick = null
		confirmBuy.onclick = async () =>
			{
        var acceptTerms = document.getElementById('terms2');
        if (!termsAndConditionsAccepted (acceptTerms)) return;

        var stake = document.getElementById("buy_modal_amountToBuy").value
			  stake = toEthereumStake(stake)

        var strikePrice = document.getElementById("buy_modal_strikeprice").innerHTML
        strikePrice = toEthereumStrikePrice(strikePrice)

			  console.log("Confirmation for a contract required. Following parameters are passed to contract: Stake: '" + stake + "', Strike Price: '" + strikePrice + "'" )
        derivativeInfo.web3contract.methods.signContract(strikePrice)
          .send({from: window.userAccount, value:  stake})
          .on('transactionHash', async (hash) =>{
              analyticsDB('signenter');
              this.modal("feedbackModal");
          });

				modal.style.display = "none";
			}
	}
  if (modalType == "quickAcquireModal"){
    var acceptTerms = document.getElementById('terms3');
    acceptTerms.checked = false;
    var totalStake = 0;
    var meanStrikePrice = 0;
    var old_tbody = document.getElementById("quickAcquireTable");
    var new_tbody = document.createElement('tbody');
    new_tbody.setAttribute("id", "quickAcquireTable");
    for (i = 0; i < derivativeInfo.length; i++) {
      totalStake += toJSStake(amountToAcquireOfContract[derivativeInfo[i].address]);
      meanStrikePrice +=  toJSStake(amountToAcquireOfContract[derivativeInfo[i].address])*toJSStrikePrice(derivativeInfo[i].strikePrice);
      var row = new_tbody.insertRow(i);
      row.className='modal_derivative';
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      cell1.className = 'modal_derivativeinfo';
      cell2.className = 'modal_derivativeinfo';
      cell3.className = 'modal_derivativeinfo';
      cell1.innerHTML = derivativeInfo[i].address.substring(0,10) + "...";
      cell2.innerHTML = toJSStake(amountToAcquireOfContract[derivativeInfo[i].address])+ " ETH";
      cell3.innerHTML = toJSStrikePrice(derivativeInfo[i].strikePrice);
    }
    old_tbody.parentNode.replaceChild(new_tbody, old_tbody)
    meanStrikePrice = meanStrikePrice/totalStake;
    document.getElementById('quickAcquireModal_underlying').innerHTML = "SPX";
		document.getElementById('quickAcquireModal_type').innerHTML = toJSMakerLong(derivativeInfo[0].makerLong, "taker");
		document.getElementById('quickAcquireModal_stake').innerHTML = totalStake.toFixed(1) +" ETH";
		document.getElementById('quickAcquireModal_leverage').innerHTML = "2x";
    document.getElementById('quickAcquireModal_strikeprice').innerHTML = meanStrikePrice.toFixed(2);
		document.getElementById('quickAcquireModal_duedate').innerHTML = toJJJJMMDD(derivativeInfo[0].dueDate);

    // Set Quick Confirmation Acquire Button:

    var confirmQuickAcquire = document.getElementById("confirmQuickAcquire")
		confirmQuickAcquire.onclick = null
		confirmQuickAcquire.onclick = async () =>
			{
        if (!termsAndConditionsAccepted (acceptTerms)) return;

        for (var i = 0; i < derivativeInfo.length; i++)
        {
          derivativeInfo[i].web3contract.methods.signContract(derivativeInfo[i].strikePrice)
          .send({from: window.userAccount, value:  amountToAcquireOfContract[derivativeInfo[i].address]})
          .on('transactionHash', async (hash) =>{
              this.modal("feedbackModal");
          });
        }
      }
  }
	if (modalType == "makerModal"){
    document.getElementById('maker_modal_linkToEtherscan').href = "//ropsten.etherscan.io/address/" + derivativeInfo.address
    document.getElementById('maker_modal_contractAddress').innerHTML = "Contract: " + derivativeInfo.address + ""
		document.getElementById('maker_modal_underlying').innerHTML = "SPX";
		document.getElementById('maker_modal_type').innerHTML = toJSMakerLong(derivativeInfo.makerLong, "maker");
		document.getElementById('maker_modal_stake').value = toJSStake(derivativeInfo.stakes_User).toFixed(1);
    document.getElementById('maker_modal_stake').placeholder = toJSStake(derivativeInfo.stakes_User).toFixed(1);
		document.getElementById('maker_modal_acquiredStake').innerHTML = toJSStake(derivativeInfo.totalStakeAllTakers).toFixed(1) +" ETH";
		document.getElementById('maker_modal_leverage').innerHTML = "2x";
		document.getElementById('maker_modal_strikeprice').value = toJSStrikePrice(derivativeInfo.strikePrice).toFixed(2);
    document.getElementById('maker_modal_strikeprice2').innerHTML = toJSStrikePrice(derivativeInfo.strikePrice).toFixed(2);
    document.getElementById('maker_modal_strikeprice').placeholder = toJSStrikePrice(derivativeInfo.strikePrice).toFixed(2);
		document.getElementById('maker_modal_duedate').innerHTML = toJJJJMMDD(derivativeInfo.dueDate);
		document.getElementById('maker_modal_currentPrice').innerHTML = tickerPrice;
		var pl = calculatePL(toJSStrikePrice(derivativeInfo.strikePrice), tickerPrice, toJSMakerLong(derivativeInfo.makerLong, "maker"))
		document.getElementById('maker_modal_pl').innerHTML = (pl*100).toFixed(2) + "%";
		document.getElementById('maker_modal_value').innerHTML = (calculateValue(pl, toJSStake(derivativeInfo.stakes_User))).toFixed(2) + " ETH";
    document.getElementById('maker_modal_pl').style.fontWeight = "600";
		document.getElementById('maker_modal_value').style.fontWeight = "600";
		if (pl<0) {
			document.getElementById('maker_modal_pl').style.color = "#EF5350";
			document.getElementById('maker_modal_value').style.color = "#EF5350";
		}
		else {
			document.getElementById('maker_modal_pl').style.color = "#26A69A";
			document.getElementById('maker_modal_value').style.color = "#26A69A";
		}
    var maker_modal_button_copyLinkToShare = document.getElementById("maker_modal_button_copyLinkToShare")
		maker_modal_button_copyLinkToShare.onclick = null
		maker_modal_button_copyLinkToShare.onclick = () => copyShareLinkToClipboard(derivativeInfo.address)
    var maker_modal_row_copyLinkToShare = document.getElementById("maker_modal_row_copyLinkToShare")

    var withdrawRemainderButton = document.getElementById("withdrawRemainderButton")
		if (toJSStake(derivativeInfo.totalStakeAllTakers) == 0) {
      maker_modal_row_copyLinkToShare.style = {};
      withdrawRemainderButton.style.display = "inline-block";
			document.getElementById('maker_modal_status').innerHTML = "Waiting for counterparties";
      document.getElementById('maker_modal_updateStrikePrice').style.display = "inline-block";
      document.getElementById('maker_modal_strikeprice').style.display = "inline-block";
      document.getElementById('maker_modal_strikeprice2').style.display = "none";
		}
		else {
      if (derivativeInfo.totalStakeAllTakers < derivativeInfo.stakes_User)
      {
        var remainingStake = toJSStake(derivativeInfo.stakes_User - derivativeInfo.totalStakeAllTakers)
        maker_modal_row_copyLinkToShare.style = {};
        withdrawRemainderButton.style.display = "inline-block";
  			document.getElementById('maker_modal_status').innerHTML = remainingStake + " ETH remaining to be matched by counterparties";
        document.getElementById('maker_modal_updateStrikePrice').style.display = "none";
        document.getElementById('maker_modal_strikeprice').style.display = "none";
        document.getElementById('maker_modal_strikeprice2').style.display = "inline-block";
      }
      else
      {
        maker_modal_row_copyLinkToShare.style.display = "none";
        withdrawRemainderButton.style.display = "none";
  			document.getElementById('maker_modal_status').innerHTML = "Full stake matched by counterparties";
        document.getElementById('maker_modal_updateStrikePrice').style.display = "none";
        document.getElementById('maker_modal_strikeprice').style.display = "none";
        document.getElementById('maker_modal_strikeprice2').style.display = "inline-block";
      }
    }

    // Set update stake button:

		var maker_modal_updateStake = document.getElementById("maker_modal_updateStake")
		maker_modal_updateStake.onclick = null
		maker_modal_updateStake.onclick = async () =>
			{
			  var newStake = document.getElementById("maker_modal_stake").value
			  newStake = toEthereumStake(newStake)

        // Distinguish between adding and reducing stake

        if (parseInt(newStake) > parseInt(derivativeInfo.stakes_Maker))
        {
          var BN = web3.utils.BN
          stakeToAdd = new BN(newStake).sub(new BN(derivativeInfo.stakes_Maker)).toString()
          console.log("Increasing stake of " + derivativeInfo.address + " by: " + toJSStake(stakeToAdd))

          if (window.userAccount != undefined)
          {
            derivativeInfo.web3contract.methods.addStake()
             .send({from: window.userAccount, value:  stakeToAdd})
             .on('transactionHash', (hash) => {
               document.getElementById('maker_modal_updateStake').style.display = "none"
             })
             .on('receipt', (receipt) => {
               document.getElementById('maker_modal_updateStake').style.display = "inline-block";
             })
          }

        }
        else
        {
          var BN = web3.utils.BN
          stakeToSubtract = new BN(derivativeInfo.stakes_Maker).sub(new BN(newStake)).toString()
          console.log("Reducing stake of " + derivativeInfo.address + " by: " + toJSStake(stakeToSubtract))

          if (window.userAccount != undefined)
          {
            derivativeInfo.web3contract.methods.reduceStake(stakeToSubtract)
              .send({from: window.userAccount})
              .on('transactionHash', (hash) => {
                document.getElementById('maker_modal_updateStake').style.display = "none"
              })
              .on('receipt', (receipt) => {
                document.getElementById('maker_modal_updateStake').style.display = "inline-block"
              })
          }
        }

      }

    // Set update strike price button:

		var maker_modal_updateStrikePrice = document.getElementById("maker_modal_updateStrikePrice")
		maker_modal_updateStrikePrice.onclick = null
		maker_modal_updateStrikePrice.onclick = async () =>
			{
			  var newStricePrice = document.getElementById("maker_modal_strikeprice").value
			  newStricePrice = toEthereumStrikePrice(newStricePrice)

        if (window.userAccount == undefined)
        {
          // Try to ask for permission again:
          if (window.ethereum)
          {
            window.web3 = new Web3(ethereum);
            try
            {
              await ethereum.enable()
              checkUserAccount().then(
                user =>
                {
                  derivativeInfo.web3contract.methods.changeStrikePrice(newStricePrice)
          			  .send({from: window.userAccount})
                  .then(init())
                }
              )
            }
            catch (error)
            {
              console.log('Access denied.');
            }
          }
          else
          {
            console.log('Not possible. No account detected.');
          }
        }
        else
        {
          derivativeInfo.web3contract.methods.changeStrikePrice(newStricePrice)
          .send({from: window.userAccount})
        }
      }

    // Set emergency withdraw button:

		var withdrawRemainderButton = document.getElementById("withdrawRemainderButton")
		withdrawRemainderButton.onclick = null
		withdrawRemainderButton.onclick = async function ()
			{
        // Withdraws maximum amount (== stake of maker) set amount to maximum

        if (window.userAccount == undefined)
        {
          // Try to ask for permission again:
          if (window.ethereum)
          {
            window.web3 = new Web3(ethereum);
            try
            {
              await ethereum.enable()
              checkUserAccount().then(
                user =>
                {
                  derivativeInfo.web3contract.methods.reduceStake(derivativeInfo.stakes_Maker)
          			  .send({from: window.userAccount})
                  .then(init())
                }
              )
            }
            catch (error)
            {
              console.log('Access denied.');
            }
          }
          else
          {
            console.log('Not possible. No account detected.');
          }
        }
        else
        {
          derivativeInfo.web3contract.methods.reduceStake(derivativeInfo.stakes_Maker)
          .send({from: window.userAccount})
        }

      }

    // Withdraw Freebie
    var getFreebieButton = document.getElementById("getFreebieButton")
    getFreebieButton.style.display = "none"
    getFreebieButton.onclick = null

    window.web3FreebieContract.methods
      .withdrawBounty()
      .estimateGas({from: window.userAccount}, (error, result) =>
      {
        if (!error) {
          estimatedCosts = result * 5 * window.web3.utils.toWei('1', 'gwei');
          estimatedCosts = window.web3.utils.fromWei(estimatedCosts.toString(), 'ether');
          console.log("Costs for this transaction: " + result + " gas which equals " + estimatedCosts + " ETH for 5 GWei gas costs.");
          // Withdraw via Freebie possible
          getFreebieButton.style.display = "block"
          getFreebieButton.onclick = async () =>
          {
            if (!(window.userAccount == undefined))
            {
              window.web3FreebieContract.methods
                .withdrawBounty()
                .send({from: window.userAccount})
            }
          }
        }
      });

	}
	if (modalType == "takerModal"){
		document.getElementById('taker_modal_underlying').innerHTML = "SPX";
		document.getElementById('taker_modal_type').innerHTML = toJSMakerLong(derivativeInfo.makerLong, "taker");
		document.getElementById('taker_modal_stake').innerHTML = toJSStake(derivativeInfo.stakes_User).toFixed(1) +" ETH";
    document.getElementById('taker_modal_numberTakers').innerHTML = derivativeInfo.numberOfTakers;
		document.getElementById('taker_modal_leverage').innerHTML = "2x";
		document.getElementById('taker_modal_strikeprice').innerHTML = toJSStrikePrice(derivativeInfo.strikePrice).toFixed(2);
		document.getElementById('taker_modal_duedate').innerHTML = toJJJJMMDD(derivativeInfo.dueDate);
		document.getElementById('taker_modal_currentPrice').innerHTML = tickerPrice;
		var pl = calculatePL(toJSStrikePrice(derivativeInfo.strikePrice), tickerPrice, toJSMakerLong(derivativeInfo.makerLong, "taker"))
		document.getElementById('taker_modal_pl').innerHTML = (pl*100).toFixed(2) + "%";
		document.getElementById('taker_modal_value').innerHTML = (calculateValue(pl, toJSStake(derivativeInfo.stakes_User))).toFixed(2) + " ETH";
		document.getElementById('taker_modal_pl').style.fontWeight = "600";
		document.getElementById('taker_modal_value').style.fontWeight = "600";
		if (pl<0) {
			document.getElementById('taker_modal_pl').style.color = "#EF5350";
			document.getElementById('taker_modal_value').style.color = "#EF5350";
		}
		else {
			document.getElementById('taker_modal_pl').style.color = "#26A69A";
			document.getElementById('taker_modal_value').style.color = "#26A69A";
		}
	}
	if (modalType == "pastDueDateModal"){
		document.getElementById('pastDueDate_modal_underlying').innerHTML = "SPX";
		if (derivativeInfo.maker != window.userAccount){
			document.getElementById('pastDueDate_modal_type').innerHTML = toJSMakerLong(derivativeInfo.makerLong, "taker");
			var pl = calculatePL(toJSStrikePrice(derivativeInfo.strikePrice), tickerPrice, toJSMakerLong(derivativeInfo.makerLong, "taker"))
		}
		else{
			document.getElementById('pastDueDate_modal_type').innerHTML = toJSMakerLong(derivativeInfo.makerLong, "maker");
			var pl = calculatePL(toJSStrikePrice(derivativeInfo.strikePrice), tickerPrice, toJSMakerLong(derivativeInfo.makerLong, "maker"))
		}
		document.getElementById('pastDueDate_modal_stake').innerHTML = toJSStake(derivativeInfo.stakes_User).toFixed(1) +" ETH";
		document.getElementById('pastDueDate_modal_leverage').innerHTML = "2x";
		document.getElementById('pastDueDate_modal_strikeprice').innerHTML = toJSStrikePrice(derivativeInfo.strikePrice).toFixed(2);
		document.getElementById('pastDueDate_modal_duedate').innerHTML = toJJJJMMDD(derivativeInfo.dueDate);
		document.getElementById('pastDueDate_modal_currentPrice').innerHTML = tickerPrice;
		document.getElementById('pastDueDate_modal_pl').innerHTML = (pl*100).toFixed(2) + "%";
		document.getElementById('pastDueDate_modal_value').innerHTML = (calculateValue(pl, toJSStake(derivativeInfo.stakes_User))).toFixed(2) + " ETH";
		document.getElementById('pastDueDate_modal_pl').style.fontWeight = "600";
		document.getElementById('pastDueDate_modal_value').style.fontWeight = "600";
		if (pl<0) {
			document.getElementById('pastDueDate_modal_pl').style.color = "#EF5350";
			document.getElementById('pastDueDate_modal_value').style.color = "#EF5350";
		}
		else {
			document.getElementById('pastDueDate_modal_pl').style.color = "#26A69A";
			document.getElementById('pastDueDate_modal_value').style.color = "#26A69A";
		}

		// Set Withdraw Buttons:
    var withdrawButton = document.getElementById("withdrawButton")
    var unsettledWithdrawButton = document.getElementById("unsettledWithdrawButton")
    var withdrawRemainderAfterDueDateButton = document.getElementById("withdrawRemainderAfterDueDateButton")
    var noWithdrawPossible = document.getElementById("noWithdrawPossible")  // Info

    noWithdrawPossible.style = {}

    // Regular withdraw:
    derivativeInfo.web3contract.methods.withdraw()
      .estimateGas({from: window.userAccount}, (error, result) =>
      {
        if (!error)
        {
          estimatedCosts = result * 5 * window.web3.utils.toWei('1', 'gwei');
          estimatedCosts = window.web3.utils.fromWei(estimatedCosts.toString(), 'ether');
          console.log("Costs for this transaction: " + result + " gas which equals " + estimatedCosts + " ETH for 5 GWei gas costs.");
          noWithdrawPossible.style.display =  "none"
          withdrawButton.style = {}
        }
        else
        {
          withdrawButton.style.display = "none"
        }
      })
		withdrawButton.onclick = null
		withdrawButton.onclick = function ()
			{
				console.log("Confirmation for a contract call is required.")
			  derivativeInfo.web3contract.methods.withdraw()
			     .send({from: window.userAccount})
				modal.style.display = "none";
			}

    // Unsettled withdraw
    derivativeInfo.web3contract.methods.unsettledWithdraw()
      .estimateGas({from: window.userAccount}, (error, result) =>
      {
        if (!error)
        {
          estimatedCosts = result * 5 * window.web3.utils.toWei('1', 'gwei');
          estimatedCosts = window.web3.utils.fromWei(estimatedCosts.toString(), 'ether');
          console.log("Costs for this transaction: " + result + " gas which equals " + estimatedCosts + " ETH for 5 GWei gas costs.");
          noWithdrawPossible.style.display =  "none"
          unsettledWithdrawButton.style = {}
        }
        else
        {
          unsettledWithdrawButton.style.display = "none"
        }
      })
    unsettledWithdrawButton.onclick = null
		unsettledWithdrawButton.onclick = function ()
			{
			  derivativeInfo.web3contract.methods.unsettledWithdraw()
			     .send({from: window.userAccount})
				       modal.style.display = "none";
			}

    // Withdraw of stake not being taken
    if (derivativeInfo.maker == window.userAccount && derivativeInfo.stakes_Maker > derivativeInfo.totalStakeAllTakers)
    {
      withdrawRemainderAfterDueDateButton.style.display = "inline-block"
      noWithdrawPossible.style.display =  "none"
      withdrawRemainderAfterDueDateButton.onclick = null
      withdrawRemainderAfterDueDateButton.onclick = () =>
      {
        var BN = web3.utils.BN
        stakeToSubtract = derivativeInfo.stakes_Maker
        console.log("Reducing stake of " + derivativeInfo.address + " by: " + toJSStake(stakeToSubtract))
        if (window.userAccount != undefined)
        {
          derivativeInfo.web3contract.methods.reduceStake(stakeToSubtract)
            .send({from: window.userAccount})
            .on('transactionHash', (hash) => {
              withdrawRemainderAfterDueDateButton.style.display = "none"
            })
        }
      }
    }
    else
    {
      withdrawRemainderAfterDueDateButton.style.display = "none"
    }

    // Withdraw Freebie after due date
    var getFreebieButton = document.getElementById("getFreebieAfterDueDateButton")
    getFreebieButton.style.display = "none"
    getFreebieButton.onclick = null

    window.web3FreebieContract.methods
      .withdrawBounty()
      .estimateGas({from: window.userAccount}, (error, result) =>
      {
        if (!error) {
          estimatedCosts = result * 5 * window.web3.utils.toWei('1', 'gwei');
          estimatedCosts = window.web3.utils.fromWei(estimatedCosts.toString(), 'ether');
          console.log("Costs for this transaction: " + result + " gas which equals " + estimatedCosts + " ETH for 5 GWei gas costs.");
          // Withdraw via Freebie possible
          getFreebieButton.style.display = "block"
          getFreebieButton.onclick = async () =>
          {
            if (window.userAccount != undefined)
            {
              window.web3FreebieContract.methods
                .withdrawBounty()
                .send({from: window.userAccount})
            }
          }
        }
      });

	}
  if (modalType == "feedbackModal"){
    var submitFeedback = document.getElementById("submitFeedback");
    submitFeedback.onclick = function()
      {
        var feedback = document.getElementById('feedbackText').value.toString();
        feedbackDB(window.userAccount, feedback)
        modal.style.display = "none";
  	  }
  }




  /*
   * ALL MODALS: DISPLAY SETTINGS
   */


	var modal = document.getElementById(modalType);  // Get the modal
  modal.addEventListener(
    'DerivativeAltered', (event) =>
    {
      if (modal.style.display == "block")
      {
        var newDerivativeInfo = event.detail
        this.modal (modalType, newDerivativeInfo, amountToAcquireOfContract)
      }
    }
  )

  modal.style.display = "block";
  var span = modal.getElementsByClassName("close")[0];  // Get the <span> element that closes the modal
  span.onclick = function() {
		modal.style.display = "none"; // When the user clicks on <span> (x), close the modal
  }
  window.addEventListener(
    "click", function(event)
    {
      if (event.target == modal) {
          modal.style.display = "none"; // When the user clicks anywhere outside of the modal, close it
      }
    }
  )
  document.getElementById('continueButton').onclick = function(event) {
    modal.style.display = "none";
  }
  document.getElementById('continueButton2').onclick = function(event) {
    modal.style.display = "none";
  }
  document.getElementById('continueButton3').onclick = function(event) {
    modal.style.display = "none";
  }
}

// Shared aquire link:
function checkDerivativeAddressInLink ()
{
  var url_of_this_website = document.URL
  var url_splitted = url_of_this_website.split('?')
  var derivative_address = url_splitted[1]
  if(web3.utils.isAddress(derivative_address))
  {
    openAquireModalViaDerivativeAddress(derivative_address)
    displayChart("buyModal")
  }

  async function openAquireModalViaDerivativeAddress(derivativeAddress)
  {
    var d = new Derivative(derivativeAddress,derivativeABI,"free_to_watch")
    await d.loadFromBlockchain().then(
      derivativeInfo =>
      {
        derivativeInfo.web3contract.methods.signContract(derivativeInfo.strikePrice)
          .estimateGas({from: window.userAccount, value: window.web3.utils.toWei("100",'finney')}, (error, result) =>
          {
            if (!error) {
              estimatedCosts = result * 5 * window.web3.utils.toWei('1', 'gwei');
              estimatedCosts = window.web3.utils.fromWei(estimatedCosts.toString(), 'ether');
              console.log("Costs for this transaction: " + result + " gas which equals " + estimatedCosts + " ETH for 5 GWei gas costs.");
              var ipOk = true
              for (var i = 0; i < window.makerContracts.length; i++)
              {
                if (window.makerContracts[i].toLowerCase() == derivativeInfo.transactionHash.toLowerCase())
                {
                  ipOk = false
                }
              }

              if (ipOk)
                document.getElementById("buy_modal_sendAcquire_div").style = {}
              else
                document.getElementById("buy_modal_sendAcquire_div").style.display = "none"

              // Open modal
              modal("buyModal",derivativeInfo)

            } else {
              // You cannot aquire this contract
              document.getElementById("buy_modal_sendAcquire_div").style.display = "none"
              // alert("You are not allowed to aquire the requested contract " + derivativeInfo.address)
              // Open modal
              modal("buyModal",derivativeInfo)
            }
          })
      }
    )
  }
}

function termsAndConditionsAccepted (checkbox)
{
  if(checkbox.checked != true)
  {
    checkbox.style.outline = "4px solid #d70707"
    window.setTimeout(resetHighlighting, 1000)
    function resetHighlighting ()
    {
      checkbox.style.outline = ""
    }
    return false
  }
  checkbox.checked = false
  return true
}

function copyShareLinkToClipboard (derivativeAddress)
{
  str = "dodonix.io/?" + derivativeAddress
  const el = document.createElement('textarea')
  el.value = str
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
  document.getElementById("maker_modal_linkCopiedDone").style.visibility = "visible"
  window.setTimeout(resetOk, 1000);
  function resetOk ()
  {
    document.getElementById("maker_modal_linkCopiedDone").style.visibility = "hidden"
  }
}
