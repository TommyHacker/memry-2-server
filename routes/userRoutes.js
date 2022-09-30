const express = require('express');
const router = express.Router();
const {
	login,
	register,
	getUserData,
} = require('../controllers/userControllers');
const { gateKeeper } = require('../helpers/gateKeeper');

router.post('/register', register);
router.post('/login', login);
router.get('/', getUserData);

module.exports = router;
