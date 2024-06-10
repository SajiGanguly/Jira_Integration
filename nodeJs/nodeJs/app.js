const express = require('express');
const messageRoute = require('./Routes/messageRoute');
var cors = require('cors');

const app = express();
app.use(cors());
app.use('/user', messageRoute);

module.exports = app;