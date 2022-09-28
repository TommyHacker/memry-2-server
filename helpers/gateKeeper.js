exports.gateKeeper = (req, res, next) => {
	console.log('initiating gatekeeper');
	if (req.cookies.length > 0) {
		console.log(req.cookies);
		next();
	} else {
		console.log('no cookies exchanged.');
		next();
	}
};
