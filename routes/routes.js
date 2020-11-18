const express = require('express');
const app = express();

const controller = require('../controller/controller.js');

app.get('/', controller.getIndex);

module.exports = app;