var Express = require('express');
var Router = Express.Router();
var ctrlGetData = require('../controllers/getData');

Router.get('/getData', ctrlGetData.getWeatherDataByGeo);

module.exports = Router;
