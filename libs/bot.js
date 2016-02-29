"use strict";
var moment = require('moment');
var gifs = require('../data/gifs.js').gifs;
var request = require('request');

var Bot = function(config, finish) {
	//Get start & end date. Get the difference between both.
	this.startDate = new Date();
	this.endDate = moment(config.endDate);
	this.diff = moment.duration(this.endDate.diff(this.startDate));

	//Time left: hours, mins, or days???
	switch(Math.floor(Math.random() * 3)){ //0 = mins, 1 = hours, 2 = days.
		case 0:
			this.timeLeft = parseInt(this.diff.asMinutes());
			this.timeLeftText = 'minutos';
			break;
		case 1:
			this.timeLeft = parseInt(this.diff.asHours());
			this.timeLeftText = 'horas';
			break;
		case 2:
			this.timeLeft = parseInt(this.diff.asDays());
			this.timeLeftText = 'días';
			break;
		default:
			this.timeLeft = parseInt(this.diff.asDays());
			this.timeLeftText = 'días';
	}
	//Get a gif
	this.gif = this.pickRandomGIF();
	this.message = this.componseMessage();
	this.message = this.message  + ' ' + this.gif;
	finish(this.message);
	//this.choniza(this.message, this.gif, function(message){
	//	finish(message);
	//});
};
//Componse the message with some random gif.
Bot.prototype.componseMessage = function(tLeft, tLeftText, g){
	var timeLeft = tLeft || this.timeLeft;
	var timeLeftText = tLeftText || this.timeLeftText;
	var gif = g || this.gif;
	return 'Ánimo trabajador, solo quedan ' 
				+ timeLeft + ' ' + timeLeftText
				+ ' para la esperada jornada de verano.';
};

Bot.prototype.pickRandomGIF = function(sDate){
	var startDate = sDate || this.startDate;
	var dayOfWeek = moment(startDate).day();
	var availableGifs = gifs[dayOfWeek];
	return availableGifs[Math.floor(Math.random() * availableGifs.length)];
};

Bot.prototype.choniza = function(message, gif, callback){
	var url = 'http://api.chevismo.com/choniza?texto=' + encodeURIComponent(message);
		request(url, function(error, response, body){
		if(error || response.statusCode != 200){
			callback(message + ' ' + gif);
		}
		body = JSON.parse(body);
		message = body.choni;
		callback(message + ' ' + gif);
	});
};

//Export Bot
module.exports = Bot;