const Memry = require('../models/memrySchema');

const doorman = (element) => {
	if (!element.privacy || element.authorId == currentUser.id) return element;
	return false;
};

exports.getAll = async (req, res) => {
	try {
		// get memrys of currentUser
		const memrys = await Memry.find({ authorId: currentUser.id });
		res.json({ success: true, data: memrys });
	} catch (err) {
		res.json({ success: false, message: 'could not retrieve data.' });
	}
};

exports.getOne = async (req, res) => {
	const { id } = req.params;
	const memry = await Memry.findById(id);
	const data = doorman(memry);
	if (!data) return res.json({ success: false, message: 'not allowed.' });
	res.json({ status: success, data: memry });
};

exports.postOne = async (req, res) => {
	try {
		const { title, story, imageUrl, privacy, longitude, latitude } = req.body;
		const memry = new Memry({
			title,
			story,
			imageUrl,
			longitude,
			latitude,
			privacy,
			authorId: currentUser.id,
		});
		await memry.save();
		res.json({
			success: true,
			message: 'memry created successfully.',
			data: memry,
		});
	} catch (err) {
		console.log(err.message);
		res.json({
			success: false,
			message: 'something went wrong during memry creation.',
		});
	}
};

exports.patchOne = async (req, res) => {
	try {
		const { id } = req.params;
		const { privacy, title, story, imageUrl, longitude, latitude } = req.body;
		const foundMemry = await Memry.findById(id);
		if (currentUser.id != memry.authorId)
			return res.json({ success: false, message: 'not allowed.' });
		foundMemry.update({
			foundMemry,
			title,
			story,
			privacy,
			imageUrl,
			longitude,
			latitude,
		});
		await foundMemry.save();
		res.json({ success: true, data: memry });
	} catch (err) {
		console.log(err.message);
		res.json({
			success: false,
			message: 'something went wrong during memry update.',
		});
	}
};

exports.deleteOne = async (req, res) => {
	try {
		const { id } = req.params;
		const foundMemry = await Memry.findById(id);
		if (!memry.authorId == currentUser.id || !currentUser.isAdmin)
			return res.json({ success: false, message: 'not allowed.' });

		await Memry.findByIdAndDelete(id);
		res.json({ success: true, message: 'memry erased successfully.' });
	} catch (err) {
		console.log(err.message);
		return res.json({
			success: false,
			message: 'something went wrong during memry removal.',
		});
	}
};
