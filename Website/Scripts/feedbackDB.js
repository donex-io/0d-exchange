async function feedbackDB(ethereumAddress, feedback){
  var postData = 'ethereumAddress=' + ethereumAddress +'&feedback=' + feedback;
  console.log("entered feedbackDB.js");
  console.log("Post data: " + postData);
  $.ajax({
    url : "./Scripts/feedbackDB.php",
    type: "POST",
    data : postData,
    success: function(data,status,xhr){
      //if success then just output the text to the status div then clear the form inputs to prepare for new data
    },
    error: function(data){
      console.log("fail");
    }
  });
};
