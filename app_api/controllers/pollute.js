var Request = require('request');

var api_key = '6a4411231acd64402ddec3926f17f592';

var _showError = function(req, res, statusCode) {

};

//http://api.openweathermap.org/pollution/v1/co/0.0,10.0/current.json?appid=6a4411231acd64402ddec3926f17f592
//http://api.openweathermap.org/pollution/v1/co/37.78684346730307,-122.40559101104735/current.json?appid=6a4411231acd64402ddec3926f17f592
function getPollutionData(req, res, callback) {

	var lng = parseInt(req.query.lng);
	var lat = parseInt(req.query.lat);
		
	var urlVariable = 'http://api.openweathermap.org/pollution/v1/co/' + lat + ',' + lng + '/current.json?appid=' + api_key;

	var requestOptions = {};

	requestOptions.url = urlVariable;
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


function getUVData(req, res, callback) {
	var lng = req.query.lng;
	var lat = req.query.lat;

	console.log("in UV");
	console.log(lng);
	console.log(lat);

	var urlquest = 'http://api.owm.io/air/1.0/uvi/current?lat=' + lat + '&lon=' + lng + '&appid=' + api_key;

	console.log(urlquest);

	var requestOptions = {};
	requestOptions.url = urlquest;
	requestOptions.method = 'GET';

	Request(requestOptions, function(err, response, body) {
		if(response.statusCode === 200) {
			var data = JSON.parse(body);
			callback(req, res, data);
		} else {
			_showError(req, res, response.statusCode);
		}
	});
}

function sendUVJsonResponse(res, status, content) {
	res.status(status);

	var returnData = content.value;

	res.json(returnData);
}

function sendPollutionJsonResponse(res, status, content) {
	res.status(status);
	
	var returnData = content.data[0].value;
	
	res.json(returnData);
}

module.exports.getPollutionDataByGeoTime = function(req, res, next) {
	getPollutionData(req, res, function(req, res, responseData) {

		sendPollutionJsonResponse(res, 200, responseData);
	});
	//res.send('Hello pollution');
};

module.exports.getUVDataByGeo = function(req, res, next) {
	getUVData(req, res, function(req, res, responseData) {
		sendUVJsonResponse(res, 200, responseData);
	});
};

