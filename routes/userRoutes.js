const express = require('express');
const router = express.Router();
const { login, register } = require('../controllers/userControllers');
const { gateKeeper } = require('../helpers/gateKeeper');

router.get('/', gateKeeper, (req, res) => {
	res.send('users route');
});
router.post('/register', register);
router.post('/login', login);

module.exports = router;
