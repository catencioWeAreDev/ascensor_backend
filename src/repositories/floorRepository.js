const commonRepository = require('./commonRepository');

const entityName = 'floorEntity';

const isActive = () => {
    const data = getData();
    return data.state;
}

const getData = () => {
    return commonRepository.getEntity(entityName) || [];
}

const setData = (value) => {
    commonRepository.setEntity(entityName, value);
};

module.exports = {
    isActive,
    getData,
    setData
};