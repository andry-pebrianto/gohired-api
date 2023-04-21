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
  selectAllWorker: (count, search = '', sortBy = '', paging) => new Promise((resolve, reject) => {
    let base = 'SELECT';
    if (count) {
      base += ' COUNT(*)';
    } else {
      base
          += ' users.id, users.name, users.email, users.photo, users.address, users.phone, workers.job_desk, workers.skills';
    }
    let sql = `${base} FROM users INNER JOIN workers ON users.id = workers.user_id WHERE users.is_verified=true AND LOWER(users.name) LIKE '%'||LOWER($1)||'%' OR (
        0 < (
          SELECT COUNT(*) 
          FROM unnest(workers.skills) AS skills
          WHERE LOWER(skills) LIKE '%'||LOWER($1)||'%'
        )
      ) OR LOWER(workers.job_desk) LIKE '%'||LOWER($1)||'%' OR LOWER(users.address) LIKE '%'||LOWER($1)||'%'`;

    // jika query tidak ditujukan untuk mendapatkan count
    if (!count) {
      // jika ada sortBy
      if (sortBy.trim() === 'name') {
        sql += ' ORDER BY users.name';
      } else {
        sql += ' ORDER BY users.created_at';
      }

      // limit & offset
      sql += ` LIMIT ${paging.limit} OFFSET ${paging.offset}`;
    }

    db.query(sql, [search], (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  }),
  selectAllRecruiter: (count, search = '', sortBy = '', paging) => new Promise((resolve, reject) => {
    let base = 'SELECT';
    if (count) {
      base += ' COUNT(*)';
    } else {
      base
          += ' users.id, users.name, users.email, users.photo, users.address, users.phone, recruiters.position, recruiters.company_name';
    }
    let sql = `${base} FROM users INNER JOIN recruiters ON users.id = recruiters.user_id WHERE users.is_verified=true AND LOWER(users.name) LIKE '%'||LOWER($1)||'%' OR LOWER(recruiters.position) LIKE '%'||LOWER($1)||'%' OR LOWER(recruiters.company_name) LIKE '%'||LOWER($1)||'%' OR LOWER(users.address) LIKE '%'||LOWER($1)||'%'`;

    // jika query tidak ditujukan untuk mendapatkan count
    if (!count) {
      // jika ada sortBy
      if (sortBy.trim() === 'name') {
        sql += ' ORDER BY users.name';
      } else {
        sql += ' ORDER BY users.created_at';
      }

      // limit & offset
      sql += ` LIMIT ${paging.limit} OFFSET ${paging.offset}`;
    }

    db.query(sql, [search], (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  }),
  selectDetailWorker: (id) => new Promise((resolve, reject) => {
    db.query(
      'SELECT users.id, users.name, users.description, users.level, users.email, users.photo, users.instagram, users.github, users.linkedin, users.address, users.phone, users.created_at, workers.job_desk, workers.job_type, workers.skills FROM users INNER JOIN workers ON users.id = workers.user_id WHERE users.id=$1',
      [id],
      (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      },
    );
  }),
  selectDetailRecruiter: (id) => new Promise((resolve, reject) => {
    db.query(
      'SELECT users.id, users.name, users.description, users.level, users.email, users.photo, users.instagram, users.github, users.linkedin, users.address, users.phone, users.created_at, recruiters.company_name, recruiters.position FROM users INNER JOIN recruiters ON users.id = recruiters.user_id WHERE users.id=$1',
      [id],
      (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      },
    );
  }),
  changePhoto: (id, photo) => new Promise((resolve, reject) => {
    db.query(
      'UPDATE users SET photo=$1 WHERE id=$2',
      [photo, id],
      (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      },
    );
  }),
  updateUserData: (id, data) => new Promise((resolve, reject) => {
    const {
      name, address, description, phone, instagram, github, linkedin,
    } = data;

    db.query(
      'UPDATE users SET name=$1, address=$2, description=$3, phone=$4, instagram=$5, github=$6, linkedin=$7 WHERE id=$8',
      [name, address, description, phone, instagram, github, linkedin, id],
      (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      },
    );
  }),
  listChatSelector: (level) => new Promise((resolve, reject) => {
    let sql = 'SELECT users.id, users.email, users.level, users.is_verified, users.photo, users.name,';

    // recruiter
    if (level === 1) {
      sql += ' recruiters.position, recruiters.company_name FROM users INNER JOIN recruiters ON users.id=recruiters.user_id WHERE level=$1';
    }

    // worker
    if (level === 2) {
      sql += ' workers.job_desk, workers.job_type FROM users INNER JOIN workers ON users.id=workers.user_id WHERE level=$1';
    }

    db.query(
      sql,
      [level],
      (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      },
    );
  }),
  selectListNewWorker: () => new Promise((resolve, reject) => {
    db.query(
      'SELECT users.id, users.name, users.email, users.description, users.photo, users.address, users.phone, workers.job_desk, workers.skills, users.created_at FROM users INNER JOIN workers ON users.id = workers.user_id WHERE users.is_verified=true ORDER BY users.created_at DESC LIMIT 10',
      (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      },
    );
  }),
};
