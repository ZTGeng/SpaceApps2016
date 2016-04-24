var api_key = 'caa5d242d66d754614d1f5d60424bb81';
var Request = require('request');
// var Stringify = require('json-stringify-safe');

var _showError = function(req, res, statusCode) {
  res.status(statusCode);
  res.json({ message: 'Error retriving data!'});
};

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

function getWeatherDataFromOutApi(req, res, callback) {
  var requestOptions = {};
  var lng = req.query.lng;
  var lat = req.query.lat;

  requestOptions.url = 'https://api.forecast.io/forecast/' + api_key + '/' + lat + ',' + lng;
  requestOptions.method = 'GET';
  Request(requestOptions, function(err, response, body) {
    if (response.statusCode === 200) {
      var data = JSON.parse(body);
      callback(req, res, data);
    } else {
      _showError(req, res, response.statusCode);
    }
  });
}

function getLocationInfoFromOutApi(req, res, callback) {
  var requestOptions = {};
  var lng = req.query.lng;
  var lat = req.query.lat;

  requestOptions.url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng;
  requestOptions.method = 'GET';
  Request(requestOptions, function(err, response, body) {
    if (response.statusCode === 200) {
      var data = JSON.parse(body);
      callback(req, res, data);
    } else {
      _showError(req, res, response.statusCode);
    }
  });
}

function processData(data) {
  // console.log(data);
  var locationDataLen = data.locationData.results.length;
  var locationData = data.locationData.results;
  var returnData = {
    summary: data.weatherData.currently.summary,
    temperature: data.weatherData.currently.temperature,
    daySummary: data.weatherData.daily.data[0]
  };

  for (var i = 0; i < locationDataLen; i++) {
    if (locationData[i].types.toString() === 'locality,political') {
      returnData.city = locationData[i].address_components[0].long_name;
    } else if (locationData[i].types.toString() === 'neighborhood,political') {
      returnData.neighborhood = locationData[i].address_components[0].long_name;
    }
  }

  return returnData;
}

module.exports.getWeatherDataByGeo = function(req, res, next) {
  getWeatherDataFromOutApi(req, res, function(req, res, weatherData) {
    getLocationInfoFromOutApi(req, res, function(req, res, locationData) {
      var returnData = processData({
        weatherData: weatherData,
        locationData: locationData
      });
      sendJsonResponse(res, 200, returnData);
    });
  });
};
