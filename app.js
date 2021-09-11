const http = require('http');
const express = require('express');
const fs = require('fs');

var app = express();
var server = http.createServer(app);

app.get('/', function(req, res){
    res.send('<h1>Hello world</h1>');
});

app.get('/stuff',function(req,res){
    fs.readFile("./data.json",function(err, data){
        var stuff = JSON.parse(data.toString()).stuff;
        res.send(stuff);
    })
});

server.listen(8080, function(){
    console.log('server listening to port 8080');
})