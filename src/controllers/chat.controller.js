const { v4: uuidv4 } = require('uuid');
const userModel = require('../models/user.model');
const chatModel = require('../models/chat.model');
const { success, failed } = require('../utils/createResponse');

module.exports = {
  sendChat: async (req, res) => {
    try {
      const { receiverId, chatMessage } = req.body;

      const user = await userModel.findBy('id', receiverId);

      // jika user tidak ditemukan
      if (!user.rowCount) {
        failed(res, {
          code: 404,
          payload: `User with Id ${receiverId} not found`,
          message: 'Send Chat Failed',
        });
        return;
      }

      await chatModel.send({
        id: uuidv4(),
        senderId: req.APP_DATA.tokenDecoded.id,
        receiverId,
        chatMessage,
        createdAt: new Date(),
      });

      success(res, {
        code: 200,
        payload: null,
        message: 'Send Chat Success',
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: 'Internal Server Error',
      });
    }
  },
  removeChat: async (req, res) => {
    try {
      const { id } = req.params;
      const chat = await chatModel.findBy('id', id);

      // jika chat tidak ditemukan
      if (!chat.rowCount) {
        failed(res, {
          code: 404,
          payload: `Chat with Id ${id} not found`,
          message: 'Remove Chat Failed',
        });
        return;
      }

      await chatModel.removeById(id);

      success(res, {
        code: 200,
        payload: null,
        message: 'Remove Chat Success',
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
