// Requires 'derivative.js'

function initTables()
{
  // Acquire Table Long:
  var acquireTableLong = new TableBody("buyLongTableBody")
  acquireTableLong.initSort = function ()
  {
    var initalSort = [1,1,-1,1,1,1,1]
    sortTable(2,this.id,initalSort.slice())
    sortTable(3,this.id)
    sortTable(1,this.id)
  }
  acquireTableLong.condition = function(derivativeInfo)
    {
      var ipOk = true
      for (var i = 0; i < window.makerContracts.length; i++)
      {
        // Check if a contract was created with this IP address:
        if (window.makerContracts[i].toLowerCase() == derivativeInfo.transactionHash.toLowerCase())
        {
          //ipOk = false
        }
      }
      return ((derivativeInfo.maker != window.userAccount)&&(derivativeInfo.stakes_Maker-derivativeInfo.totalStakeAllTakers > 0)&&(derivativeInfo.dueDate>toEthereumTime(new Date(Date.now())))&&(!derivativeInfo.makerLong)&&ipOk)
    }
  acquireTableLong.modalID = "buyModal"
  acquireTableLong.tableData = function (derivativeInfo)
  {
    var tds = {}
    tds.underlying = this.newData("derivativeinfo",{width: "20%"},"SPX")
    tds.takerType = this.newData(
      "derivativeinfo",
      {width: "12.5%"},
      toJSMakerLong(derivativeInfo.makerLong,"taker")
    )
    tds.availabeStake = this.newData(
      "derivativeinfo",
      {width: "12.5%"},
      toJSStake(derivativeInfo.stakes_Maker-derivativeInfo.totalStakeAllTakers).toFixed(1)
    )
    var strikePrice =
    tds.strikePrice = this.newData(
      "derivativeinfo",
      {width: "22.5%"},
      toJSStrikePrice(derivativeInfo.strikePrice).toFixed(2)
    )
    tds.dueDate = this.newData(
      "derivativeinfo",
      {width: "22.5%"},
      toJJJJMMDD(derivativeInfo.dueDate)
    )
    tds.empty = this.newData(
      "derivativeinfo",
      {width: "10%"}
    )
    return tds
  }

  // Acquire Table Short:
  var acquireTableShort = new TableBody("buyShortTableBody")
  acquireTableShort.initSort = function ()
  {
    var initalSort = [1,1,-1,-1,1,1,1]
    sortTable(2,this.id,initalSort.slice())
    sortTable(3,this.id)
    sortTable(1,this.id)
  }
  acquireTableShort.condition = function(derivativeInfo)
    {
      var ipOk = true
      for (var i = 0; i < window.makerContracts.length; i++)
      {
        // Check if a contract was created with this IP address:
        if (window.makerContracts[i].toLowerCase() == derivativeInfo.transactionHash.toLowerCase())
        {
          //ipOk = false
        }
      }
      return ((derivativeInfo.maker != window.userAccount)&&(derivativeInfo.stakes_Maker-derivativeInfo.totalStakeAllTakers > 0)&&(derivativeInfo.dueDate>toEthereumTime(new Date(Date.now())))&&(derivativeInfo.makerLong)&&ipOk)
    }
  acquireTableShort.modalID = "buyModal"
  acquireTableShort.tableData = function (derivativeInfo)
  {
    var tds = {}
    tds.underlying = this.newData("derivativeinfo",{width: "20%"},"SPX")
    tds.takerType = this.newData(
      "derivativeinfo",
      {width: "12.5%"},
      toJSMakerLong(derivativeInfo.makerLong,"taker")
    )
    tds.availabeStake = this.newData(
      "derivativeinfo",
      {width: "12.5%"},
      toJSStake(derivativeInfo.stakes_Maker-derivativeInfo.totalStakeAllTakers).toFixed(1)
    )
    var strikePrice =
    tds.strikePrice = this.newData(
      "derivativeinfo",
      {width: "22.5%"},
      toJSStrikePrice(derivativeInfo.strikePrice).toFixed(2)
    )
    tds.dueDate = this.newData(
      "derivativeinfo",
      {width: "22.5%"},
      toJJJJMMDD(derivativeInfo.dueDate)
    )
    tds.empty = this.newData(
      "derivativeinfo",
      {width: "10%"}
    )
    return tds
  }

  // Maker Table
  var makerTable = new TableBody("makerTableBody")
  makerTable.initSort = function ()
  {
    var initalSort = [1,1,-1,1,1,1,1]
    sortTable(3,this.id,initalSort.slice())
    sortTable(1,this.id)
    sortTable(2,this.id)
  }
  makerTable.condition = function(derivativeInfo)
    {
      var condition = (derivativeInfo.maker == window.userAccount&&derivativeInfo.dueDate>toEthereumTime(new Date(Date.now()))&&(parseInt(derivativeInfo.stakes_Maker) > 0))
      if(condition){
        rearrangeColumns()
      }
      return condition
    }
  makerTable.modalID = "makerModal"
  makerTable.tableData = function (derivativeInfo)
  {
    var tds = {}
    tds.underlying = this.newData("derivativeinfo",{width: "20%"},"SPX")
    tds.takerType = this.newData(
      "derivativeinfo",
      {width: "12.5%"},
      toJSMakerLong(derivativeInfo.makerLong,"maker")
    )
    tds.availabeStake = this.newData(
      "derivativeinfo",
      {width: "12.5%"},
      toJSStake(derivativeInfo.stakes_Maker).toFixed(1)
    )
    tds.strikePrice = this.newData(
      "derivativeinfo",
      {width: "22.5%"},
      toJSStrikePrice(derivativeInfo.strikePrice).toFixed(2)
    )
    tds.dueDate = this.newData(
      "derivativeinfo",
      {width: "22.5%"},
      toJJJJMMDD(derivativeInfo.dueDate)
    )
    tds.empty = this.newData(
      "derivativeinfo",
      {width: "10%"}
    )
    return tds
  }

  // Acquired Table
  var acquiredTable = new TableBody("acquiredTableBody")
  acquiredTable.initSort = function ()
  {
    var initalSort = [1,1,-1,1,1,1,1]
    sortTable(3,this.id,initalSort.slice())
    sortTable(1,this.id)
    sortTable(2,this.id)
  }
  acquiredTable.condition = function(derivativeInfo)
    {
      var condition = ((derivativeInfo.stakes_User > 0)&&(derivativeInfo.maker != window.userAccount)&&derivativeInfo.dueDate>toEthereumTime(new Date(Date.now())))
      if(condition){
        rearrangeColumns()
      }
      return condition
    }
  acquiredTable.modalID = "takerModal" // TODO
  acquiredTable.tableData = function (derivativeInfo)
  {
    var tds = {}
    tds.underlying = this.newData("derivativeinfo",{width: "20%"},"SPX")
    tds.takerType = this.newData(
      "derivativeinfo",
      {width: "12.5%"},
      toJSMakerLong(derivativeInfo.makerLong,"taker")
    )
    tds.availabeStake = this.newData(
      "derivativeinfo",
      {width: "12.5%"},
      toJSStake(derivativeInfo.stakes_User).toFixed(1)
    )
    tds.strikePrice = this.newData(
      "derivativeinfo",
      {width: "22.5%"},
      toJSStrikePrice(derivativeInfo.strikePrice).toFixed(2)
    )
    tds.dueDate = this.newData(
      "derivativeinfo",
      {width: "22.5%"},
      toJJJJMMDD(derivativeInfo.dueDate)
    )
    tds.empty = this.newData(
      "derivativeinfo",
      {width: "10%"}
    )
    return tds
  }

  // Due Table
  var dueTable = new TableBody("dueTableBody")
  dueTable.initSort = function ()
  {
    var initalSort = [1,1,-1,1,1,1,1]
    sortTable(3,this.id,initalSort.slice())
    sortTable(1,this.id)
    sortTable(2,this.id)
    sortTable(4,this.id)
  }
  dueTable.condition = function(derivativeInfo)
    {
      var condition = ((derivativeInfo.stakes_User > 0)&&(derivativeInfo.dueDate<toEthereumTime(new Date(Date.now()))))
      if(condition){
        rearrangeColumns()
      }
      return condition
    }
  dueTable.modalID = "pastDueDateModal" // TODO
  dueTable.tableData = function (derivativeInfo)
  {
    var tds = {}
    tds.underlying = this.newData("derivativeinfo",{width: "20%"},"SPX")
    if(derivativeInfo.maker != window.userAccount)
      tds.takerType = this.newData(
        "derivativeinfo",
        {width: "12.5%"},
        toJSMakerLong(derivativeInfo.makerLong,"taker")
      )
    else
      tds.takerType = this.newData(
        "derivativeinfo",
        {width: "12.5%"},
        toJSMakerLong(derivativeInfo.makerLong,"maker")
      )
    tds.availabeStake = this.newData(
      "derivativeinfo",
      {width: "12.5%"},
      toJSStake(derivativeInfo.stakes_User).toFixed(1)
    )
    tds.strikePrice = this.newData(
      "derivativeinfo",
      {width: "22.5%"},
      toJSStrikePrice(derivativeInfo.strikePrice).toFixed(2)
    )
    tds.dueDate = this.newData(
      "derivativeinfo",
      {width: "22.5%"},
      toJJJJMMDD(derivativeInfo.dueDate)
    )
    tds.empty = this.newData(
      "derivativeinfo",
      {width: "10%"}
    )
    return tds
  }
}




