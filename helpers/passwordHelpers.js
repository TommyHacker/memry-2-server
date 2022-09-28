const bcrypt = require('bcrypt');
const saltRounds = 12;

exports.hashPassword = (password) => {
	return bcrypt.hashSync(password, saltRounds);
};

exports.verifyPassword = (password, hash) => {
	return bcrypt.compareSync(password, hash);
};
