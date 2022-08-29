function openExplanationModal(){
  var welcomeModal = document.getElementById("welcomeModal");
  welcomeModal.style.display = "none";
  modal("explanationModal")
}

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" activeDot", "");
  }
  if(slideIndex == 11 || slideIndex == 12){
    if(slideIndex == 11){
      document.getElementById("explanationModalTitle").innerHTML = "Before you start"
    }
    if(slideIndex == 12){
      document.getElementById("explanationModalTitle").innerHTML = "Create a contract"
    }
  }
  else{
    document.getElementById("explanationModalTitle").innerHTML = "Introduction"
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " activeDot";
}
