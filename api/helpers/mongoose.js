var mongoose = require('mongoose');
var uri = 'mongodb://' + process.env.DB_HOST + '/' + process.env.DB_DATABASE; // open

if (process.env.DB_USER && process.env.DB_PASSWORD) // auth
  uri = 'mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@' + process.env.DB_HOST + '/' + process.env.DB_DATABASE + '?authSource=admin';

// make connection
mongoose.connect(uri, {
  useMongoClient: true
});

var db = mongoose.connection;

// on error
db.on('error', console.error.bind(console, 'connection error:'));

// on success
db.once('open', function () {
  console.log('MongoDB connection successful.');
});

module.exports = mongoose;