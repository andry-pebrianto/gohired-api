const express = require('express');
const jwtAuth = require('../middlewares/jwtAuth');
const upload = require('../middlewares/upload');
const photoLimit = require('../middlewares/photoLimit');
const { list, detail, updatePhoto } = require('../controllers/user.controller');

const router = express.Router();

router
  .get('/user/worker', jwtAuth, list)
  .get('/user/recruiter', jwtAuth, list)
  .get('/user/:slug', jwtAuth, detail)
  .put('/user/:slug/photo', jwtAuth, upload, photoLimit, updatePhoto);

module.exports = router;
