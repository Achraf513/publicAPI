var PORT = process.env.PORT || 8080;
const http = require('http');
const express = require('express');
const fs = require('fs');

var app = express();
var server = http.createServer(app);

app.get('/', function(req, res){
    res.sendFile('./index.html', {root: __dirname })
});

app.get('/stuff',function(req,res){
    fs.readFile("./data.json",function(err, data){
        var stuff = JSON.parse(data.toString()).stuff;
        res.send(stuff);
    })
});

server.listen(PORT, function(){
    console.log('server listening to port' + PORT);
})