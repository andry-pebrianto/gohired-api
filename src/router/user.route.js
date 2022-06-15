const express = require('express');
const validation = require('../validations/user.validation');
const { myself } = require('../middlewares/authorization');
const socialValidation = require('../validations/social.validation');
const runValidation = require('../middlewares/runValidation');
const jwtAuth = require('../middlewares/jwtAuth');
const upload = require('../middlewares/upload');
const photoLimit = require('../middlewares/photoLimit');
const {
  list, detail, updatePhoto, updateProfile, getListChatRecruiter, getListChatWorker,
} = require('../controllers/user.controller');

const router = express.Router();

router
  .get('/user/worker', jwtAuth, list)
  .get('/user/recruiter', jwtAuth, list)
  .get('/user/chat/recruiter', jwtAuth, getListChatRecruiter)
  .get('/user/chat/worker', jwtAuth, getListChatWorker)
  .get('/user/:id', jwtAuth, detail)
  .put('/user/:id/profile', jwtAuth, myself, validation.updateProfile, runValidation, socialValidation, updateProfile)
  .put('/user/:id/photo', jwtAuth, myself, upload, photoLimit, updatePhoto);

module.exports = router;
