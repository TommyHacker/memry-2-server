const jwt = require('jsonwebtoken');
const tokenSecret = process.env.TOKEN_SECRET;

exports.generateToken = (id) => {
	const token = jwt.sign(id, tokenSecret);
	return token;
};

exports.verifyToken = (id) => {
	try {
		const verified = jwt.verify(token, tokenSecret);
		if (verified) return true;
	} catch (err) {
		return false;
	}
};

exports.decodeToken = (token) => {
	const decodedToken = jwt.decode(token);
	return decodedToken.id;
};
