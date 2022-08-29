function modalMockup (modalType, underlying) {
	/*
	 * Create modal:
	 */
  if (modalType == "createModal"){
    document.getElementById('create_modal_asset').innerHTML = document.getElementById('selectAsset1').value;
		/*
		 * Underlying:
		 */
    if (document.getElementById('selectAsset1').value == 1){
      document.getElementById('create_modal_asset').innerHTML = 'SP500';
    }
		/*
		 * Position: long or short:
		 */
    if (document.getElementById('selectLS').checked){
      document.getElementById('create_modal_ls').innerHTML = 'short';
    }
    else{
      document.getElementById('create_modal_ls').innerHTML = 'long';
    }
		/*
		 * Inputs:
		 */
    document.getElementById('create_modal_lev').innerHTML = document.getElementById('selectLeverage').value + 'x';
    document.getElementById('create_modal_stake').innerHTML = document.getElementById('selectStake').value + '(' + document.getElementById('selectMinStake').value + ')';
    document.getElementById('create_modal_baseprice').innerHTML = document.getElementById('selectStrikePrice').value;
    document.getElementById('create_modal_duedate').innerHTML = document.getElementById('selectDueDate').value;
    document.getElementById('create_modal_deadline').innerHTML = document.getElementById('selectDeadline').value;
    displayChart('createModal');
  }
	if (modalType == "buyModal"){
		displayChart('buyModal', underlying);
  }
  if (modalType == "makerModal"){
		displayChart('makerModal', underlying);
  }
  if (modalType == "takerModal"){
		displayChart('takerModal', underlying);
  }
  if (modalType == "pastDueDateModal"){
		displayChart('pastDueDateModal', underlying);
  }
	var modal = document.getElementById(modalType);  // Get the modal
  /*
	 * --- Modal display functionality ---
	 */
  modal.style.display = "block";
  var span = modal.getElementsByClassName("close")[0];  // Get the <span> element that closes the modal
  span.onclick = function() {
		modal.style.display = "none"; // When the user clicks on <span> (x), close the modal
  }
  window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none"; // When the user clicks anywhere outside of the modal, close it
    }
  }
}
