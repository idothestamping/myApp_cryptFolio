$(window).load(function() {
    // Animate loader off screen
    $(".se-pre-con").fadeOut("slow");;
});

$(document).ready(function(){
    $('.sidenav').sidenav();
    $('.carousel.carousel-slider').carousel({
        fullWidth: true,
        indicators: true
    });    
  });
    

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems,{
        yearRange: 50,
        autoClose: false
      });
  });