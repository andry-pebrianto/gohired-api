const express = require('express');
const jwtAuth = require('../middlewares/jwtAuth');
const { list } = require('../controllers/user.controller');

const router = express.Router();

router
  .get('/user/worker', jwtAuth, list)
  .get('/user/recruiter', jwtAuth, list)
  .get('/user/:id', jwtAuth, () => {});

module.exports = router;
