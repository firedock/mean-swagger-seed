var mongoose = require('mongoose');

let uri = 'mongodb://' + process.env.DB_HOST + '/' + process.env.DB_DATABASE;

if (process.env.DB_USER && process.env.DB_PASSWORD)
  uri = 'mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@' + process.env.DB_HOST + '/' + process.env.DB_DATABASE + '?authSource=admin';

var mongodb = null;

var options = {
  server: { poolSize: 5 }
}

mongoose.connect(uri, options);

var db = mongoose.connection;

// error
db.on('error', console.error.bind(console, 'connection error:'));

// success
db.once('open', function () {
  mongodb = true;
});

module.exports = mongoose;
