const express = require('express');
const validation = require('../validations/chat.validation');
const runValidation = require('../middlewares/runValidation');
const { chatOwner } = require('../middlewares/authorization');
const jwtAuth = require('../middlewares/jwtAuth');
const { sendChat, removeChat, listMenuChat } = require('../controllers/chat.controller');

const router = express.Router();

router
  .post('/chat', jwtAuth, validation.sendChat, runValidation, sendChat)
  .delete('/chat/:id', jwtAuth, chatOwner, removeChat)
  .get('/chat/:id/menu', jwtAuth, listMenuChat);

module.exports = router;
