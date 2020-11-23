const express = require('express');
const app = express();

const controller = require('../controller/controller.js');
const userController = require('../controller/userController.js');
const postController = require('../controller/postController.js');
const adminController = require('../controller/adminController.js');

app.get('/', controller.getIndex);
app.get('/home', controller.getHome);
app.get('/getsession',controller.getSession);

app.get('/signup', userController.getSignup);
app.get('/login', userController.getLogin);
app.get('/logout', userController.getLogout);
app.get('/getUsername', userController.getUsername);
app.get('/getEmail', userController.getEmail);

app.get('/addproduct',adminController.getAddProduct);

app.get('/createpost', postController.getCreatePost);
app.get('/articles', postController.viewAllPost);

app.post('/createpost', postController.postCreatePost);

app.post('/signup', userController.postSignup);
app.post('/login', userController.postLogin);

module.exports = app;