// Initialize Google Maps
function initMap() {
  var map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 37.0902, lng: -95.7129 },
    zoom: 4,
    disableDefaultUI: true,
    mapTypeId: "terrain"
  });

  // Create the search box and link it to the UI element.
  var input = document.getElementById("pac-input");
  var searchBox = new google.maps.places.SearchBox(input);
  console.log(input);
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
        scaledSize: new google.maps.Size(50, 50)
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

      // Get user search longitude and latitude
      let userPosition = place.geometry.location;
      let searchLatitude = userPosition.lat();
      let searchLongitude = userPosition.lng();
      fetchHikingProjectData(searchLatitude, searchLongitude);

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
    $(".activities-container").slideDown("slow");
  });
}

// Format Query Parameters
function formatQueryParams(params) {
  const queryItems = Object.keys(params).map(
    key => `${encodeURI(key)}=${encodeURI(params[key])}`
  );
  return queryItems.join("&");
}

// Fetch Hiking Project data
function fetchHikingProjectData(lat, lon) {
  baseUrl = hikingProjectApi.baseUrl;
  const params = {
    lat: lat,
    lon: lon,
    key: hikingProjectApi.key,
    maxResults: 50
  };
  let endPoint = formatQueryParams(params);
  let searchUrl = hikingProjectApi.baseUrl + endPoint;
  console.log(searchUrl);
  fetch(searchUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function(hikingData) {
      goHiking(hikingData);
    });
}

//User selects hiking activity
function goHiking(data) {
  console.log(data.trails);
  $("#activity-hiking, .load-more-hiking").on("click", function() {
    data.trails.sort(function() {
      return 0.5 - Math.random();
    });
    $(".destination-card").remove();
    $(".destination-cards-container").show();
    if (data.trails.length > 4) {
      for (let i = 0; i < 5; i++) {
        $(".destination-options").append(
          `
          <div class="destination-card" id="${data.trails[i].id}">
            <h2 class="card-title">${data.trails[i].name}</h2>
            <div class="destination-details">
              <div class="details-container"> 
                <div class="hike-image-container">
                  <img src="${data.trails[i].imgSmall}">
                </div>
                <div class="information"</div>
                  <p><span>Summary:</span> ${data.trails[i].summary}</p>
                  <p><span>Location:</span> ${data.trails[i].location}</p>
                  <p><span>Length:</span> ${data.trails[i].length} miles</p>
                  <p><span>Elevation Gain:</span> ${data.trails[i].ascent} feet</p>
                  <p><span>High Point:</span> ${data.trails[i].high} feet</p>
                  <p><span>Difficulty:</span> ${data.trails[i].difficulty}</p>
                  <p><span>User Rating:</span> ${data.trails[i].stars}/5 Stars</p>
                  <p><span>Powered by Hiking Project:</span> <a href="${data.trails[i].url}" target="_blank">More Info</a></p>
                </div>
            </div>
          </div>
          `
        );
      }
    } else {
      for (let i = 0; i < data.trails.length; i++) {
        $(".destination-options").append(
          `
          <div class="destination-card" id="${data.trails[i].id}">
            <h2 class="card-title">${data.trails[i].name}</h2>
            <div class="destination-details">
              <div class="details-container"> 
                <div class="hike-image-container">
                  <img src="${data.trails[i].imgSmall}">
                </div>
                <div class="information"</div>
                  <p><span>Summary:</span> ${data.trails[i].summary}</p>
                  <p><span>Location:</span> ${data.trails[i].location}</p>
                  <p><span>Length:</span> ${data.trails[i].length} miles</p>
                  <p><span>Elevation Gain:</span> ${data.trails[i].ascent} feet</p>
                  <p><span>High Point:</span> ${data.trails[i].high} feet</p>
                  <p><span>Difficulty:</span> ${data.trails[i].difficulty}</p>
                  <p><span>User Rating:</span> ${data.trails[i].stars}/5 Stars</p>
                  <p><span>Powered by Hiking Project:</span> <a href="${data.trails[i].url}" target="_blank">More Info</a></p>
                </div>
            </div>
          </div>
          `
        );
      }
    }
    selectDestination();
  });
}

// User selects destination
function selectDestination() {
  $(".destination-card").on("click", function(event) {
    $(event.currentTarget)
      .children()
      .slideDown("slow");
    $(event.currentTarget)
      .siblings()
      .children(".destination-details")
      .slideUp();
  });
}

// Add marker to map when user selects destination card
// function addMarker(trailPosition, trailName) {
//   let marker = new google.maps.Marker({
//     position: trailPosition,
//     title: trailName,
//     draggable: true,
//     map: map
//   });
// }

// document ready
$(document).ready(function() {
  console.log("Explorer ready, adventure awaits!");
  $("body").append(
    `<script src=${googleMapsApi.scriptSrc} async defer><script>`
  );
});
