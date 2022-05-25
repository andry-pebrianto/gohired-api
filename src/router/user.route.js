const express = require('express');
const validation = require('../validations/user.validation');
const socialValidation = require('../validations/social.validation');
const runValidation = require('../middlewares/runValidation');
const jwtAuth = require('../middlewares/jwtAuth');
const upload = require('../middlewares/upload');
const photoLimit = require('../middlewares/photoLimit');
const {
  list, detail, updatePhoto, updateProfile,
} = require('../controllers/user.controller');

const router = express.Router();

router
  .get('/user/worker', jwtAuth, list)
  .get('/user/recruiter', jwtAuth, list)
  .get('/user/:id', jwtAuth, detail)
  .put('/user/:id/profile', jwtAuth, validation.updateProfile, runValidation, socialValidation, updateProfile)
  .put('/user/:id/photo', jwtAuth, upload, photoLimit, updatePhoto);

module.exports = router;
