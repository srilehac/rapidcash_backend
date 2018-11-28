'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const loggerpac = require('morgan');
const router = express.Router();
var cors = require('cors');
var logger;
var Promise = require('bluebird');
var log4js = require('log4js');
var logger = log4js.getLogger('SampleWebApp');
var config = require('config');



const port = process.env.PORT || 8081;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(loggerpac('dev'));
app.use(cors());
require('./route')(router);
app.use('/', router);
app.listen(port);


console.log(`App Runs on ${port}`);
app.get('/channels', function(req, res) {
	logger.debug('================ GET CHANNELS ======================');
	logger.debug('peer: ' + req.query.peer);
	var peer = req.query.peer;
	if (!peer) {
		res.json(getErrorMessage('\'peer\''));
		return;
	}

	query.getChannels(peer, req.username, req.orgname)
	.then(function(
		message) {
		res.send(message);
	});
});



