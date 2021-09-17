var PORT = process.env.PORT || 8080;
const http = require('http');
const express = require('express');
var cors = require('cors')
const fs = require('fs');

var app = express();
app.use(cors());
var server = http.createServer(app);

const usersRouter = require("./routes/customer")
app.use(express.json())
app.use("/customers", usersRouter)


app.get('/', function(req, res){
    res.sendFile('./index.html', {root: __dirname })
});


server.listen(PORT, function(){
    console.log('server listening to port' + PORT);
})