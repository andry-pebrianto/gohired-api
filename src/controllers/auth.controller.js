const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const authModel = require('../models/auth.model');
const userModel = require('../models/user.model');
const workerModel = require('../models/worker.model');
const recruiterModel = require('../models/recruiter.model');
const { success, failed } = require('../utils/createResponse');
const sendEmail = require('../utils/email/sendEmail');
const activateAccountEmail = require('../utils/email/activateAccountEmail');
const { APP_NAME, EMAIL_FROM, API_URL } = require('../utils/env');

module.exports = {
  register: async (req, res) => {
    try {
      const user = await userModel.findBy('email', req.body.email);
      if (user.rowCount) {
        failed(res, {
          code: 409,
          payload: 'Email already exist',
          message: 'Register Failed',
        });
        return;
      }

      const {
        name, email, phone, companyName, position,
      } = req.body;
      const password = await bcrypt.hash(req.body.password, 10);
      const token = crypto.randomBytes(30).toString('hex');

      const insertData = await authModel.register({
        id: uuidv4(),
        name,
        slug: `${name.toLowerCase().trim().split(' ').join('-')}-${crypto
          .randomBytes(3)
          .toString('hex')}`,
        email,
        phone,
        password,
        level: companyName ? 1 : 2,
        companyName,
        position,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      if (companyName) {
        // insert recruiter
        await recruiterModel.addRecruiter({
          id: uuidv4(),
          userId: insertData.rows[0].id,
          companyName,
          position,
        });
      } else {
        // insert worker
        await workerModel.addWorker({
          id: uuidv4(),
          userId: insertData.rows[0].id,
        });
      }
      await authModel.updateToken(insertData.rows[0].id, token);

      // send email for activate account
      const templateEmail = {
        from: `"${APP_NAME}" <${EMAIL_FROM}>`,
        to: req.body.email.toLowerCase(),
        subject: 'Activate Your Account!',
        html: activateAccountEmail(`${API_URL}/auth/activation/${token}`),
      };
      sendEmail(templateEmail);

      success(res, {
        code: 201,
        payload: null,
        message: 'Register Success',
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: 'Internal Server Error',
      });
    }
  },
};
