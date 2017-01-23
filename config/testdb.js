var mongoose = require('mongoose');
	secrets  = require('./secrets');

var db = mongoose.connection;
mongoose.connect(secrets.db);

module.exports = {
	dbconnect: function(){
		db.on('error', console.error.bind(console, 'MongodDB Connection Error. Please make sure that MongodDB is running.'));
		db.once('open', function callback(){
			console.log('Yourtube db opened');
		});
	}
};

