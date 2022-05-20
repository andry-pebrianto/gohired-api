const userModel = require('../models/user.model');
const createPagination = require('../utils/createPagination');
const uploadGoogleDrive = require('../utils/uploadGoogleDrive');
const deleteGoogleDrive = require('../utils/deleteGoogleDrive');
const deleteFile = require('../utils/deleteFile');
const { success, failed } = require('../utils/createResponse');

module.exports = {
  list: async (req, res) => {
    try {
      const {
        search, orderBy, page, limit,
      } = req.query;

      // jika data yang ingin diambil adalah recruiter
      if (
        req.originalUrl.split('/')[req.originalUrl.split('/').length - 1]
        === 'recruiter'
      ) {
        const count = await userModel.selectAllRecruiter(true, search, orderBy);
        const paging = createPagination(count.rows[0].count, page, limit);
        const users = await userModel.selectAllRecruiter(
          false,
          search,
          orderBy,
          paging,
        );

        success(res, {
          code: 200,
          payload: users.rows,
          message: 'Select List Recruiter Success',
          pagination: paging.response,
        });
      }

      // jika data yang ingin diambil adalah worker
      else {
        const count = await userModel.selectAllWorker(true, search, orderBy);
        const paging = createPagination(count.rows[0].count, page, limit);
        const users = await userModel.selectAllWorker(
          false,
          search,
          orderBy,
          paging,
        );

        success(res, {
          code: 200,
          payload: users.rows,
          message: 'Select List Worker Success',
          pagination: paging.response,
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
  detail: async (req, res) => {
    try {
      const { slug } = req.params;
      const user = await userModel.findBy('slug', slug);

      // jika user tidak ditemukan
      if (!user.rowCount) {
        failed(res, {
          code: 404,
          payload: `User with Slug ${slug} not found`,
          message: 'Select Detail User Failed',
        });
        return;
      }

      let userDetail = null;
      // menentukan yang akan diambil data worker atau recruiter
      if (user.rows[0].level === 1) {
        userDetail = await userModel.selectDetailRecruiter(user.rows[0].id);
      } else {
        userDetail = await userModel.selectDetailWorker(user.rows[0].id);
      }

      success(res, {
        code: 200,
        payload: userDetail.rows[0],
        message: 'Select Detail User Success',
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: 'Internal Server Error',
      });
    }
  },
  updatePhoto: async (req, res) => {
    try {
      const { slug } = req.params;

      const user = await userModel.findBy('slug', slug);
      // jika user tidak ditemukan
      if (!user.rowCount) {
        // hapus jika ada upload photo
        if (req.files) {
          if (req.files.photo) {
            deleteFile(req.files.photo[0].path);
          }
        }

        failed(res, {
          code: 404,
          payload: `User with Slug ${slug} not found`,
          message: 'Update User Photo Failed',
        });
        return;
      }

      let { photo } = user.rows[0];
      // jika ada upload photo
      if (req.files) {
        if (req.files.photo) {
          // menghapus photo sebelumnya di gd jika sebelumnya sudah pernah upload
          if (user.rows[0].photo) {
            await deleteGoogleDrive(user.rows[0].photo);
          }
          // upload photo baru ke gd
          photo = await uploadGoogleDrive(req.files.photo[0]);
          // menghapus photo setelah diupload ke gd
          deleteFile(req.files.photo[0].path);
        }
      }

      await userModel.changePhoto(user.rows[0].id, photo.id);

      success(res, {
        code: 200,
        payload: null,
        message: 'Update User Photo Success',
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: 'Internal Server Error',
      });
    }
  },
  updateProfile: async (req, res) => {
    try {
      const { slug } = req.params;

      const user = await userModel.findBy('slug', slug);
      // jika user tidak ditemukan
      if (!user.rowCount) {
        failed(res, {
          code: 404,
          payload: `User with Slug ${slug} not found`,
          message: 'Update User Profile Failed',
        });
        return;
      }

      success(res, {
        code: 200,
        payload: null,
        message: 'Update User Profile Success',
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