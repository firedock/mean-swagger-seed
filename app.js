'use strict';

var SwaggerConnect = require('swagger-connect');
var app = require('connect')();
module.exports = app; // for testing

// config
require('dotenv').config({ // require env vars
  path: './config/.env'
});

// mongo connection
var mongoose = require('mongoose');
mongoose.Promise = global.Promise; // native promises
var uri = 'mongodb://' + process.env.DB_HOST + '/' + process.env.DB_DATABASE; // open
if (process.env.DB_USER && process.env.DB_PASSWORD) // auth
  uri = 'mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@' + process.env.DB_HOST + '/' + process.env.DB_DATABASE + '?authSource=admin';

// make connection
mongoose.connect(uri, {
  useMongoClient: true
});
var db = mongoose.connection;
// on error
db.on('error', console.error.bind(console, 'mongo connection error:'));
// on success
db.once('open', function () {
  console.log('mongo connection successful.');
});

var config = {
  appRoot: __dirname // required config
};

SwaggerConnect.create(config, function(err, swaggerConnect) {
  if (err) { throw err; }

  // install middleware
  swaggerConnect.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);
});
