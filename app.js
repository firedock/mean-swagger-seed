'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
var mongoose = require('mongoose');
mongoose.Promise = global.Promise; // native promises
module.exports = app; // for testing

// config
var config = {
  appRoot: __dirname // required config
};

require('dotenv').config({ // require env vars
  path: './config/.env'
});

// mongo connection via mongoose
var uri = 'mongodb://' + process.env.DB_HOST + '/' + process.env.DB_DATABASE; // open
if (process.env.DB_USER && process.env.DB_PASSWORD) // auth
  uri = 'mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@' + process.env.DB_HOST + '/' + process.env.DB_DATABASE + '?authSource=admin';

  mongoose.connect(uri, {
  useMongoClient: true
});
var db = mongoose.connection;
// on error
db.on('error', console.error.bind(console, 'mongo connection error:'));
// on success
db.once('open', function () {
  console.log('mongoDB connected via mongoose.');
});

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);
});