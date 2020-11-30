const express = require('express');
const app = express();
const hbs = require('hbs');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const moment = require('moment');
const multer = require('multer');
const path = require('path');

const myurl = 'mongodb://localhost:27017/ISICT4D';
const PORT = 3000;

//Set Storage Engine
const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: function( req, file, callback){
      callback(null, file.fieldname + '-' + Date.now() +  path.extname(file.originalname));
  }
});

//init upload 
const upload = multer({
  storage: storage
}).single('myImage');

const routes = require('./routes/routes.js');

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('memoryDateFormat', function(date) {
  return moment(date).format("DD-MMM-YYYY");
});
hbs.registerHelper('ifCond', function(v1, v2, options) {
  if(v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

app.use(express.static(__dirname + "/public"));

// parses incoming requests with urlencoded payloads
app.use(express.urlencoded({extended: true}));

app.use(bodyparser.urlencoded({extended: true}));

mongoose.set('useFindAndModify', false);

mongoose.connect(myurl,  { useNewUrlParser: true , useUnifiedTopology: true });

// use `express-session`` middleware and set its options
// use `MongoStore` as server-side session storage
app.use(session({
  'secret': 'ISICT4D-secret',
  'resave': false,
  'saveUninitialized': false,
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));

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