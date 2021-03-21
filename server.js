const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config()

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

mongoose.connect(
      process.env.MONGODB_URI,
      {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: true
      }
);

mongoose.connection.on('connected', function () {
      console.log('Mongoose default connection open');
});

// If the connection throws an error
mongoose.connection.on('error', function (err) {
      console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
      console.log('Mongoose default connection disconnected');
});


require("./routes/api-routes")(app);
require("./routes/html-routes")(app);
app.listen(PORT, function () {
      console.log(`App listening on Port ${PORT}`);
});