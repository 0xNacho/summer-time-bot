//Import libraries
var Twitter = require('twitter');
var config = require('./config.js');
var client = new Twitter(config.twitterCredentials());
var Bot =  require('./libs/bot.js');

//Initialize Bot & send message when this is ready
bot = new Bot(config, function(message){
	console.log(message);
	client.post('statuses/update', {status: message},  function(error, tweet, response){
	  if(error) throw error;
	});
});