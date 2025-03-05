const constants = require('../config/constants');
const handlerResponse = require('../middlewares/handlerResponse');

const ascensorRepository = require('../repositories/ascensorRepository');
const floorRepository = require('../repositories/floorRepository');

const getState = (req, res) => {
    try {
        const data = ascensorRepository.getData();
        if (data) {
            handlerResponse.success(res, data, 'Datos obtenidos correctamente');
        } else {
            handlerResponse.success(res, 'No se encontraron datos en la caché', 404);
        }
    } catch (error) {
        handlerResponse.error(res, error.message, 500);
    }
};

const postState = (req, res) => {
    try {
        const body = req.body;
        ascensorRepository.setData(body);
        handlerResponse.success(res, body, 'Datos almacenados en la caché');
    } catch (error) {
        handlerResponse.error(res, error.message, 500);
    }
};

const skipAscensor = (newFloorData) => {
    const oldState = ascensorRepository.getData();
    const anotherFloor = validFloorAscensorContinue(oldState);
    if (anotherFloor){
        alterAscensorState(anotherFloor);
    } else {
        if (newFloorData.floor === oldState.currentFloor) {
            oldState.direction = 'stay';
            oldState.state = 0;
            oldState.open = 0;
            ascensorRepository.setData(oldState);
            console.log(`Detener Ascensor`);
        }
    }
};

const changeCacheAscensorState = (newFloorData) => {
    const oldState = ascensorRepository.getData();
    oldState.direction = newFloorData.direction;
    if (validFloorAscensorStop(oldState)) {
        ascensorRepository.setData({...oldState, open: 1});
        removeFloorByAscensor(oldState);
        setTimeout(() => skipAscensor(newFloorData), constants.SKIP_INTERVAL);
    } else {
        newState =  moveAscensor(newFloorData.floor, oldState);
        console.log(`Se esta Moviendo el Ascensor a piso = ${newFloorData.floor} y sentido = ${newFloorData.direction}`);
        console.log(`Estado del Ascensor: `, oldState);
        ascensorRepository.setData(newState);
        setTimeout(() => changeCacheAscensorState(newFloorData), constants.MOVE_INTERVAL);
    }
};

const alterAscensorState = (newFloorData) => {
    changeCacheAscensorState(newFloorData);
};

const moveAscensor = (newFloor, state) => {
    if (!state.open && state.currentFloor !== newFloor) {
        state.currentFloor = newFloor < state.currentFloor ? state.currentFloor - 1 : state.currentFloor + 1; 
    }
    state.open = 0;
    state.state = 1;
    return state;
};

const validateAscensor = (floorData) => {
    if (!ascensorRepository.isActive()) {
        alterAscensorState(floorData);
    }
};

const validFloorAscensorStop = (state) => {
    const floorList = floorRepository.getData();
    return floorList.find(row => state.currentFloor === row.floor) || floorList.length === 0;
};

const removeFloorByAscensor = (value) => {
    const floorList = floorRepository.getData();
    const newData = floorList.filter( row => !(row.floor === value.currentFloor && row.direction === value.direction));
    floorRepository.setData(newData);
};

const validFloorAscensorContinue = (state) => {
    const floorList = floorRepository.getData();
    return floorList.find(row => (state.direction === row.direction && (state.direction === 'up' ? state.currentFloor < row.floor : state.currentFloor > row.floor)));
}

module.exports = {
    getState,
    postState,
    alterAscensorState,
    validateAscensor
};