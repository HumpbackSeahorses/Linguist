var mongoose = require('mongoose');

var devPath = 'mongodb://localhost:27017/linguist';
var dbPath = process.env.MONGODB_URI || devPath;
mongoose.connect(dbPath);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function(){ console.log('Mongodb connection is open!')});

module.exports = db;
