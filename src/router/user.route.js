const express = require('express');
const { listWorker, listRecruiter } = require('../controllers/user.controller');
const jwtAuth = require('../middlewares/jwtAuth');

const router = express.Router();

router
  .get('/user/worker', jwtAuth, listWorker)
  .get('/user/recruiter', jwtAuth, listRecruiter);

module.exports = router;
