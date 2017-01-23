require('dotenv').load();
var  express       = require('express'),
     morgan        = require('morgan'),
     bodyParser    = require('body-parser'),
     mongoose      = require('mongoose'),
     cors          = require('cors'),
     testdb        = require('./config/testdb'),
     route         = require('./server/routes');

var port = process.env.PORT || 3000;

/*Connect to MongoDB*/
testdb.dbconnect();

/*Create Express server*/
var app = express();

/*Express Config*/

//Force HTTPS on heroku
if(process.env.NODE_ENV === 'production') {
  app.enable("trust proxy");
  app.use (function (req, res, next) {
      if(req.secure) {
        //request was via https, so do no special handling
        next();
      } else {
        //request was via http, so redirect to https
        res.redirect('https://' + req.headers.host + req.url);
      }
  });
}

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true})); //use bodyParser for request and parsing info
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public')); //use to serve static files liek favicon, css, angular etc

/*Route config*/
route(app);

//configure any route whatsover to redirect to angular
app.get('*', function(req, res){
	/** frontend routes =========================================================
      * route to handle all angular requests
      * load the single view file (angular will handle the page changes on the front-end)
      **/
      res.sendFile(__dirname + '/public/index.html');
});

/*Start Express server*/
app.listen(port, function(){
	console.log("Yourtube Server listening on port ", port);
})