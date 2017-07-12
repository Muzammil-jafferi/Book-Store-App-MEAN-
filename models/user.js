	var mongoose = require('mongoose');

	var Schema = mongoose.Schema;
	var UserSchema = new Schema({
		bookname: String,
		authorname: String,
		price: Number
	});

	var User = mongoose.model('book', UserSchema);

	module.exports = User