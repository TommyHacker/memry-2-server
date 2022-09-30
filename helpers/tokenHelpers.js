const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

exports.generateToken = (id) => {
	const token = jwt.sign({ id }, process.env.TOKEN_SECRET);
	return token;
};

exports.verifyToken = (id) => {
	try {
		const verified = jwt.verify(token, process.env.TOKEN_SECRET);
		if (verified) return true;
	} catch (err) {
		return false;
	}
};

exports.decodeToken = (token) => {
	const decodedToken = jwt.decode(token);
	return decodedToken.id;
};
