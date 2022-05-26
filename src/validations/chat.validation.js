const { check } = require('express-validator');

const sendChat = [
  // chatMessage
  check('chatMessage', 'Chat message required').not().isEmpty(),
  check('chatMessage', 'Chat message maximum length is 500 characters').isLength({ max: 500 }),
];

module.exports = {
  sendChat,
};
