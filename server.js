const http = require('http');
const express = require('express');
const socketIo = require('socket.io');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const socketController = require('./src/socket');
const { APP_NAME, NODE_ENV, PORT } = require('./src/utils/env');
const { failed } = require('./src/utils/createResponse');

// deklarasi express
const app = express();

// middleware
app.use(express.json());
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false,
  }),
);
app.use(xss());
app.use(cors());
app.use(express.static('public'));

// root router
app.get('/', (req, res) => res.send(`${APP_NAME} API - ${NODE_ENV[0].toUpperCase() + NODE_ENV.slice(1)}`));
// main router
app.use(require('./src/router/auth.route'));
app.use(require('./src/router/user.route'));
app.use(require('./src/router/experience.route'));
app.use(require('./src/router/project.route'));
app.use(require('./src/router/chat.route'));
app.use(require('./src/router/skill.route'));
// 404 router
app.use((req, res) => {
  failed(res, {
    code: 404,
    payload: 'Resource on that url not found',
    message: 'Not Found',
  });
});

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  },
});
io.on('connection', (socket) => {
  console.log('New user connected to socket');
  socketController(io, socket);
});

// running server
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT} with ${NODE_ENV} environment`);
  console.log(`Visit http://localhost:${PORT}`);
  console.log('Developed by Andry Pebrianto');
});
