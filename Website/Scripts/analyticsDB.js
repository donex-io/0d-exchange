async function analyticsDB(analyticsEvent, data){
  var homepage = 0;
  var blockchain = '';
  var howitworks = 0;
  var termsandconditions = 0;
  var createbutton = 0;
  var signcreate = 0;
  var signenter = 0;
  var acquiretableitem= '';
  if (analyticsEvent == 'blockchain') {
    blockchain = data;
  }
  if (analyticsEvent == 'homepage') homepage = 1;
  if (analyticsEvent == 'howitworks') howitworks = 1;
  if (analyticsEvent == 'termsandconditions') termsandconditions = 1;
  if (analyticsEvent == 'createbutton') createbutton = 1;
  if (analyticsEvent == 'signcreate') signcreate = 1;
  if (analyticsEvent == 'signenter') signenter = 1;
  if (analyticsEvent == 'acquiretableitem') acquiretableitem = data;

  var postData = 'blockchain=' + blockchain +'&homepage=' + homepage + '&howitworks=' + howitworks + '&termsandconditions=' + termsandconditions + '&createbutton=' + createbutton + '&signcreate=' + signcreate + '&signenter=' + signenter + '&acquiretableitem=' + acquiretableitem;

  $.ajax({
    url : "./Scripts/analyticsDB.php",
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
