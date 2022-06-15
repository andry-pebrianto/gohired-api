const { v4: uuidv4 } = require('uuid');
const db = require('../config/db');

module.exports = {
  insertChat: (senderId, receiverId, message) => {
    const id = uuidv4();
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO chat (id, sender, receiver, message) VALUES ($1, $2, $3, $4)', [id, senderId, receiverId, message], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
  deleteChat: (id, senderId) => new Promise((resolve, reject) => {
    db.query('DELETE FROM chat WHERE id=$1 AND sender=$2', [id, senderId], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  listChat: (senderId, receiverId) => new Promise((resolve, reject) => {
    db.query(`SELECT 
      chat.id, 
      chat.message, 
      chat.date, 
      userSender.id AS sender_id, 
      userReceiver.id AS receiver_id 
      FROM chat
      INNER JOIN users AS userSender ON chat.sender=userSender.id
      INNER JOIN users AS userReceiver ON chat.receiver=userReceiver.id
      WHERE (sender = '${senderId}' AND receiver = '${receiverId}') 
      OR (sender = '${receiverId}' AND receiver = '${senderId}')`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
};
