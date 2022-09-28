const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MemrySchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		story: {
			type: String,
			required: true,
		},
		private: {
			type: Boolean,
			default: false,
		},
		imageUrl: {
			type: String,
			required: true,
		},
		latitude: {
			type: String,
			required: true,
		},
		longitude: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Memry', MemrySchema);
