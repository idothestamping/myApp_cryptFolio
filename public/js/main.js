$(window).load(function() {
    // Animate loader off screen
    $(".se-pre-con").fadeOut("slow");;
});

$(document).ready(function(){
    $("#success-alert").fadeTo(2000, 500).slideUp(500, function(){
        $("#success-alert").alert('close');
    });
    
    
    $('.sidenav').sidenav();
    $('.carousel').carousel({fullWidth: true});
    setInterval(function() {
        $('.carousel').carousel('next');
    }, 3000);
  });
    


document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems,{
        yearRange: 50,
        autoClose: false
      });
  });

  var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3]
      }
    ]
  },
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  }
});

setTimeout(function() {
  myChart.options.scales = {
    xAxes: [],
    yAxes: [
      {
        ticks: {
          beginAtZero: false
        }
      }
    ]
  };
  myChart.update();
}, 1000);


