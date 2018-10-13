const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const passport = require('passport')
//API
const users = require('./routes/users')
const profiles = require('./routes/profiles')
const posts = require('./routes/posts')
const mongoURL = require('./mongo')

const db = mongoURL.url
//const db = "mongodb://localhost:27017/blog" //local db

const PORT = process.env.PORT || 5000;

mongoose.connect(db)
.then(() => console.log("Success, MongoDB connected"))
.catch((err) => `MongoDB is not connected, error: ${err}`)

const app = express();

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

app.use(passport.initialize());
require('./passport')(passport);

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

//API usage
app.use('/api/users', users)
app.use('/api/profiles', profiles)
app.use('/api/posts', posts)

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.listen(PORT, function () {
  console.error(`Node cluster worker ${process.pid}: listening on port ${PORT}`);
});
