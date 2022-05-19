const userModel = require('../models/user.model');
const { success, failed } = require('../utils/createResponse');
const createPagination = require('../utils/createPagination');

module.exports = {
  listWorker: async (req, res) => {
    try {
      const {
        search, orderBy, page, limit,
      } = req.query;
      const count = await userModel.selectAllWorker(true, search, orderBy);
      const paging = createPagination(count.rows[0].count, page, limit);
      const users = await userModel.selectAllWorker(false, search, orderBy, paging);

      success(res, {
        code: 200,
        payload: users.rows,
        message: 'Select List User Success',
        pagination: paging.response,
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
