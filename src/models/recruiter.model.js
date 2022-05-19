const db = require('../config/db');

module.exports = {
  addRecruiter: (data) => new Promise((resolve, reject) => {
    const {
      id, userId, position, companyName,
    } = data;

    db.query(
      'INSERT INTO recruiters (id, user_id, position, company_name) VALUES ($1, $2, $3, $4)',
      [id, userId, position, companyName],
      (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      },
    );
  }),
};
