const db = require('../config/db');

module.exports = {
  register: (body) => new Promise((resolve, reject) => {
    const {
      id,
      name,
      slug,
      email,
      phone,
      password,
      level,
      createdAt,
      updatedAt,
    } = body;

    db.query(
      'INSERT INTO users (id, name, slug, email, phone, password, level, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id',
      [id, name, slug, email, phone, password, level, createdAt, updatedAt],
      (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      },
    );
  }),
  updateToken: (id, token) => new Promise((resolve, reject) => {
    db.query(
      'UPDATE users SET email_token=$1 WHERE id=$2',
      [token, id],
      (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      },
    );
  }),
  activateEmail: (id) => new Promise((resolve, reject) => {
    db.query(
      'UPDATE users SET is_verified=true WHERE id=$1',
      [id],
      (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      },
    );
  }),
  login: (email) => new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM users WHERE email=$1',
      [email],
      (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      },
    );
  }),
};
