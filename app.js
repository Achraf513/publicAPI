var PORT = process.env.PORT || 8080;
const http = require('http');
const express = require('express');
var cors = require('cors')
const fs = require('fs');

var app = express();
app.use(cors());
var server = http.createServer(app);

const customersRouter = require("./routes/customer")
const productsRouter = require("./routes/products")
app.use(express.json())
app.use("/customers", customersRouter)
app.use("/products", productsRouter)


app.get('/', function(req, res){
    res.sendFile('./index.html', {root: __dirname })
});


server.listen(PORT, function(){
    console.log('server listening to port' + PORT);
})