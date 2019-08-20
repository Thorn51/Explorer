// User enters search area

// Initialize Google Maps
function initMap() {
  var map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 37.0902, lng: -95.7129 },
    zoom: 4,
    disableDefaultUI: true,
    mapTypeId: "roadmap"
  });

  // Create the search box and link it to the UI element.
  var input = document.getElementById("pac-input");
  var searchBox = new google.maps.places.SearchBox(input);
  // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener("bounds_changed", function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener("places_changed", function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(
        new google.maps.Marker({
          map: map,
          icon: icon,
          title: place.name,
          position: place.geometry.location
        })
      );

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}

// Format Query Parameters
// function formatQueryParams(params) {
//   const queryItems = Object.keys(params).map(
//     key => `${encodeURI(key)}=${encodeURI(params[key])}`
//   );
//   return queryItems.join("&");
// }

// Fetch Google Maps data
// function fetchGoogleMapsData(search) {
//   baseUrl =
//     "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?";
//   const mapParams = {
//     input: search,
//     inputtype: "textquery",
//     key: "AIzaSyBPiFr8wlY10QwG8GX0cbBzN8ug1OkVB8A"
//   };
//   let endPoint = formatQueryParams(mapParams);
//   let searchUrl = baseUrl + endPoint;
//   console.log(searchUrl);
//   fetch(searchUrl)
//     .then(function(response) {
//       return response.json();
//     })
//     .then(function(data) {
//       console.log(data);
//     });
// }

// User selects hiking activity type
function fetchHikingData() {}

// User selects destination
function selectDestination() {}

// User wants to search a new area
function restartSearch() {}

// Dom Changes for activity selection
function addDestinationCards() {}

// User selects back button to select a different activity
function backToActivities() {}

// Dom changes for destination selection
function addDestinationDetails() {}

//User selects back button to select a different destination
function selectNewDestination() {}

// document ready
$(document).ready(function() {
  console.log("Explorer ready, adventure awaits!");
  $("body").append(
    `<script src=${googleApiKey.scriptSrc} async defer><script>`
  );
});
