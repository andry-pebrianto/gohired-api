const express = require('express');
const validation = require('../validations/auth.validation');
const runValidation = require('../middlewares/runValidation');
const {
  register, activation,
} = require('../controllers/auth.controller');

const router = express.Router();

router
  .post('/auth/register/worker', validation.registerWorker, runValidation, register)
  .post('/auth/register/recruiter', validation.registerRecruiter, runValidation, register)
  .get('/auth/activation/:token', activation);

module.exports = router;
