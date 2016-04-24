var api_key = 'caa5d242d66d754614d1f5d60424bb81';
var Request = require('request');
// var Stringify = require('json-stringify-safe');

var _showError = function(req, res, statusCode) {

};

var sendJsonResponse = function(res, status, content) {
  // var returnData = {};
  // returnData.city = 'DummyCityNotFinished';
  // returnData.summary =
  var returnData = {
    city: 'Dummy',
    summary: content.currently.summary,
    temperature: content.currently.temperature,
    daySummary: content.daily.data[0]
  };
  res.status(status);
  res.json(returnData);
};

function getDataFromOutApi(req, res, callback) {
  var requestOptions = {};
  var lng = req.query.lng;
  var lat = req.query.lat;

  requestOptions.url = 'https://api.forecast.io/forecast/' + api_key + '/' + lat + ',' + lng;
  requestOptions.method = 'GET';
  console.log(requestOptions);
  Request(requestOptions, function(err, response, body) {
    if (response.statusCode === 200) {
      var data = JSON.parse(body);
      callback(req, res, data);
    } else {
      _showError(req, res, response.statusCode);
    }
  });
}

module.exports.getWeatherDataByGeo = function(req, res, next) {
  console.log("api call");
  getDataFromOutApi(req, res, function(req, res, responseData) {
    sendJsonResponse(res, 200, responseData);
  });
};
