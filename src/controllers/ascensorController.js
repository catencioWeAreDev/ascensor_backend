const ascensorService = require('../services/ascensorService');

const getState = ascensorService.getState;
const postState = ascensorService.postState;

module.exports = {
    getState,
    postState,
};