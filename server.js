const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
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
// 404 router
app.use((req, res) => {
  failed(res, {
    code: 404,
    payload: 'Resource on that url not found',
    message: 'Not Found',
  });
});

// running server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT} with ${NODE_ENV} environment`);
  console.log(`Visit http://localhost:${PORT}`);
  console.log('Developed by Andry Pebrianto');
});
