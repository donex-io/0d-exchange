var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = document.getElementById('collapsible');
    if (content.style.display === "block") {
      content.style.display = "none";
      document.getElementsByClassName("table_div")[0].style.height = "225px";
      document.getElementsByClassName("table_div")[1].style.height = "225px";
    } else {
      content.style.display = "block";
      document.getElementsByClassName("table_div")[0].style.height = "135px";
      document.getElementsByClassName("table_div")[1].style.height = "135px";
    }
  });
}
