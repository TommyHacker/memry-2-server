const { verifyToken, decodeToken } = require('./tokenHelpers');
const User = require('../models/userSchema');

exports.gateKeeper = async (req, res, next) => {
	// get the token from the user
	const accessToken = req.cookies.accesstoken;
	if (!accessToken)
		return res.json({ success: false, message: 'not allowed.' });
	console.log('accesstoken', accessToken);

	// verify not tampered with
	const verified = verifyToken(accessToken);
	if (!verified) return res.json({ success: false, message: 'not allowed.' });

	// extract user id
	const id = decodeToken(accessToken);
	const user = await User.findById(id);
	if (!user) return res.json({ success: false, message: 'not allowed.' });

	// introduce user to controllers
	res.locals.currentUser = user;
	next();
};
