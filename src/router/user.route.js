const express = require('express');
const jwtAuth = require('../middlewares/jwtAuth');
const { listWorker, listRecruiter } = require('../controllers/user.controller');

const router = express.Router();

router
  .get('/user/worker', jwtAuth, listWorker)
  .get('/user/recruiter', jwtAuth, listRecruiter);

module.exports = router;
