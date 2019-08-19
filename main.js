// User enters search area
function searchArea() {
  $(".search-area-button").on("click", function() {
    event.preventDefault();
    let $searchArea = $("#js-area-search").val();
    if ($searchArea.length == 0) {
      $(".invalid-entry").show();
    } else {
      $(".invalid-entry").hide();
      $(".activities-container").show();
      $([document.documentElement, document.body]).animate(
        {
          scrollTop: $("#activity-scroll").offset().top
        },
        1000
      );
      fetchGoogleMapsData($searchArea);
    }
  });
}

// Format Query Parameters
function formatQueryParams(params) {
  const queryItems = Object.keys(params).map(
    key => `${encodeURI(key)}=${encodeURI(params[key])}`
  );
  return queryItems.join("&");
}

// Fetch Google Maps data
function fetchGoogleMapsData(search) {
  baseUrl =
    "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?";
  const mapParams = {
    input: search,
    inputtype: "textquery",
    key: "AIzaSyBPiFr8wlY10QwG8GX0cbBzN8ug1OkVB8A"
  };
  let endPoint = formatQueryParams(mapParams);
  let searchUrl = baseUrl + endPoint;
  console.log(searchUrl);
}

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
  searchArea();
});
