(function($, L) {
  'use strict';
  var defaultZoom = 16;

  function start() {
    var lat, lng;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        lat = position.coords.latitude;
        lng = position.coords.longitude;
        console.log("lat lng: " + lat + " " + lng);
        creatMap(lat, lng);
      });
    } else {
      lat = 37.78684346730307;
      lng = -122.40559101104735;
      console.log("Use default location (SF)");
      // TODO use IP get location
      creatMap(lat, lng);
    }
  }

  function creatMap(lat, lng) {
    // Get the user's API key via prompt
    if (!localStorage.getItem('uc_api_key') || localStorage.getItem('uc_api_key') == "null") {
      localStorage.setItem('uc_api_key', "357C908148B64CD19F08");
    }
    // Get the user's API secret via prompt
    if (!localStorage.getItem('uc_api_secret') || localStorage.getItem('uc_api_secret') == "null") {
      localStorage.setItem('uc_api_secret', "0E6932BAC9A84E068B9A66DA4C8F3D53");
    }
    // Confirm we've got 'em by displaying them to the screen
    var apiKey = localStorage.getItem('uc_api_key'),
      apiSecret = localStorage.getItem('uc_api_secret');
    // Create a Leaflet map
    var map = L.map('map')
      .setView([
        lat,
        lng
      ], defaultZoom);
    // Create a simple UC tile layer - global map, no restrictions
    var url = 'https://tile-{s}.urthecast.com/v1/rgb/{z}/{x}/{y}?api_key=' + apiKey + '&api_secret=' + apiSecret;
    // Append it to the map
    // var ucTiles = L.tileLayer(url).addTo(map);
    var googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });
    var googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });
    var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });
    var googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });
    googleSat.addTo(map);
    L.marker([lat, lng])
      .addTo(map);
    map.on('click', function(e) {
      var latlng = e.latlng;
      $.ajax({
          method: 'GET',
          url: '/api/getData?lat=' + latlng.lat + '&lng=' + latlng.lng
        })
        .done(function(data) {
          // console.log(data);
          var pop1 = '<div><strong>City: </strong><span>';
          var pop2 = '</span><br><strong>Weather: </strong><span>';
          var pop3 = '</span><br><strong>Tempurature: </strong><span>';
          var pop4 = '</span><br><strong>Max Temp: </strong><span>';
          var pop5 = '</span><br><strong>Min Temp: </strong><span>';
          var pop6 = '</span></div>';
          var popupTemplate = pop1 + data.city + pop2 + data.summary + pop3 + data.temperature + pop4 + data.daySummary.temperatureMax + pop5 + data.daySummary.temperatureMin + pop6;
          // console.log(popupTemplate);
          var popup = L.popup()
            .setLatLng(latlng)
            .setContent(popupTemplate)
            .openOn(map);
        });
    });
  }
  $('document')
    .ready(start());
}($, L));
