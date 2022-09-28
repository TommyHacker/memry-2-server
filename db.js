const mongoose = require('mongoose');
const dbUri = process.env.DB_URI || 'mongodb://localhost:27017/newmemryapp';

const dbSetup = () => {
	mongoose.connect(dbUri);
	mongoose.connection
		.on('error', (error) => console.error(error))
		.on('open', () => console.log(`db:live`));
};

module.exports = dbSetup;
