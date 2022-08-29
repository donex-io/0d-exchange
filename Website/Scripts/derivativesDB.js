function derivativesDB(address, factory, type, totalStake, availableStake, strikePrice, dueDate){

 //call your .php script in the background,
 //when it returns it will call the success function if the request was successful or
 //the error one if there was an issue (like a 404, 500 or any other error status)
  var postData = 'address=' + address + '&factory=' + factory + '&type=' + type + '&totalStake=' + totalStake+ '&availableStake=' + availableStake + '&strikePrice=' + strikePrice+ '&dueDate=' + dueDate;

  $.ajax({
    url : "./Scripts/derivativesDB.php",
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
};
