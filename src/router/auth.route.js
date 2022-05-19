const express = require('express');
const validation = require('../validations/auth.validation');
const runValidation = require('../middlewares/runValidation');
const {
  register, activation, login,
} = require('../controllers/auth.controller');

const router = express.Router();

router
  .post('/auth/register/worker', validation.registerWorker, runValidation, register)
  .post('/auth/register/recruiter', validation.registerRecruiter, runValidation, register)
  .get('/auth/activation/:token', activation)
  .post('/auth/login', validation.login, runValidation, login);

module.exports = router;
