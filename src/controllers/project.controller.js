const projectModel = require('../models/project.model');
const { success, failed } = require('../utils/createResponse');

module.exports = {
  remove: async (req, res) => {
    try {
      const { id } = req.params;
      const project = await projectModel.findBy('id', id);

      // jika project tidak ditemukan
      if (!project.rowCount) {
        failed(res, {
          code: 404,
          payload: `Project with Id ${id} not found`,
          message: 'Delete Project Failed',
        });
        return;
      }
      await projectModel.removeById(id);

      success(res, {
        code: 200,
        payload: null,
        message: 'Delete Project Success',
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
