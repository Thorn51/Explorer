let googleMapsApi = {
  key: "key=AIzaSyDFWfjid_23wFwEY1SVvBo5WTt6D_Acyog",
  baseUrl: "https://maps.googleapis.com/maps/api/js?",
  callBack: "&callback=initMap",
  placesLibrary: "&libraries=places",
  scriptSrc:
    "https://maps.googleapis.com/maps/api/js?key=AIzaSyDFWfjid_23wFwEY1SVvBo5WTt6D_Acyog&callback=initMap&libraries=places"
};

let hikingProjectApi = {
  key: "200564154-8b844eb92fc5f5d2a046cf8a8b585663",
  baseUrl: "https://www.hikingproject.com/data/get-trails?",
  latitude: `${userLatitude}`,
  longitude: `${userLongitude}`
};
