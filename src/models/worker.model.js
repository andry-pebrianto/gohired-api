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
  updateWorkerData: (id, data) => new Promise((resolve, reject) => {
    const {
      jobDesk, jobType, skills,
    } = data;

    db.query(
      'UPDATE workers SET job_type=$1, job_desk=$2, skills=$3 WHERE user_id=$4',
      [
        jobType, jobDesk, skills, id,
      ],
      (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      },
    );
  }),
};
