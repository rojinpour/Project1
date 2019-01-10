/////////////////////////////////////////////////////////////////////////////
// 
// 
//                            EXECUTION CODE
// 
// 
/////////////////////////////////////////////////////////////////////////////

// click function for MORE INFORMATION
$('#charity-display').on('click', '.moreInfo', function(event) {
  // prevent page refrehs
  event.preventDefault();
  //varible to hold the value attribute to match to mission statement to show or hide
  var clickedValue = event.currentTarget.attributes[2].value;
  // toggle hidden class to show or hide the mission statement information
  $('#' + clickedValue).toggleClass('hidden');
})

// click function for MEETUP INFORMATION
$('#charity-display').on('click', '.meetupInfo', function(event) {
  // prevent page refresh
  event.preventDefault(); 
  $('#return-text').remove();
  var charitySearch = event.currentTarget.attributes[2].value;
  console.log('------------------------------------')
  console.log(event)
  console.log('------------------------------------')
  var clickedDiv = event.currentTarget.parentElement.id;
  var divId = '#'+clickedDiv;
  console.log(divId);
  popUpdiv(charitySearch);
  $(".popup-overlay, .popup-content").addClass("active");

  $('.popup-overlay').removeClass('hidden');
  $([document.documentElement, document.body]).animate({
    scrollTop: $("#map").offset().top
  }, 1500);



})

 $(document).on("click",".close", function(){
  $(".popup-overlay, .popup-content").removeClass("active");
  console.log("you clicked")
  $('.popup-overlay').addClass('hidden');
  $('#return-text').remove();
  cleanMap();
 });


// click or submit of the search parameters
$('#run-search').on('click', function(e) {


  // validating search input is not blank
  if ($('#search-input').val() != '') {
    
    $('.popup-overlay').addClass('hidden');
    $('#return-text').remove();
    cleanMap();
    // prevent page refresh
    e.preventDefault();

    // run URL builder function and set to function scoped variable
    var searchURL = buildURL();

    // ajax call using searchURL
    $.ajax({
      url: searchURL,
      method: 'GET'
    }).then(printResults)  //  run print results function when response is received
  } 
  // clear search parameter after validation is complete
  $('#search-input').val('');
});