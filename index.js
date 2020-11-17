const express = require('express');
const app = express();
// const hbs = require('hbs');
const PORT = 3000;

app.get('/', function(req,res){
    res.send('Hello world!');
});

app.listen(PORT, function(){
    console.log('App listening at port ' + PORT)
});