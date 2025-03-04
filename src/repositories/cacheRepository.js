const WebSocket = require('ws');
const cache = new Map();
let websocketState = null;

const set = (key, value) => {
    cache.set(key, value);
    sentUpdate(key, value);
};

const get = (key) => {
    return cache.get(key);
};

const sentUpdate = (key, value) => {
    if (websocketState && key === 'ascensorEntity') {
        websocketState.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ type: 'elevatorUpdate', key, value }));
            }
        });
    }
}

const setWebSocketServer = (websocketServer) => {
    websocketState = websocketServer;
};

module.exports = {
    set,
    get,
    setWebSocketServer
};