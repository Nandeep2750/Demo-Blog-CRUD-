const express = require('express');
const router = express.Router();
const authController = require('../../controllers/admin/authController');


router.post('/register',authController.registerAdmin);
router.post('/login',authController.loginAdmin);

module.exports = router;