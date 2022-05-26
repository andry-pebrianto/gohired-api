const db = require('../config/db');

module.exports = {
  send: (data) => new Promise((resolve, reject) => {
    const {
      id, senderId, receiverId, chatMessage, createdAt,
    } = data;

    db.query(
      'INSERT INTO chats (id, sender_id, receiver_id, chat_message, created_at) VALUES ($1, $2, $3, $4, $5)',
      [id, senderId, receiverId, chatMessage, createdAt],
      (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      },
    );
  }),
};