class TableBody
{

  constructor(id)
  {
    this.id = id
    this.elem = document.getElementById(id)
    while(this.elem.firstChild)
    {
      this.elem.removeChild(this.elem.firstChild)
    }
    this.addEventListeners()

    // Individual function for each table:
    // Have to be set!
    this.condition = function () {console.log('No condition set.');}
    this.modalID = undefined
    this.tableData = {}
    this.initSort = function () {console.log('No sort function set.');}
  }

  newRow (classOfRow) {
  	var tr = document.createElement("tr")
  	tr.className = classOfRow
  	return tr
  }

  newData (classOfData,tdProperties,text) {
  	var td = document.createElement("td")
  	if (typeof classOfData !== "undefined"){
  		td.className = classOfData
  	}
  	if (typeof tdProperties !== "undefined"){
  		for (var prop in tdProperties) {
  			td[prop] = tdProperties[prop]
  		}
  	}
  	if (typeof text !== "undefined"){
  		var dataText = document.createTextNode(text)
  		td.appendChild(dataText)
  	}
  	return td
  }

  addEventListeners()
  {
    this.elem.addEventListener
    (
      'NewDerivative',
      e =>
      {
        var derivativeInfo = e.detail
        if (this.condition(derivativeInfo))
        {
          // Check if already exists:
          var row = document.getElementById(this.id + derivativeInfo.address)
          if (row == null)
            this.elem.appendChild(this.newTableRow(derivativeInfo))
          else
            this.fillTableRow(row,derivativeInfo)
          this.initSort()
          derivativesDB(derivativeInfo.address, derivativeInfo.factory, toJSMakerLong(derivativeInfo.makerLong, "taker"),
          toJSStake(derivativeInfo.stakes_Maker), toJSStake(derivativeInfo.stakes_Maker-derivativeInfo.totalStakeAllTakers), toJSStrikePrice(derivativeInfo.strikePrice), derivativeInfo.dueDate)
        }
      }
    )
    this.elem.addEventListener
    (
      'DerivativeAltered',
      e =>
      {
        var derivativeInfo = e.detail
        if (this.condition(derivativeInfo))
        {
          // Check if already exists:
          var row = document.getElementById(this.id + derivativeInfo.address)
          if (row == null)
            this.elem.appendChild(this.newTableRow(derivativeInfo))
          else
            this.fillTableRow(row,derivativeInfo)
          this.initSort()
          derivativesDB(derivativeInfo.address, derivativeInfo.factory, toJSMakerLong(derivativeInfo.makerLong, "taker"),
          toJSStake(derivativeInfo.stakes_Maker), toJSStake(derivativeInfo.stakes_Maker-derivativeInfo.totalStakeAllTakers), toJSStrikePrice(derivativeInfo.strikePrice), derivativeInfo.dueDate)
        }
        else
        {
          // Remove if has existed:
          var row = document.getElementById(this.id + derivativeInfo.address)
          if (row != null)
            row.parentNode.removeChild(row);
        }
      }
    )
  }

