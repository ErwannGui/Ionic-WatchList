var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Model = require('./api/models/crudModel'), //created model loading here
    bodyParser = require('body-parser');

// mongoose instance connection url connection
global.__root = __dirname + '/'; 
mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/ionic');
mongoose.connect('mongodb+srv://ionic:ionic@cours-8uau7.mongodb.net/ionic', { useNewUrlParser: true });

/*var MongoClient = require('mongodb').MongoClient;

var uri = "mongodb+srv://ionic:ionic@cours-8uau7.mongodb.net/ionic";
MongoClient.connect(uri, { useNewUrlParser: true }, function(err, client) {
   //const collection = client.db("test").collection("devices");
   // perform actions on the collection object
   //client.close();
});*/

var routes = require('./api/routes/crudRoutes'); //importing route
routes(app); //register the route

var UserController = require(__root + 'api/controllers/userController');
app.use('/api/users', UserController);

var AuthController = require(__root + 'api/controllers/authController');
app.use('/api/auth', AuthController);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);


console.log('API running on port: ' + port);