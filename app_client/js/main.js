(function ($, L, animations) {
    'use strict';
    
    var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday"];
    // Get the user's API key via prompt
    if (!localStorage.getItem('uc_api_key') || localStorage.getItem('uc_api_key') == "null") {
      localStorage.setItem('uc_api_key', "357C908148B64CD19F08");
    }
    // Get the user's API secret via prompt
    if (!localStorage.getItem('uc_api_secret') || localStorage.getItem('uc_api_secret') == "null") {
      localStorage.setItem('uc_api_secret', "0E6932BAC9A84E068B9A66DA4C8F3D53");
    }
    var defaultZoom = 16,
        googleLayers = {
          streets: L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
            maxZoom: 20,
            minZoom: 10,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
          }),
          hybrid: L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
            maxZoom: 20,
            minZoom: 10,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
          }),
          satellite: L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
            maxZoom: 20,
            minZoom: 10,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
          }),
          terrain: L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
            maxZoom: 20,
            minZoom: 10,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
          })
        },
        // Confirm we've got 'em by displaying them to the screen
        apiKey = localStorage.getItem('uc_api_key'),
        apiSecret = localStorage.getItem('uc_api_secret'),
        map, currentLayer,
        unit = 'american',
        $layerSwitcher = $('.layer-switcher');


    function start() {
        var lat, lng;
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function (position) {
            lat = position.coords.latitude;
            lng = position.coords.longitude;
            console.log("lat lng: " + lat + " " + lng);
            creatMap(lat, lng);
            getDataForCurrentGeolocation(lat, lng);
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
      map = L.map('map').setView([lat, lng], defaultZoom);
      // changeLayer(googleHybrid)();
      map.addLayer(googleLayers.hybrid);
      currentLayer = 'hybrid';
      L.marker([lat, lng]).addTo(map);
      map.on('click', function (e) {
        var latlng = e.latlng;
        getWeatherDataBy(latlng.lat, latlng.lng, function(data) {
          console.log(data);
          var dayNum = (new Date()).getDay();
          // var pop1 = '<div class="click-info-container"><div class="animation"></div><strong>City: </strong><span>';
          // var pop15= '</span><br><strong>Neighborhood: </strong><span>';
          // var pop2 = '</span><br><strong>Weather: </strong><span>';
          // var pop3 = '</span><br><strong>Tempurature: </strong><span>';
          // var pop4 = '&deg;</span><br><strong>Max Temp: </strong><span>';
          // var pop5 = '&deg;</span><br><strong>Min Temp: </strong><span>';
          // var pop6 = '&deg;</span></div>';
          // var popupTemplate = pop1 + (data.city || 'Unknown') + pop15 + (data.neighborhood || 'Unkown') + pop2 + data.summary + pop3 + data.temperature + pop4 + data.daySummary.temperatureMax + pop5 + data.daySummary.temperatureMin + pop6;
          //       // console.log(popupTemplate);
          var unitStr = (unit === 'american') ? '&deg;F' : '&deg;C';
          var $template = $('<div></div>');
          var $clickInfoContainer = $('<div class="click-info-container"></div>');
          var $animation = $('<div class="animation"></div>');
          var $info = $('<div class="info"></div>');
          var $infoCurrentTemperature = $('<span class="info-current-temperature">' + parseInt(data.temperature) + unitStr + '</span>');
          var $infoSummary = ('<div class="info-summary">' + data.summary + '</div>');
          var $infoLocation = ('<div class="info-location">' + data.neighborhood + ', ' + data.city +'</div>');
          var $infoUV = $('<div class="info-uv"><strong>UV&nbsp;</strong>0.00043</div>');
          var $infoCO = $('<div class="info-co"><strong>CO&nbsp;</strong>0.4423</div>');
          var $hr = $('<hr>');
          var $tab = $('<div class="tab-content"><div role="tabpanel" class="tab-pane active" id="today"><dl class="info-dl dl-horizontal"><dt>Max Temperature</dt><dd class="info-max-temperature">' + data.todayMax + '</dd><dt>Min Temperature</dt><dd class="info-min-temperature">' + data.todayMin + '</dd></dl><div class="day-summary">' + data.todaySummary + '</div></div><div role="tabpanel" class="tab-pane" id="day2"><dl class="info-dl dl-horizontal"><dt>Max Temperature</dt><dd class="info-max-temperature">' + data.day2Max + '</dd><dt>Min Temperature</dt><dd class="info-min-temperature">' + data.day2Min + '</dd></dl><div class="day-summary">' + data.day2Summary + '</div></div><div role="tabpanel" class="tab-pane" id="day3"><dl class="info-dl dl-horizontal"><dt>Max Temperature</dt><dd class="info-max-temperature">' + data.day3Max + '</dd><dt>Min Temperature</dt><dd class="info-min-temperature">' + data.day3Min + '</dd></dl><div class="day-summary">' + data.day3Summary + '</div></div></div><ul class="nav nav-tabs" role="tablist"><li role="presentation" class="active"><a href="#today" aria-controls="today" role="tab" data-toggle="tab">Today</a></li><li role="presentation"><a href="#day2" aria-controls="day2" role="tab" data-toggle="tab" id="day2-tab">' + weekdays[(dayNum + 1) % 7] + '</a></li><li role="presentation"><a href="#day3" aria-controls="day3" role="tab" data-toggle="tab" id="day3-tab">' + weekdays[(dayNum + 2) % 7] + '</a></li></ul>');
          $clickInfoContainer.append($animation);

          $info.append($infoCurrentTemperature);
          $info.append($infoSummary);
          $info.append($infoLocation);
          $info.append($infoUV);
          $info.append($infoCO);
          $clickInfoContainer.append($info);
          $clickInfoContainer.append($hr);

          $clickInfoContainer.append($tab);
          $template.append($clickInfoContainer);

          // <span class="info-current-temperature">80</span>
          // <div class="info-summary">Partly Cloudy</div>
          // <div class="info-location">twin peaks, san francisco</div>
          // <div class="info-uv"><strong>UV&nbsp;</strong>0.00043</div>
          // <div class="info-co"><strong>CO&nbsp;</strong>0.4423</div>
          // <hr>
          // <dl class="info-dl dl-horizontal">
          //   <dt>Max Temperature</dt><dd class="info-max-temperature">89</dd>
          //   <dt>Min Temperature</dt><dd class="info-max-temperature">65</dd>
          // </dl>
          // <div class="day-summary">Partly cloudy starting in the afternoon.</div>
          var popup = L.popup().setLatLng(latlng).setContent($template.html()).openOn(map);
          animations.partlyCloudyNight();
        });
      });
    }

    function changeLayer(layer) {
      map.removeLayer(googleLayers[currentLayer]);
      map.addLayer(googleLayers[layer]);
      currentLayer = layer;
    }

    function getWeatherDataBy(lat, lng, callback) {
      $.ajax({
        method: 'GET',
        url: '/api/getData?lat=' + lat + '&lng=' + lng
      })
      .done(function (data) {
        callback(data);
      });
    }

    function getDataForCurrentGeolocation(lat, lng) {
      getWeatherDataBy(lat, lng, function(data) {
        var $locationTemperature = $('.location-temperature'),
            $weatherSummary = $('.weather-summary'),
            $location = $('.location'),
            unitStr = (unit === 'american') ? '&deg;F' : '&deg;C';

        $locationTemperature.html(parseInt(data.temperature) + ' ' + unitStr);
        $weatherSummary.html(data.summary);
        $location.html(data.neighborhood + ', ' + data.city);
      });
    }

    $layerSwitcher.on('click', function(e) {
      var $target = $(e.target);
      $(this).children('.btn-info').removeClass('btn-info').addClass('btn-primary');
      $target.addClass('btn-info');
      changeLayer($target.data('layer'));
    });

    $('document').ready(start());
} ($, L, new Animations()));
