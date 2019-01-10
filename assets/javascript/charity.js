/////////////////////////////////////////////////////////////////////////////
// 
// 
//                            CHARITY API FUNCTIONS 
// 
// 
/////////////////////////////////////////////////////////////////////////////
var searchTerm;
// function to build URL for ajax call
function buildURL() {
  var queryURL = 'https://api.data.charitynavigator.org/v2/Organizations?';
  
  // default parameters on API URL
  var queryParameters = { 
    'app_id': '262a6a90',
    'app_key': 'f2c5607d357d16ed25d52dcea19d248f',
    'pageSize': '10',
    'rated': 'true',
  };
  // search parameter
  queryParameters.search = $('#search-input').val().trim();
  searchTerm = $('#search-input').val().trim();

  var stateSelection = $('#state').val();  
  if (stateSelection !== '') {
    queryParameters.state = stateSelection;
  }

  // return the completed URL to the function call
  return queryURL + $.param(queryParameters);
}

// function that clears search image and then prints results to list
function printResults(response) {
  console.log(response);
  // clear current results if any
  clear();
  // variable to hold the number of results the user requests
  var resultCount = $('#result-count').val();
  // loop through requests and add them to the screen
  for (let i = 0; i < resultCount; i++) {

    var newDiv = $('<div>').addClass('charity-div').attr('id', 'div' +i);
    // variable to hold name of charity
    var newTitle = $('<h5>');
    newTitle
      .addClass('card-title')  //  bootstrap class
      .css('display', 'inline-block')  //  custom css
      .css('margin-right', '5px')  //  space this element away from the next
    ;

    var charityLink = $('<a href="'+response[i].websiteURL+'" target="_blank">');
    charityLink
      .text(response[i].organization.charityName)  //  input name from object to text
    ;

    console.log(charityLink);
    newTitle.append(charityLink);

    // create variable for star rating image
    var ratingImage = $('<img>');
    ratingImage
      .css('display', 'inline-block')  //  make sure this is on the same line as title
      .attr('src', response[i].currentRating.ratingImage.large)  //  set image src
    ;

    // variable to hold tagline
    var newTagline = $('<p>');
    newTagline
      .addClass('card-text')  //  bootstrap styling
      .css('text-decoration', 'underline')  //  underline the tagline for emphasis
      .text('Tagline: ' + response[i].tagLine)  //  input tagline from response
    ;

    var deductibility = $('<p>');
    deductibility
      .addClass('card-text')
      .text(response[i].irsClassification.deductibility)
    ;
    // variable for mission statement
    var mission = $('<p>');
    mission
      .attr('id', 'mission' + i)  //  individual labels to grab later
      .addClass('card-text hidden')  //  hide by default
      .text(response[i].mission)  //  insert mission statement text
    ;

    // variable for more information button
    var moreButton = $('<a>');
    moreButton
      .addClass('btn btn-primary m-1 moreInfo')  //  bootstrap styling and moreInfo  for click listener
      .attr('href', '#')  //  dead link
      .attr('value', 'mission' + i)  //  value to match button to mission statement
      .text('More Information')  //  button text
    ;

    // variable for meetup button
    var meetupButton = $('<a>');
    meetupButton
      .addClass('btn btn-primary m-1 meetupInfo')  //  bootstrap styling and meetupInfo for click listener
      .attr('href', '#')  //  dead link
      .attr('data-title', searchTerm + ' Charity')  //  data attribute to send to meetup function
      .text('Find Meetup Events')  //  button text
    ;

    // variable for donate image button
    var donateButton = $('<input>');
    donateButton
      .attr('type', 'image')  //  designating input type
      .attr('src', 'assets/images/dollarsign.png')  //  setting image src
      .attr('data-id', response[i].ein)  //  setting id to EIN number from response for database
      .attr('data-toggle', 'modal')  //  toggle open modal
      .attr('data-target', '#myModal')  //  target for modal ID
      .addClass('donate-button')  //  class for styling in css
    ;



    // append all variables for screen display
    newDiv.append(
      newTitle, 
      ratingImage, 
      newTagline, 
      deductibility, 
      mission, 
      moreButton, 
      meetupButton, 
      donateButton
    )

    $('#charity-list').append(newDiv);

    // add in horizontal rule after every charity section except the last
    if (i < resultCount-1) {
      $('#charity-list').append($('<hr>'));
    }
  }
}

// clears the list of charities on the screen
function clear() {
  $('#charity-list').empty();
}

// search validation function
function searchValid() {
  console.log($('#search-input').val());
  var search = document.forms[0]['search-input'].value;
  if (search == '') {
    return false;
  }
}

function fillModal(charityClicked) {
  // ADD NAME OF CHARITY TO MODAL
  $('.modal-title').text('Donate to ' + charityClicked);
}


$(document).on('click', '.donate-button', function(e) {
  console.log('dolla dolla bills')
  // e.preventDefault();
  var charityClicked = e.currentTarget.parentElement.children[0].innerHTML
  var ein = $(this).attr('data-id');
  fillModal(charityClicked); 
  // console.log(e);
  // console.log(ein);
  // console.log(charityClicked);

  // firebase donate click function

})