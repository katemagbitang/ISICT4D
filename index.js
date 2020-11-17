const express = require('express');
const app = express();
const hbs = require('hbs');
const bodyparser = require('body-parser');
const PORT = 3000;

const routes = require('./routes/routes.js');

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(__dirname + "/public"));

// parses incoming requests with urlencoded payloads
app.use(express.urlencoded({extended: true}));

app.use('/',routes);

app.listen(PORT, function(){
    console.log('App listening at port ' + PORT)
});