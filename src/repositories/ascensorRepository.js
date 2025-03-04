const commonRepository = require('./commonRepository');
const { getInitialData } = require('../utils/initialAscensorState');

const entityName = 'ascensorEntity';

const isActive = () => {
    const data = getData();
    return data.state;
}

const getData = () => {
    return commonRepository.getEntity(entityName) || getInitialData();
}

const setData = (value) => {
    commonRepository.setEntity(entityName, value);
};

module.exports = {
    isActive,
    getData,
    setData
};