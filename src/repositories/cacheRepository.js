const cache = new Map();
let websocketState = null;

const set = (key, value) => {
    cache.set(key, value);

    if (websocketState) {
        websocketState.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ type: 'cacheUpdate', key, value }));
            }
        });
    }
};

const get = (key) => {
    return cache.get(key);
};

const setWebSocketServer = (websocketServer) => {
    websocketState = websocketServer;
};

module.exports = {
    set,
    get,
    setWebSocketServer
};