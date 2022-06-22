const userModel = require('../models/user.model');
const experienceModel = require('../models/experience.model');
const projectModel = require('../models/project.model');
const chatModel = require('../models/chat.model');
const { failed } = require('../utils/createResponse');

module.exports = {
  isVerified: async (req, res, next) => {
    try {
      const user = await userModel.findBy('email', req.body.email);

      if (!user.rowCount) {
        next();
      } else if (user.rows[0].is_verified) {
        next();
      } else {
        failed(res, {
          code: 401,
          payload: 'Your email is not verified yet',
          message: 'Unauthorized',
        });
      }
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: 'Internal Server Error',
      });
    }
  },
  myself: async (req, res, next) => {
    try {
      const idUser = req.APP_DATA.tokenDecoded.id;
      const idUpdate = req.params.id;

      if (idUser === idUpdate) {
        next();
      } else {
        failed(res, {
          code: 401,
          payload: 'You do not have access',
          message: 'Unauthorized',
        });
      }
    } catch (error) {
      failed(res, {
        code: 401,
        payload: error.message,
        message: 'Internal Server Error',
      });
    }
  },
  expOwner: async (req, res, next) => {
    try {
      const idUser = req.APP_DATA.tokenDecoded.id;
      const idExp = req.params.id;
      const experience = await experienceModel.findBy('id', idExp);

      // jika experience tidak ditemukan
      if (!experience.rowCount) {
        next();
      } else {
        // jika id pembuat experience sama dengan id dari jwt
        if (idUser === experience.rows[0].user_id) {
          next();
        } else {
          failed(res, {
            code: 401,
            payload: 'You do not have access',
            message: 'Unauthorized',
          });
        }
      }
    } catch (error) {
      failed(res, {
        code: 401,
        payload: error.message,
        message: 'Internal Server Error',
      });
    }
  },
  projectOwner: async (req, res, next) => {
    try {
      const idUser = req.APP_DATA.tokenDecoded.id;
      const idProject = req.params.id;
      const project = await projectModel.findBy('id', idProject);

      // jika project tidak ditemukan
      if (!project.rowCount) {
        next();
      } else {
        // jika id pembuat project sama dengan id dari jwt
        if (idUser === project.rows[0].user_id) {
          next();
        } else {
          failed(res, {
            code: 401,
            payload: 'You do not have access',
            message: 'Unauthorized',
          });
        }
      }
    } catch (error) {
      failed(res, {
        code: 401,
        payload: error.message,
        message: 'Internal Server Error',
      });
    }
  },
  chatOwner: async (req, res, next) => {
    try {
      const idUser = req.APP_DATA.tokenDecoded.id;
      const idChat = req.params.id;
      const chat = await chatModel.findBy('id', idChat);

      // jika chat tidak ditemukan
      if (!chat.rowCount) {
        next();
      } else {
        // jika id pembuat chat sama dengan id dari jwt
        if (idUser === chat.rows[0].sender_id) {
          next();
        } else {
          failed(res, {
            code: 401,
            payload: 'You do not have access',
            message: 'Unauthorized',
          });
        }
      }
    } catch (error) {
      failed(res, {
        code: 401,
        payload: error.message,
        message: 'Internal Server Error',
      });
    }
  },
  onlyRecruiter: async (req, res, next) => {
    try {
      const user = await userModel.findBy('id', req.APP_DATA.tokenDecoded.id);

      if (user.rows[0].level === 1) {
        next();
      } else {
        failed(res, {
          code: 401,
          payload: 'You do not have access',
          message: 'Unauthorized',
        });
      }
    } catch (error) {
      failed(res, {
        code: 401,
        payload: error.message,
        message: 'Internal Server Error',
      });
    }
  },
  onlyWorker: async (req, res, next) => {
    try {
      const user = await userModel.findBy('id', req.APP_DATA.tokenDecoded.id);

      if (user.rows[0].level === 2) {
        next();
      } else {
        failed(res, {
          code: 401,
          payload: 'You do not have access',
          message: 'Unauthorized',
        });
      }
    } catch (error) {
      failed(res, {
        code: 401,
        payload: error.message,
        message: 'Internal Server Error',
      });
    }
  },
};
