const express = require('express');
const jwtAuth = require('../middlewares/jwtAuth');
const { expOwner } = require('../middlewares/authorization');
const { remove } = require('../controllers/experience.controller');

const router = express.Router();

router.delete('/experience/:id', jwtAuth, expOwner, remove);

module.exports = router;
