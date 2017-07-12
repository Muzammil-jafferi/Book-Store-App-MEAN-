const express = require('express');
var mongoose = require('mongoose');
var nunjucks =require('nunjucks')
const bodyParser = require('body-parser');
const db = require('./config/db');
var path = require("path")
const app = express();

app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(bodyParser.json());

const port = 8080;

nunjucks.configure('views', {
    autoescape: true,
    noCache: true,
    express: app
});
app.set('views',path.join("views"))
app.use(express.static('public'))
app.set('view engine', 'nunjucks');
app.set('view options', { layout: false });

mongoose.connect(db.url, (err, database) => {
	
	require('./route')(app, database);
	console.log("Connected",err,database)

	app.listen(port, () => {
		console.log('We are live on ' + port);
	});
});