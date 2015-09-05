$(document).ready(function() {
  var path = window.location.pathname;
  
  if(path.indexOf('/auth') > -1 || path.indexOf('/projects') > -1){
    console.log('here')
    $('body').css('background-color', '#f7fafa');
  }
  
  $('#project-rewards-btn').on('click', function(e){
    $('#project-details').fadeOut(500);
    $('#project-rewards').delay(550).fadeIn(500);
  });
  
});