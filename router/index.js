const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller');

router.post('/register', userController.registerUser);
router.post('/verify-email', userController.verifyEmail);

module.exports = router;
