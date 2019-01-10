//variables are listed here
//eventResult is object that hold info of related events
var eventResult;
var markerHolder = [];
// Iniciate a map, make it center at your location, if can't use your location, use the default
var map, infoWindow;
//var container;
//creat a function to creat pop-up div
//also make meetupFind a call back function ?? or  

var popDiv = $("<div>")
popDiv.attr("class","popup-overlay").addClass('hidden');

var contDiv = $("<div>");
contDiv.attr("class","popup-content");
contDiv.attr("id","map_preload")
popDiv.append(contDiv);
$("#map").prepend(popDiv);

var closeBtn = $("<button>");

function popUpdiv(charity){
  closeBtn.attr("class","close"); 
  closeBtn.attr("id","clBtn");
  closeBtn.css("width","100px")
  closeBtn.text("close")
  popDiv.append(closeBtn);
  console.log(charity)

  
   meetupFind(charity)
}

function getmap(){
  var myLatLng = {lat: 35.218651, lng: -80.841019};  
  map = new google.maps.Map(document.getElementById('map_preload'), {
    //***we are going to use a call a function to repace the center with current location
    center: myLatLng, 
    zoom: 10
    })
}


// creat a function given string pramater of meetup group return a list of meetup event, event place
//group info is the text that user input in the search box

function meetupFind(groupInfo){
    
    var search = groupInfo;
    queryURL = "https://api.meetup.com/find/upcoming_events?key=352d3f6d5219b5121f804152572749&sign=true&photo-host=public&page=20&text=" + search;
    $.ajax({
        url: queryURL,
        method: "GET"
       }).then(function(response){
        
        console.log("from the meet up API")
        console.log(response)

        //Add if statement, depending on if a related meet up event is found

        console.log(response.events.length)
        var numEvents = response.events.length;
        //if no events found
        if(numEvents===0){
          var textDiv = $("<h2>");
          textDiv.attr("id","return-text");
          textDiv.text("No Event Near You Found");
          textDiv.css("background-color","red")
          textDiv.css("font-size","large")
          textDiv.css("margin-top","0px")
          textDiv.css("z-index","3")
          $(".popup-overlay").prepend(textDiv);
          $('.popup-content').css('height', '85%');
        }

        if(numEvents>0){
          //here creat a object that stores top 5 event, name, location(lat,lon), time,  duration, descrbtion, and link
           eventResult ={name:[],
                         location:{
                                 lat:[],
                                 lon:[] 
                         },
                         date:[],
                         time:[],
                         duration:[],
                         desc:[],
                         link:[]
                        }
        //using a loop to store them
        var N=Math.min(numEvents,5)
        for(i=0;i < N;i++){
        eventResult.name.push(response.events[i].group.name)
        eventResult.duration.push(response.events[i].duration)
        eventResult.desc.push(response.events[i].description)
        eventResult.location.lat.push(response.events[i].group.lat)
        eventResult.location.lon.push(response.events[i].group.lon)
        eventResult.date.push(response.events[i].local_date)
        eventResult.time.push(response.events[i].local_time)
        eventResult.link.push(response.events[i].link)
        }

        console.log("check what you have stored")
        console.log(eventResult)

        //add pionts
        markerHolder = [];
        //using a loop to display the places
        for(i=0;i<N;i++){    
         markerHolder[i] = new google.maps.Marker({
         position: {lat: eventResult.location.lat[i], lng:eventResult.location.lon[i]},
         map: map,
         title: eventResult.name[i]
          });
        }
        console.log("check your markerHoder")
        console.log(markerHolder)

      //close of second if
                      }
         
       });
}

//creat a function to clean markers
 function cleanMap(){
  for(i=0;i<markerHolder.length;i++){
    markerHolder[i].setMap(null);
  }
   console.log("your clean map trigered")
}


// $(".open").on("click", function(){
//   popUpdiv();
//   $(".popup-overlay, .popup-content").addClass("active");
//  });

// $(document).on("click",".close", function(){
//   $(".popup-overlay, .popup-content").removeClass("active");
//   console.log("you clicked")
// });
