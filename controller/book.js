var User = require('../models/user');


module.exports = {
	createbook: function(req) {
		return new Promise(function(resolve, reject) {
			var userinfo = new User({
				"bookname": req.bookname,
				"authorname": req.authorname,
				"price": req.price
			});
			if (!!req.bookname && !!req.authorname && !!req.price) {
				userinfo.save(function(err, result) {
					if (err) {
						reject(err)
					} else {
						console.log('User saved successfully!');
						resolve(result);
					}
				})
			} else {
				resolve("Please provide all required data (i.e : Bookname, Authorname, Price)");
			}
		})
	},

	getbook: function() {
		return new Promise(function(resolve, reject) {
			User.find({}, function(err, users) {
				if (err)
					reject(err)
				if (users.length != 0) {
					resolve(users)
				} else {
					resolve('No books Found..')
				}
			});
		})
	},

	updatebook: function(req) {
		return new Promise(function(resolve, reject) {
			User.findOneAndUpdate({
						_id: req.id
					}, {
						$set: {
							bookname: req.bookname,
							authorname: req.authorname,
							price: req.price
						}
					},
					function(error, users) {
						if (error) {
							reject(error)
						} else {
							User.findOne({
								_id: req.id
							}, function(err, oneData) {
								resolve(oneData)
							})
						}
					})
		})
	},
	deletebook: function(bookname) {
	return new Promise(function(resolve, reject) {	
			User.findOneAndRemove({
				bookname: bookname
			}, function(err, result) {
				if (!!err) {
					reject("Error deleting data");
				} else {
					resolve("Delete Book Successfully");
				}
			});
		})
}
}
