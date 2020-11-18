const express = require('express');
const app = express();
const hbs = require('hbs');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient
const myurl = 'mongodb://localhost:27017/ISICT4D';
const PORT = 3000;

const routes = require('./routes/routes.js');

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.use(express.static(__dirname + "/public"));

// parses incoming requests with urlencoded payloads
app.use(express.urlencoded({extended: true}));

mongoose.connect(myurl,  { useNewUrlParser: true , useUnifiedTopology: true });

app.use('/',routes);

MongoClient.connect(myurl,  { useNewUrlParser: true , useUnifiedTopology: true }  , (err, client) => {
    if (err) return console.log(err)
    db = client.db('ISICT4D') 
    app.listen(PORT, () => {
      console.log('Listening to port: ' + PORT);
      console.log('Connected to Database: ' + myurl);
    })
})

// app.listen(PORT, function(){
//     console.log('App listening at port ' + PORT)
// });