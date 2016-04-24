var Express = require('express');
var Router = Express.Router();
var ctrlGetData = require('../controllers/getData');
var ctrlPolluData = require('../controllers/pollute');

Router.get('/getData', ctrlGetData.getWeatherDataByGeo);

Router.get('/getPollutionData', ctrlPolluData.getPollutionDataByGeoTime);
Router.get('/getUVDataByGeo', ctrlPolluData.getUVDataByGeo);

module.exports = Router;
