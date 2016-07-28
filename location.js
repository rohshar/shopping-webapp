var latitude = null;
var longitude = null;
window.onload = function() {
  var startPos;
  var geoSuccess = function(position) {
    startPos = position;
    document.getElementById('startLat').innerHTML = startPos.coords.latitude;
    document.getElementById('startLon').innerHTML = startPos.coords.longitude;
    latitude = startPos.coords.latitude;
    longitude = startPos.coords.longitude;
  };
  navigator.geolocation.getCurrentPosition(geoSuccess);
  var mapDiv = document.getElementById('map');
  var map = new google.maps.Map(mapDiv, {
      center: {lat: 0, lng: 0},
      zoom: 4
  });
};


var location_map = null;
var my_place = null;
var found_location = false;
function center() {
  if (latitude) {
    my_place = new google.maps.LatLng(latitude, longitude);

    location_map = new google.maps.Map(document.getElementById('map'), {
        center: my_place,
        zoom: 15
      });

    var centerMarker = new google.maps.Marker({
      position: my_place,
      map: location_map,
        icon: 'GoogleMapsMarkers/red_MarkerA.png'
    });
    found_location = true;
  } else {
    document.getElementById('startLat').innerHTML = "Let your latitude load!";
    document.getElementById('startLon').innerHTML = "Let your longitude load!";
  }
}

var foundPlaces = false;
function initialize() {
  if ((found_location == true) && (search != null)) {
    var request = {
      location: my_place,
      radius: '300',
      query: search
    };
    if (foundPlaces == true) {
      places = [];
      for (i = 0; i < gmarkers.length; i++) {
        gmarkers[i].setMap(null);
      }
      gmarkers = [];
    }
    document.getElementById('startLat').innerHTML = "";
    document.getElementById('startLon').innerHTML = "";
    var service = new google.maps.places.PlacesService(location_map);
    service.textSearch(request, callback);
  } else if (found_location == false) {
    document.getElementById('startLat').innerHTML = "Please find your location first!";
    document.getElementById('startLon').innerHTML = "";
  } else if (search == null) {
    document.getElementById('startLat').innerHTML = "Please enter a search term!";
    document.getElementById('startLon').innerHTML = "";
  }

}

var places = [];
var gmarkers = [];
function callback(results, status, pagination) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    foundPlaces = true;
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      console.log(place);
      places = places + "   " + place['id'];
      $("#allPlaces").html(places);

      var marker = new google.maps.Marker({
        position: place.geometry.location,
        map: location_map,
        icon: 'GoogleMapsMarkers/blue_MarkerA.png'
      });
      gmarkers.push(marker);
    }
    if (pagination.hasNextPage) {
      sleep:2;
      pagination.nextPage();
    }
  }
}




var search = null;
function displayInput(input, change) {
    var text=document.getElementById(input).value;
    if (text.trim().length == 0) {
      document.getElementById('startLat').innerHTML = "Please enter a valid search term!";
      document.getElementById('startLon').innerHTML = "";
      return;
    }
    search = text;
    $(change).html(text);
}


