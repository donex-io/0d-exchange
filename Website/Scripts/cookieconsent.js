var head = document.getElementsByTagName('head')[0];
var cookieconsentJs = document.createElement("script");
cookieconsentJs.type = "text/javascript";
cookieconsentJs.src = "//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.1.0/cookieconsent.min.js";
//head.appendChild(cookieconsentJs);
window.addEventListener("load", function(){
  window.cookieconsent.initialise({
    "palette": {
      "popup": {
        "background": "#D9D9D9",
        "text": "#404040"
      },
      "button": {
        "background": "#26a69a"
      }
    },
    "position": "bottom-right",
//      "static": true,
    "content": {
      "dismiss": "Got it!",
      "link": "Terms and Conditions",
      "href": "TermsAndConditions.php",
      "message": "This website uses cookies to ensure you get the best experience. By using our website you agree to our usage of cookies."
    },
  })
});
