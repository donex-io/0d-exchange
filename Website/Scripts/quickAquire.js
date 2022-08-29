var quickAquireButton = document.getElementById("buttonQuickBuy")


  quickAquireButton.derivatives = []


  quickAquireButton.addEventListener
  (
    'NewDerivative',
    function(e)
    {
      var derivativeInfo = e.detail

      if ((derivativeInfo.maker != window.userAccount)&&(derivativeInfo.stakes_Maker-derivativeInfo.totalStakeAllTakers > 0)&&derivativeInfo.dueDate>toEthereumTime(new Date(Date.now())))
        quickAquireButton.derivatives.push(derivativeInfo)

    }
  )

  quickAquireButton.addEventListener
  (
    'DerivativeAltered',
    e =>
    {
      var derivativeInfo = e.detail

      if ((derivativeInfo.maker != window.userAccount)&&(derivativeInfo.stakes_Maker-derivativeInfo.totalStakeAllTakers > 0)&&derivativeInfo.dueDate>toEthereumTime(new Date(Date.now())))
        for (var i = 0; i < quickAquireButton.derivatives.length; i++)
          if (quickAquireButton.derivatives[i].address == derivativeInfo.address)
            quickAquireButton.derivatives[i] = derivativeInfo

    }
  )

  quickAquireButton.onclick = async function ()
  {
    var stakeToTake = document.getElementById("filter_stake").value
    stakeToTake = toEthereumStake(stakeToTake)
    var takerLong = !document.getElementById('selectLS_quick').checked;
    var acquiredStake = 0
    var remainingStakeToTake = 0
    var contractsToAcquire = []
    var amountToAcquireOfContract = {}

    var allPossibleDerivatives = quickAquireButton.derivatives.filter(derivative =>
      {
        return derivative.makerLong !=  takerLong
      }
    )

    if (takerLong)
    {
      var allPossibleDerivativesSorted = allPossibleDerivatives.sort
      (
        function(a, b)
        {
          if(parseInt(a.strikePrice) < parseInt(b.strikePrice)) { return -1; }
          if(parseInt(a.strikePrice) > parseInt(b.strikePrice)) { return 1; }
          return 0;
        }
      )
    }
    else
    {
      var allPossibleDerivativesSorted = allPossibleDerivatives.sort
      (
        function(a, b)
        {
          if(parseInt(a.strikePrice) < parseInt(b.strikePrice)) { return 1; }
          if(parseInt(a.strikePrice) > parseInt(b.strikePrice)) { return -1; }
          return 0;
        }
      )
    }

    for (var d = 0; d < allPossibleDerivativesSorted.length; d++)
    {
      remainingStakeToTake = stakeToTake - acquiredStake
      if (remainingStakeToTake == 0)
        break
      if (remainingStakeToTake < 0)
      {
        console.log("Something went wrong! Negative Stake!")
        return
      }
      var maxStakeOfDerivative = allPossibleDerivativesSorted[d].stakes_Maker - allPossibleDerivativesSorted[d].totalStakeAllTakers
      contractsToAcquire.push(allPossibleDerivativesSorted[d])
      if (maxStakeOfDerivative > remainingStakeToTake)
      {
        amountToAcquireOfContract[allPossibleDerivativesSorted[d].address] = remainingStakeToTake
        acquiredStake = acquiredStake + remainingStakeToTake
      }
      else
      {
        amountToAcquireOfContract[allPossibleDerivativesSorted[d].address] = maxStakeOfDerivative
        acquiredStake = acquiredStake + maxStakeOfDerivative
      }
    }

    modal("quickAcquireModal", contractsToAcquire, amountToAcquireOfContract);


  }
