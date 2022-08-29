var dueDateList = [
  "2021-05-14",
  "2021-06-18"
]

var duedate = dueDateList[0]  // initialize

for (var i = 0; i < dueDateList.length; i++) {
  if (toJSDate(dueDateList[i]).getTime() > new Date(Date.now()).getTime())
  {
    duedate = dueDateList[i]
    break
  }
}

duedate = toEthereumDueDate(duedate)

var postData = 'dueDate=' + duedate;

$.ajax({
  url : "./Scripts/postDuedate.php",
  type: "POST",
  data : postData,
  success: function(data,status,xhr){
    //if success then just output the text to the status div then clear the form inputs to prepare for new data
    //alert("success2");
  },
  error: function(data){
      //alert("fail");
  }
});

// Countdown:

var x = setInterval(function() {
  // Get todays date and time
  var now = new Date().getTime();
  // Find the distance between now and the count down date
  var distance = duedate*1000 - now;
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  // Display the result in the element with id="demo"
  document.getElementById("countdown").innerHTML = "Contracts Due: " + ("00" + days).slice(-2) + "d " +("00" + hours).slice(-2)   + "h " + ("00" + minutes).slice(-2) + "m " + ("00" + seconds).slice(-2) + "s";
  //+ convertTimeToUserFormat(duedate)
  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdown").innerHTML = "Contracts Due: ELAPSED";
  }
}, 1000);
