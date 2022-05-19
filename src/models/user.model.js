const db = require('../config/db');

module.exports = {
  findBy: (field, search) => new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM users WHERE ${field}=$1`,
      [search],
      (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      },
    );
  }),
};
