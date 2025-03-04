const constants = require('../config/constants');
const handlerResponse = require('../middlewares/handlerResponse');

const floorRepository = require('../repositories/floorRepository');

const ascensorService = require('./ascensorService');

const getFloor = (req, res) => {
    try {
        const data = floorRepository.getData();
        handlerResponse.success(res, data, 'Datos obtenidos correctamente');
    } catch (error) {
        handlerResponse.error(res, error.message, 500);   
    }
}

const postFloor = (req, res) => {
    try {
        const body = req.body;
        if (body.floor <= 0 || body.floor > constants.FLOORS_NUMBER) {
            handlerResponse.error(res, `El número de piso debe estar entre 0 y ${constants.FLOORS_NUMBER}`);
            return;
        }
        const data = addFloorRequest(body);
        handlerResponse.success(res, data, 'Datos almacenados en la caché');
    } catch (error) {
        handlerResponse.error(res, error.message, 500);
    }
};

const addFloorRequest = (floorData) => {
    const value = floorRepository.getData();
    if (!value.find( row => floorData.floor === row.floor && floorData.direction === row.direction)) {
        value.push(floorData);
        floorRepository.setData(value);
        ascensorService.validateAscensor(floorData);
    }
    return value;
}


module.exports = {
    getFloor,
    postFloor
};