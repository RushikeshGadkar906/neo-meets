const express = require('express');
const router = express.Router();

const { registerEmployee } = require('../controller/employeeController');

router.post('/register', registerEmployee);

module.exports = router