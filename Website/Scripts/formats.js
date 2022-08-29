// DATES

function toJSDate (jjjjmmdd)  // jjjj-mm-dd as string
{
  var dateArray = jjjjmmdd.split(/\D/)
  var date = new Date(Date.UTC(dateArray[0], --dateArray[1], dateArray[2]))
  return date
}

function toJJJJMMDDfromJSdate (date)
{
  var datevalues = [
		date.getFullYear(),
		date.getMonth()+1,
		date.getDate(),
		date.getHours(),
		date.getMinutes(),
		date.getSeconds(),
	];
  var year = datevalues[0]
  if(datevalues[1] < 10)
  	var month = '0' + datevalues[1]
  else
    var month = datevalues[1]
  if(datevalues[2] < 10)
    var day = '0' + datevalues[2]
  else
    var day = datevalues[2]
	return year + '-' + month + '-' + day
}

function toEthereumTime (JSDate)
{
  var ethereumDate = JSDate.getTime()/1000
  return ethereumDate
}

function toEthereumDueDate (jjjjmmdd)  // jjjjmmdd as string
{
  var date = toJSDate(jjjjmmdd)
  var nyt = new Date(date.getTime() + 21 * 60 * 60 * 1000)
  if (Date.now() > Date(2019-03-10) && Date.now() < Date(2019-11-03))
    nyt = new Date(nyt.getTime() + 1 * 60 * 60 * 1000)
  var ethereumDueDate = toEthereumTime(nyt)
  return ethereumDueDate
}

function toJJJJMMDD (ethereumDate)
{
	var timestamp = ethereumDate
	var date = new Date(timestamp * 1000)
	var datevalues = [
		date.getFullYear(),
		date.getMonth()+1,
		date.getDate(),
		date.getHours(),
		date.getMinutes(),
		date.getSeconds(),
	];
  var year = datevalues[0]
  if(datevalues[1] < 10)
  	var month = '0' + datevalues[1]
  else
    var month = datevalues[1]
  if(datevalues[2] < 10)
    var day = '0' + datevalues[2]
  else
    var day = datevalues[2]
	return year + '-' + month + '-' + day
}


// STRIKE PRICE

function toJSStrikePrice (ethereumStrikePrice)
{
  var JSStrikePrice = parseFloat(ethereumStrikePrice)/1e6
  return JSStrikePrice
}

function toEthereumStrikePrice (JSStrikePrice)
{
  var ethereumStrikePrice = 1e6*parseFloat(JSStrikePrice)
  return ethereumStrikePrice
}


// STAKE

function toJSStake (ethereumStake)
{
  try {
    var JSStake = web3.utils.fromWei(ethereumStake.toString(), 'ether')
  } catch (e) {
    var JSStake = 0
  } finally {
    return parseFloat(JSStake)
  }

}

function toEthereumStake (JSStake)
{
  var stake = parseFloat(JSStake).toString()
  var ethereumStake = web3.utils.toWei(stake)
  return ethereumStake
}


// LONG / SHORT

function toJSMakerLong (ethereumMakerLong, takerOrMaker)
{
  if (ethereumMakerLong == true)
  {
    var JSMakerLong = "Long"
    var JSTakerLong = "Short"
  }
  else
  {
    var JSMakerLong = "Short"
    var JSTakerLong = "Long"
  }
  if (takerOrMaker == "taker")
  {
    return JSTakerLong
  }
  else
  {
    return JSMakerLong
  }
}

function toEthereumMakerLong (JSMakerLong, takerOrMaker)
{
  if (JSMakerLong == "Long")
  {
    var ethereumMakerLong = true
  }
  else
  {
    if (JSMakerLong == "Short")
    {
      var ethereumMakerLong = false
    }
    else
    {
      console.log("Invalid type!");
    }
  }
  return ethereumMakerLong
}
