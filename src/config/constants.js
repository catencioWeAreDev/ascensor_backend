const constants = {
  PORT: process.env.PORT || 3001,
  PORT_WEBSOCKET: process.env.PORT_WEBSOCKET || 3002,
  FLOORS_NUMBER: process.env.FLOORS_NUMBER || 20,
  MOVE_INTERVAL: process.env.MOVE_INTERVAL || 3000,
  SKIP_INTERVAL: process.env.SKIP_INTERVAL || 10000,
};

module.exports = constants;