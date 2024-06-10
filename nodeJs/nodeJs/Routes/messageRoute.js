const express = require('express');
const messageController = require('../Controllers/messageController');


const app = express();
app.use('/saji', messageController);

module.exports = app;