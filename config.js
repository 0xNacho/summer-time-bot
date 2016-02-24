exports.twitterCredentials = function(){
	return {
		consumer_key: '',
	 	consumer_secret: '',
	  	access_token_key: '',
	  	access_token_secret: ''
	}
};
exports.randomGIF = function(){
	var gifs = [
		'http://bit.ly/1IxDSEk', //http://media3.giphy.com/media/CpA8xFyiRfQ2s/giphy.gif
		'http://bit.ly/1VF3d37', //http://25.media.tumblr.com/tumblr_m53tufJiok1qg6rkio6_250.gif
		'http://bit.ly/1oBxiWr', //http://memesvault.com/wp-content/uploads/Facepalm-Meme-Gif-15.gif
		'http://smo.sh/1zE3dmT' //http://cdn.smosh.com/sites/default/files/legacy.images/smosh-pit/092010/dancefail-4.gif
	];
	return gifs[Math.floor(Math.random() * gifs.length)];
};