$(document).ready(function() {
  var count = 1;
  var path = window.location.pathname;
  
  if(path.indexOf('/auth') > -1 || path.indexOf('/projects') > -1){
    console.log('here')
    $('body').css('background-color', '#f7fafa');
  }
  
  $('#project-rewards-btn').on('click', function(e){
    e.preventDefault();
    $('#project-details').fadeOut(500);
    $('#project-rewards').removeClass('hidden').delay(550).fadeIn(500);
  });
  
  $('#add-rewards-btn').on('click', function(e){
    e.preventDefault();
    count++;
    var html = '<br>' +
              '<h4 class="text-color-b">Reward #' + count + '</h4>' +
              '<div class="form-group">' +
              '<input type="number" class="form-control input-1 margin-tb-sm" placeholder="Pledge from" name="rewards['+ (count-1) +'][start_amount]">' +
              '</div>' +
              '<p class="text-color-g">Reward description</p>' +
              '<div class="form-group">' +
              '<textarea rows="10" cols="50" class="form-control textarea-1 margin-tb-sm" placeholder="Content" name="rewards['+ (count-1) +'][details]"></textarea>' +
              '</div>';
    $('.rewards').append(html);
  });
  
});