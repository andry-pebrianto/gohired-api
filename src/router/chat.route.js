const express = require('express');
const validation = require('../validations/chat.validation');
const runValidation = require('../middlewares/runValidation');
const jwtAuth = require('../middlewares/jwtAuth');
const {
  sendChat,
} = require('../controllers/chat.controller');

const router = express.Router();

router
  .post('/chat', jwtAuth, validation.sendChat, runValidation, sendChat);

module.exports = router;
