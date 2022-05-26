const db = require('../config/db');

module.exports = {
  findBy: (field, search) => new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM chats WHERE ${field}=$1`,
      [search],
      (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      },
    );
  }),
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
  removeById: (id) => new Promise((resolve, reject) => {
    db.query(
      'DELETE FROM chats WHERE id=$1',
      [id],
      (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      },
    );
  }),
};
