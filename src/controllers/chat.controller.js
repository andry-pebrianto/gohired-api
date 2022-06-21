const { v4: uuidv4 } = require('uuid');
const chatModel = require('../models/chat.model');
const { success, failed } = require('../utils/createResponse');

module.exports = {
  insertInitialChat: async (req, res) => {
    try {
      const { sender, receiver, chat } = req.body;

      await chatModel.store({
        id: uuidv4(),
        sender,
        receiver,
        chat,
        createdAt: new Date(),
      });

      success(res, {
        code: 200,
        payload: null,
        message: 'Insert Initial Chat Success',
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: 'Internal Server Error',
      });
    }
  },
};
