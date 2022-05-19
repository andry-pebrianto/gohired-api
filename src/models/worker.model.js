const db = require('../config/db');

module.exports = {
  addWorker: (data) => new Promise((resolve, reject) => {
    const { id, userId } = data;

    db.query(
      'INSERT INTO workers (id, user_id) VALUES ($1, $2)',
      [id, userId],
      (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      },
    );
  }),
};