  newTableRow(derivativeInfo, trProperties)
  {
    var tr = this.newRow("derivative")
    tr.id = this.id + derivativeInfo.address
    this.fillTableRow(tr, derivativeInfo, trProperties)
    return tr
  }

  fillTableRow(tr, derivativeInfo, trProperties)
  {
    tr.onblick = null
    tr.onclick = () =>
    {
      modal(this.modalID, derivativeInfo)
    }
    if (typeof trProperties !== "undefined"){
      for (prop in trProperties) {
        tr.style[prop] = trProperties[prop]
      }
    }

    while(tr.firstChild) {
      tr.removeChild(tr.firstChild);
    }

    var tds = this.tableData(derivativeInfo)
    for (var td in tds) {
      tr.appendChild(tds[td])
    }
  }
}




var tableDescendingAscending = [1,1,1,1,1,1,1] // Ascending = 1, Descending = -1

function sortTable(columnToSwitch, tableid, initSort) {

  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById(String(tableid));

  if (typeof initSort !== "undefined")
  {
    table.sort = initSort
  }
  else
  {
    if (table.sort == null)
      table.sort = tableDescendingAscending
  }

  switching = true;

  while (switching) {
    switching = false;
    rows = table.getElementsByClassName("derivative");
    for (i = 0; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByClassName("derivativeinfo")[columnToSwitch];
      y = rows[i + 1].getElementsByClassName("derivativeinfo")[columnToSwitch];
      if (columnToSwitch == 3 || columnToSwitch == 4) {
        if (table.sort[columnToSwitch] > 0){
          if (parseFloat(x.innerHTML) > parseFloat(y.innerHTML) ) {
            shouldSwitch= true;
            break;
          }
        }
        else{
          if (parseFloat(x.innerHTML) < parseFloat(y.innerHTML) ) {
            shouldSwitch= true;
            break;
          }
        }
      }
      else {
        if (table.sort[columnToSwitch] > 0){
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase() ) {
            shouldSwitch= true;
            break;
          }
        }
        else{
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase() ) {
            shouldSwitch= true;
            break;
          }
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
  table.sort[columnToSwitch] = table.sort[columnToSwitch] * (-1)
}

function rearrangeColumns(){
  var leftColumn = document.getElementById("leftColumn");
  leftColumn.classList.remove("column_withLargeLeftMargin");
  leftColumn.classList.add("columns");
  document.getElementById("portfolioColumn").style.display = "block";
}
