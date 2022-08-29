function makersDB(txhash){
  return new Promise(
    async (resolve, reject) =>
    {
      var nonce = await window.web3.eth.getTransactionCount(window.web3FactoryContract._address);
      var nonceBytes = window.web3.utils.bytesToHex([nonce])
      var probableContractAddressHash = window.web3.utils.soliditySha3("0xd6", "0x94", window.web3FactoryContract._address, nonceBytes)
      probableContractAddress = "0x" + probableContractAddressHash.substr(probableContractAddressHash.length - 40)
      console.log("The contract's address will probably be: " + probableContractAddress);

      console.log("This is the tx hash: " + txhash);

      var postData = 'newContractAddress=' + txhash;

      $.ajax({
        url : "./Scripts/postMakersDB.php",
        type: "POST",
        data : postData,
        success: function(data,status,xhr){
          //if success then just output the text to the status div then clear the form inputs to prepare for new data
          console.log("succesfully wrote maker database entries");
          $.ajax({
            url: "./Scripts/getMakersDB.php",
            type: "GET",
            contentType: "application/json; charset=utf-8",
            success: function(data){
              window.makerContracts = JSON.parse(data);
              console.log("maker contracts: " + window.makerContracts);
              console.log("succesfully fetched maker database entries");
              resolve();
            }
          });
        },
        error: function(data){
          console.log("failed to write maker database entries");
        }
      });
    })
  }
