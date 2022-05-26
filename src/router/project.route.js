const express = require('express');
const jwtAuth = require('../middlewares/jwtAuth');
const { projectOwner } = require('../middlewares/authorization');
const { remove } = require('../controllers/project.controller');

const router = express.Router();

router.delete('/project/:id', jwtAuth, projectOwner, remove);

module.exports = router;
