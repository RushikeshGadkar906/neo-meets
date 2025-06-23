const express = require('express');
const { registerAdmin, getAdmins } = require('../controller/adminController');
const verifyToken = require('../utils/verifyToken');

const router = express.Router();

router.get('/list', verifyToken, getAdmins)
router.post('/register', registerAdmin)

module.exports = router