const express = require('express');
const validation = require('../validations/user.validation');
const { myself, onlyRecruiter, onlyWorker } = require('../middlewares/authorization');
const socialValidation = require('../validations/social.validation');
const runValidation = require('../middlewares/runValidation');
const jwtAuth = require('../middlewares/jwtAuth');
const upload = require('../middlewares/upload');
const photoLimit = require('../middlewares/photoLimit');
const {
  list, detail, updatePhoto, updateProfile, getListChatRecruiter, getListChatWorker, listNewWorker,
} = require('../controllers/user.controller');

const router = express.Router();

router
  .get('/user/worker', jwtAuth, list)
  .get('/user/recruiter', jwtAuth, list)
  .get('/user/chat/recruiter', jwtAuth, onlyRecruiter, getListChatRecruiter)
  .get('/user/chat/worker', jwtAuth, onlyWorker, getListChatWorker)
  .get('/user/:id', jwtAuth, detail)
  .put('/user/:id/profile', jwtAuth, myself, validation.updateProfile, runValidation, socialValidation, updateProfile)
  .put('/user/:id/photo', jwtAuth, myself, upload, photoLimit, updatePhoto)
  .get('/user/worker/new', listNewWorker);

module.exports = router;
