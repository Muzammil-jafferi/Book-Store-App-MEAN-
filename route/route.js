var User = require('../models/user');
var user = require('../controller/book');
module.exports = function(app, db) {

app.get('/', function (req,res) {
	res.render('index.html')
})
app.post('/book', function(req, res) {
	user.createbook(req.body)
	.then(function(result) {
		res.send(result);
	})
	.catch(function(err) {
		console.log("err", err);
		res.send({
			'error': 'An error has occurred'
		});
	})
	

});
app.get('/book', function(req, res) {
	user.getbook()
	.then(function(result) {
		res.send({ Books : result });
	})
	.catch(function(err) {
		console.log("err", err);
		res.send({
			'error': 'An error has occurred'
		});
	})
	

});

app.put('/book', function(req, res) {
	user.updatebook(req.body)
	.then(function(result) {
		res.send(result);
	})
	.catch(function(err) {
		console.log("err", err);
		res.send({
			'error': 'An error has occurred'
		});
	})
});

app.delete('/book/:bookname', function(req, res) {
	var bookname = req.params.bookname;
	user.deletebook(bookname)
	.then(function(result) {
		res.send(result);
	})
	.catch(function(err) {
		console.log("err", err);
		res.send({
			'error': 'An error has occurred'
		});
	})
})
};