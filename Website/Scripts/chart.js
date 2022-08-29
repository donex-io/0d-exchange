var assetName = 'SP500';
$.ajax({
  url: "./Scripts/chartDB.php",
  type: "GET",
  data: {asset: assetName},
  contentType: "application/json; charset=utf-8",
  dataType: "text",
  success: function(data){
    var chartData = JSON.parse(data);
    createChart(
      chartData[0].map(x => x.substring(0,10)),
      chartData[4].map(x => parseFloat(x)),
      chartData[2].map(x => parseFloat(x)),
      chartData[3].map(x => parseFloat(x)),
      chartData[1].map(x => parseFloat(x)))
  }
})

document.getElementById('selectUnderlying1').value.onchange = function ()
{
  console.log('test');
  switch (document.getElementById('selectUnderlying1').value){
    case "1":
      assetName = 'SP500';
      break;
    case "2":
      assetName = 'GOLD';
      break;
    case "3":
      assetName = 'OIL';
      break;
    default:
      assetName = 'SP500';
      break;
  };
  console.log(document.getElementById('selectUnderlying1').value);
  $.ajax({
    url: "./Scripts/chartDB.php",
    type: "GET",
    data: {asset: assetName},
    contentType: "application/json; charset=utf-8",
    dataType: "text",
    success: function(data){
      var chartData = JSON.parse(data);
      createChart(
        chartData[0].map(x => x.substring(0,10)),
        chartData[4].map(x => parseFloat(x)),
        chartData[2].map(x => parseFloat(x)),
        chartData[3].map(x => parseFloat(x)),
        chartData[1].map(x => parseFloat(x)))
    }
  })
}

function createChart(timeDataArray, closeDataArray, highDataArray, lowDataArray, openDataArray) {
  noTicks = 3
  if(document.getElementById("chart").clientWidth < 350)
    noTicks = 2
  var trace1 =
  {
    x: timeDataArray,  // In string formart
    close: closeDataArray,
    high: highDataArray,
    low: lowDataArray,
    open: openDataArray,
    type: 'candlestick',
    xaxis: 'x',
    yaxis: 'y',
    increasing: {line: {color: '#26A69A', width: 2}},
    line: {color: 'rgba(31,119,180,1)'},
    decreasing: {line: {color: '#EF5350', width: 2}},
  };

  var data = [trace1];

  // Display
  var plusDays = 5
  var minusDays = 41

    // x range:
    //var endDate = toJSDate(timeDataArray[timeDataArray.length  - 1])
    //endDate.setDate(endDate.getDate() + plusDays)
    var xrange = [
      timeDataArray.length - minusDays,
      timeDataArray.length - 1
      //toJJJJMMDDfromJSdate(endDate)
    ]
    var dtick = parseInt(minusDays/2)
    var firstTick = timeDataArray.length - 1

    // y range:
    var minValue = Math.min(...lowDataArray.slice(lowDataArray.length - minusDays, lowDataArray.length - 1))
    var maxValue = Math.max(...highDataArray.slice(highDataArray.length - minusDays, highDataArray.length - 1))
    var yrange = [minValue*0.99,maxValue*1.01]

    // display last:
    var lastText = closeDataArray[closeDataArray.length - 1].toFixed(2).toString()
    var xLast = timeDataArray[timeDataArray.length - 1]
    var yLast = closeDataArray[closeDataArray.length - 1]
    var colorLast = "#26A69A"
    if (closeDataArray[closeDataArray.length - 1] - openDataArray[closeDataArray.length - 1] < 0)
      colorLast = "#EF5350"

  var layout = {
    title: {
      text: 'SPX',
      font: {
        size: 20,
        color: "#D9D9D9"
      },
      y: 0.875
    },
    dragmode: 'pan',
    margin: {
      r: 60,
      t: 60,
      b: 50,
      l: 50,
      autoexpand: true
    },
    showlegend: false,
    xaxis: {
      autorange: false,
      domain: [0, 1],
      range: xrange,
      rangeslider: {
        visible: false
      },
      type: 'category', // date --> with gaps
      gridcolor: "#2F3241",
      zeroline: false,
      tickfont: {
        size: 12,
        color: "#D9D9D9"
      },
      ticks: "outside",
      ticklen: 10,
      tickangle: 0,
      tick0: firstTick,
      //dtick: dtick,
      nticks: noTicks,
      rangeselector: {
        visible: false,
        x: 0.025,
        y: 0.85,
        xanchor: 'left',
        font: {
          size:8,
          color: "#ffffff"
        },
        buttons: [{
            step: 'month',
            stepmode: 'backward',
            count: 2,
            label: '2 m'
        }, {
            step: 'month',
            stepmode: 'backward',
            count: 6,
            label: '6 m'
        }],
        bgcolor: "#2F3241",
        activecolor: "#3f4353"
      },
      constraintoward: "center"
    },
    yaxis: {
      autorange: false,
      domain: [0, 1],
      range: yrange,
      type: 'linear',
      gridcolor: "#2F3241",
      zeroline: false,
      tickfont: {
        size: 12,
        color: "#D9D9D9"
      },
      ticks: "outside"
    },
    plot_bgcolor: "#131722",
    paper_bgcolor: "#131722", //2F3241
    hovermode: "x",
    annotations: [{
      visible	:	true,
      clicktoshow	:	false,
      opacity	:	1,
      bgcolor	:	"TRANSPARENT",
      bordercolor	:	colorLast,
      borderpad	:	1,
      borderwidth	:	1,
      showarrow	:	true,
      text :	lastText,
      textangle	:	0,
      font: {size: 10, color: colorLast},
      align	:	"center",
      arrowside	:	"end",
      arrowhead	:	0,
      arrowsize	:	1,
      arrowcolor	:	colorLast,
      arrowwidth	:	1,
      standoff	:	0,
      startstandoff	:	0,
      captureevents	:	false,
      xref	:	"x",
      x	:	xLast,
      axref	:	"pixel",
      ax	:	30,
      xanchor	:	"auto",
      xshift	:	0,
      yref	:	"y",
      y	:	yLast,
      ayref	:	"pixel",
      ay	:	0,
      yanchor	:	"auto",
      yshift	:	0
    }]
  };

  Plotly.plot('chart', data, layout);
}
