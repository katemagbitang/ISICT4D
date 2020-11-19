const express = require('express');
const app = express();

const controller = require('../controller/controller.js');
const userController = require('../controller/userController.js');

app.get('/', controller.getIndex);

app.get('/signup', userController.getSignup);
app.get('/login', userController.getLogin);

app.post('/signup', userController.postSignup);
app.post('/login', userController.postLogin);

module.exports = app;