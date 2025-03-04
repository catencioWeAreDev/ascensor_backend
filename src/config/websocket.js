const WebSocket = require('ws');

const setupWebSocket = (server) => {
  const websocketState = new WebSocket.Server({ server });

  websocketState.on('connection', (websocket) => {
    console.log('Nuevo cliente conectado');

    websocket.send(JSON.stringify({ type: 'welcome', message: 'Conectado al servidor WebSocket' }));

    websocket.on('message', (message) => {
      console.log(`Mensaje recibido: ${message}`);
    });

    websocket.on('close', () => {
      console.log('Cliente desconectado');
    });
  });

  return websocketState;
};

module.exports = setupWebSocket;