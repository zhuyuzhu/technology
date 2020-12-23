var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/technology', { useMongoClient: true });
//监听连接数据库是否成功
var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
db.on('error', function () {
  console.log("connection error")
})
db.once('open', function () {
  console.log('success to  connect mongodb!');
});

module.exports = mongoose;
