const floorService = require('../services/floorService');

const getState = floorService.getFloor;
const postState = floorService.postFloor;

module.exports = {
    getState,
    postState,
};