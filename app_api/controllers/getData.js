var api_key = 'caa5d242d66d754614d1f5d60424bb81';
var Request = require('request');
// var Stringify = require('json-stringify-safe');

var _showError = function(req, res, statusCode) {

};

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

function getDataFromOutApi(req, res, callback) {
  var requestOptions = {};
  var lng = req.query.lng;
  var lat = req.query.lat;

  requestOptions.url = 'https://api.forecast.io/forecast/' + api_key + '/' + lng + ',' + lat;
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

function sendJsonResponse(res, status, content) {
  res.status(status);
  res.json(content);
}

module.exports.getWeatherDataByGeo = function(req, res, next) {
  getDataFromOutApi(req, res, function(req, res, responseData) {
    sendJsonResponse(res, 200, responseData);
  });
};
