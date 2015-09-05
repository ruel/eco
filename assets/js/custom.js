$(document).ready(function() {
  var path = window.location.pathname;
  
  if(path.indexOf('/auth') > -1){
    console.log('here')
    $('body').css('background-color', '#f7fafa');
  }
  
});