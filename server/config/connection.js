const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/Mojave',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
.catch((error) => console.log(error.reason));

module.exports = mongoose.connection;
