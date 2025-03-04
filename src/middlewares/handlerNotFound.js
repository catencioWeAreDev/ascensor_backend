const handlerResponse = require('./handlerResponse');

const handlerNotFound = (req, res, next) => {
    handlerResponse.error(res, 'Endpoint no encontrado', 404, [ `La ruta ${req.originalUrl} no existe en este servidor.` ]);
};

module.exports = handlerNotFound;