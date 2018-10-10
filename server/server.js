var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    User = require('./api/models/crudModel'), //created model loading here
    bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
try {
	//mongoose.connect('mongodb://localhost:27017/ionic');
	mongoose.connect('mongodb://ionic:ionic@cours-8uau7.mongodb.net/admin');
} catch(error) {
  console.error(error);
}


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

var routes = require('./api/routes/crudRoutes'); //importing route
routes(app); //register the route


app.listen(port);


console.log('API running on port: ' + port);