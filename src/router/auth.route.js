const express = require('express');
const { isVerified } = require('../middlewares/authorization');
const validation = require('../validations/auth.validation');
const runValidation = require('../middlewares/runValidation');
const {
  register, activation, login, forgot, reset,
} = require('../controllers/auth.controller');

const router = express.Router();

router
  .post('/auth/register/worker', validation.registerWorker, runValidation, register)
  .post('/auth/register/recruiter', validation.registerRecruiter, runValidation, register)
  .get('/auth/activation/:token', activation)
  .post('/auth/login', isVerified, validation.login, runValidation, login)
  .post('/auth/forgot', isVerified, validation.forgot, runValidation, forgot)
  .post('/auth/reset/:token', isVerified, validation.reset, runValidation, reset);

module.exports = router;
