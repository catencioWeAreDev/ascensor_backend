const cacheRepository = require('./cacheRepository');

const getEntity = (entityName) => {
    return cacheRepository.get(entityName);
};

const setEntity = (entityName, value) => {
    cacheRepository.set(entityName, value);
};

module.exports = {
    getEntity,
    setEntity
};