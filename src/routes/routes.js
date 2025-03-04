const express = require('express');

const ascensorRoute = require('./ascensorRoute');
const floorRoute = require('./floorRoute');

const routes = express.Router();

routes.use('/ascensor', ascensorRoute)
routes.use('/floor', floorRoute)

module.exports = routes;