const express = require('express');
const router = express.Router();

const { registerSuperAdmin } = require('../controller/superadminController');

router.post('/register', registerSuperAdmin)

module.exports = router