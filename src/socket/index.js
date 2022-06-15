const chatModel = require('../models/chat.model');

module.exports = (io, socket) => {
  socket.on('join-room', (id) => {
    try {
      socket.join(id);
    } catch (error) {
      console.log(error);
    }
  });
  socket.on('delete-message', async (data) => {
    try {
      const { senderId, receiverId, idmessage } = data;
      // delete chat
      await chatModel.deleteChat(idmessage, senderId);

      // refresh message
      const listChats = await chatModel.listChat(senderId, receiverId);
      io.to(senderId).emit('send-message-response', listChats.rows);
      io.to(receiverId).emit('send-message-response', listChats.rows);
    } catch (error) {
      console.log(error);
    }
  });
  socket.on('send-message', async (data) => {
    try {
      const { senderId, receiverId, message } = data;
      // insert message
      await chatModel.insertChat(senderId, receiverId, message);

      // refresh message
      const listChats = await chatModel.listChat(senderId, receiverId);
      io.to(receiverId).emit('send-message-response', listChats.rows);
      io.to(senderId).emit('send-message-response', listChats.rows);
    } catch (error) {
      console.log(error);
    }
  });
  socket.on('chat-history', async (data) => {
    try {
      const { senderId, receiverId } = data;

      const listChats = await chatModel.listChat(senderId, receiverId);
      io.to(senderId).emit('send-message-response', listChats.rows);
    } catch (error) {
      console.log(error);
    }
  });
};
