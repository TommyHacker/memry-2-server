const User = require('../models/userSchema');
const { hashPassword, verifyPassword } = require('../helpers/passwordHelpers');
const {
	generateToken,
	verifyToken,
	decodeToken,
} = require('../helpers/tokenHelpers');

exports.register = async (req, res) => {
	try {
		const { username, email, password } = req.body;
		const hashedPassword = hashPassword(password);
		const user = new User({ username, email, password: hashedPassword });
		await user.save();

		const accessToken = generateToken(user.id);
		res.cookie('accesstoken', accessToken);

		res.json({ success: true, message: 'user registered.' });
	} catch (err) {
		console.log('user registeration' + err.message);
		res.json({
			success: false,
			message: 'something went wrong during registration.',
		});
	}
};

exports.login = async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await User.find({ username }).select('++password');
		const verified = verifyPassword(password, user.password);
		if (!verified)
			return res.json({
				success: false,
				message: 'username or password incorrect.',
			});
		user.password = '';
		const accessToken = generateToken(user.id);
		res.cookie('accesstoken', accessToken);
		res.json({ success: true, message: 'logged in successfully.' });
	} catch (err) {
		console.log('error during login', err.message);
		res.send({ success: false, message: 'error during login' });
	}
};

exports.getUserData = async (req, res) => {
	try {
		const user = await User.findById(res.locals.currentUser.id);
		res.json({ success: true, data: user });
	} catch (err) {
		console.log(err.message);
		res.json({ success: false, message: 'not allowed.' });
	}
};
