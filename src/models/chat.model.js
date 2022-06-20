const db = require('../config/db');

module.exports = {
  list: (sender, receiver) => new Promise((resolve, reject) => {
    db.query(
      `SELECT userSender.photo AS photo, chats.created_at, chats.id, chats.chat, chats.is_deleted, userSender.id AS sender_id, userReceiver.id AS receiver_id FROM chats LEFT JOIN users AS userSender ON chats.sender=userSender.id LEFT JOIN users AS userReceiver ON chats.receiver=userReceiver.id WHERE (sender='${sender}' AND receiver='${receiver}') OR (sender='${receiver}' AND receiver='${sender}') ORDER BY chats.created_at`,
      (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      },
    );
  }),
  store: (data) => {
    const {
      id, sender, receiver, chat, createdAt,
    } = data;

    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO chats (id, sender, receiver, chat, created_at) VALUES ($1, $2, $3, $4, $5)',
        [id, sender, receiver, chat, createdAt],
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        },
      );
    });
  },
  updateChat: (id, newMessage) => new Promise((resolve, reject) => {
    db.query('UPDATE chats SET chat=$1 WHERE id=$2', [newMessage, id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  deleteChat: (id) => new Promise((resolve, reject) => {
    db.query('UPDATE chats SET is_deleted=true WHERE id=$1', [id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
};
