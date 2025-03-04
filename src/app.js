const express = require('express');
const cors = require("cors");
const http = require('http');

const constants = require('./config/constants');
const setupSwagger = require('./config/swagger');
const setupWebSocket = require('./config/websocket'); 

const handlerNotFound = require('./middlewares/handlerNotFound');

const cacheRepository = require('./repositories/cacheRepository');

const routes = require('./routes/routes');

const app = express();
const server = http.createServer(app);
const websocketState = setupWebSocket(server);

app.use(express.json());
app.use(cors());

setupSwagger(app);
cacheRepository.setWebSocketServer(websocketState);

app.use('/api', routes);
app.use(handlerNotFound);

app.listen(constants.PORT, () => {
  console.log(`Server is running on port ${constants.PORT}`);
});