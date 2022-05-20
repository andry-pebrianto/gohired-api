const express = require('express');
const jwtAuth = require('../middlewares/jwtAuth');
const { list, detail, update } = require('../controllers/user.controller');

const router = express.Router();

router
  .get('/user/worker', jwtAuth, list)
  .get('/user/recruiter', jwtAuth, list)
  .get('/user/:slug', jwtAuth, detail)
  .put('/user/:slug', jwtAuth, update);

module.exports = router;
