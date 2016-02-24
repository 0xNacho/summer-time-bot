//Import libraries
var Twitter = require('twitter');
var config = require('./config.js');
var moment = require('moment');
var client = new Twitter(config.twitterCredentials());

//Get start & end date. Get the difference between both.
var startDate = moment(new Date());
var endDate = moment(new Date("Wed Jun 15 2016"));
var diff = moment.duration(endDate.diff(startDate));
var timeLeft,timeLeftText;

//Time left: hours, mins, or days???
switch(Math.floor(Math.random() * 3)){ //0 = mins, 1 = hours, 2 = days.
	case 0:
		timeLeft = parseInt(diff.asMinutes());
		timeLeftText = 'minutos';
		break;
	case 1:
		timeLeft = parseInt(diff.asHours());
		timeLeftText = 'horas';
		break;
	case 2:
		timeLeft = parseInt(diff.asDays());
		timeLeftText = 'días';
		break;
	default:
		timeLeft = parseInt(diff.asDays());
		timeLeftText = 'días';
}

//Componse the message with some random gif.
var message = 'Ánimo trabajador, solo quedan ' 
				+ timeLeft + ' ' + timeLeftText
				+ ' para la jornada de verano.'
				+ ' ' + config.randomGIF();


//Send the message
client.post('statuses/update', {status: message},  function(error, tweet, response){
  if(error) throw error;
});
