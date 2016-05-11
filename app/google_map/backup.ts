// some experimental code
let map: google.maps.Map;
let chicago: any = new google.maps.LatLng(41.850, -87.650);

initMap();
// geoLocation();
// showKmlLayer();
// handleEvents();
// markerTest();
// polygonTest();
// heatMapTest();
// geoCodeTest();
placesTest();

function initMap() {
  let mapElement: Element = document.getElementById('map')
  map = new google.maps.Map(
    mapElement,
    {
      center: chicago,
      zoom: 8
    });
}

// Test HTML 5 Geolocation API
function geoLocation() {
  let handleSuccess: PositionCallback = function (position: Position) {
    var location: any = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    map.setCenter(location);
    var infoWindow: google.maps.InfoWindow = new google.maps.InfoWindow({
      "position": location,
      "content": "your are here"
    });
    infoWindow.open(map);
    map.setZoom(20);
  };

  let handleError: PositionErrorCallback = function (error: PositionError) {
    reportError(error.message);
  };

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      handleSuccess,
      handleError
    );
  }
  else {
    reportError("Browser does not support geolocation");
  }
}

function reportError(message: string) {
  alert(message);
}

// Show KML layer in map
function showKmlLayer() {
  let layer = new google.maps.KmlLayer({
    url: 'http://kml-samples.googlecode.com/svn/trunk/kml/Placemark/placemark.kml',
    map: map
  });
}

// Handle events:
//   - click the marker: zoom in and center to the marker
//   - change map center: recenter to chicago after 3 seconds
//   - click map: center to the spot
//   - change zoom: console log the zoom event
function handleEvents() {
  let marker: google.maps.Marker = new google.maps.Marker({
    position: chicago,
    map: map,
    title: "Click me to zoom", // tooltip
    label: "A" // a single character appears inside a marker
  });
  marker.addListener('click', function () {
    map.setZoom(map.getZoom() + 1);
    map.setCenter(chicago);
  });
  // TODO: this is good place to try Rx debounce.
  // Seeing 14 events per move probably due to animation?
  map.addListener('center_changed', function (e) {
    // no event data
    console.log("Map center changed. Event:", arguments);
    setTimeout(function () {
      console.log("In center_changed event handler");
      if (map.getCenter() != chicago) { // Cut-off deadloop, TODO: any proper paradigm in Rx?
        map.setCenter(chicago);
      }
    }, 3000);
  });

  map.addListener('click', function (e) {
    console.log(arguments);
    map.panTo(e.latLng);
  });

  map.addListener("zoom_changed", function (e) {
    // no event data
    console.log("Zoom level changed. Event:", arguments);
  });
}

// In depth demo of marker
// Click map to add a marker
// Click a marker to remove it
function markerTest() {
  let counter: number = 0;
  map.addListener('click', function (e) {
    counter++;

    let marker: google.maps.Marker = new google.maps.Marker({
      position: e.latLng,
      map: map,
      animation: counter % 2 == 0 ? google.maps.Animation.DROP
        : google.maps.Animation.BOUNCE,
      title: "Click me to delete me", // tooltip
      label: "" + (counter % 10) // a single character appears inside a marker
    });
    marker.addListener('click', function () {
      marker.setMap(null);
      marker = null; // avoid memory leak
    });
    map.panTo(e.latLng);
  });
}

// Click 3 or more points on a map. Will draw a polygon.
function polygonTest() {
  let path: google.maps.LatLng[] = [];
  let polygon: google.maps.Polygon = new google.maps.Polygon({
    strokeColor: '0',
    strokeOpacity: 1,
    strokeWeight: 3,
    fillColor: '#00FF00',
    fillOpacity: 0.1,
    // editable: true,
    // draggable: true
  });

  let counter: number = 0;
  map.addListener('click', function (e) {
    path[counter] = e.latLng;
    counter++;
    if (counter >= 3) {
      polygon.setPath(path);
      polygon.setMap(map);
    }
  });
}

// Click on maps. Heatmap of clicks will be generated
function heatMapTest() {
  console.log("top");
  console.log(google.maps);
  console.log(google.maps.visualization);

  let points: google.maps.LatLng[] = [new google.maps.LatLng(37.782551, -122.445368)];
  let heatMap: google.maps.visualization.HeatmapLayer =
    new google.maps.visualization.HeatmapLayer({
      data: points,
      map: map,
      radius: 20
    });
  let counter: number = 0;
  map.addListener('click', function (e) {
    points[counter] = e.latLng;
    counter++;

    // console.log(points);
    heatMap.setData(points);
  });
}

// Init with geocoder look at by address
// Click map, will show address
function geoCodeTest() {
  var geoCoder = new google.maps.Geocoder();
  map.addListener('click', function (e) {
    geoCoder.geocode({
      'location': e.latLng
    },
      function (result, status) {
        alert(result[0].formatted_address);
      });
  });
  // init location using geocode
  let address: string = "New York, New York";
  geoCoder.geocode({
    'address': address
  }, function (result, status) {
    console.log(result);
    map.setCenter(result[0].geometry.location);
  });
}

function placesTest() {
  map.setZoom(15);
  let service: google.maps.places.PlacesService = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: chicago,
    radius: 500,
    types: ['store']
  }, function(results: google.maps.places.PlaceResult[]) {
    console.log(arguments);
    results.forEach(place=>{
      let marker: google.maps.Marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
      });
    });
  });
}