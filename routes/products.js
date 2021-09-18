const express = require('express');
const fs = require('fs');
const router = express.Router()

router.get('/', function(req, res){
    var first = req.query.first; //products?first=n
    if(first!=undefined){
        fs.readFile("./data/products_data.json",function(err, data){
            var products = JSON.parse(data.toString()).products;
            if(first>=products.length){
                res.send(products);
            }else{
                res.send(products.slice(0, first));
            }
        })
    }else{
        fs.readFile("./data/products_data.json",function(err, data){
            var products = JSON.parse(data.toString()).products;
            res.send(products);
        })
    }
});

router.get("/:id",getUser, (req,res) => {
    res.send(res.product)
})

router.post("/", (req,res) => {
    console.log(req.body);
})

async function getUser(req, res, next){
    var BreakException = {}; // There's no built-in ability to break in forEach. 
                             //To interrupt execution you would have to throw an exception of some sort.
    let product
    fs.readFile("./data/products_data.json",function(err, data){
        var products = JSON.parse(data.toString()).products;
        try {
            products.forEach(element => {
                if(element._id==req.params.id){
                    product = element;
                    throw BreakException;
                }
            });
        } catch (error) {
            console.log(error);
        }
        if(product ==null){
            return res.status(404).json({message : "cannot find product"})
        }
        res.product = product;
        next();
    });
}

module.exports = router;