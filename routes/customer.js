const express = require('express');
const fs = require('fs');
const router = express.Router()

router.get('/', function(req, res){
    var first = req.query.first; //customers?first=n
    if(first!=undefined){
        fs.readFile("./data/customers_data.json",function(err, data){
            var customers = JSON.parse(data.toString()).customers;
            if(first>=customers.length){
                res.send(customers);
            }else{
                res.send(customers.slice(0, first));
            }
        })
    }else{
        fs.readFile("./data/customers_data.json",function(err, data){
            var customers = JSON.parse(data.toString()).customers;
            res.send(customers);
        })
    }
});

router.get("/:id",getUser, (req,res) => {
    res.send(res.customer)
})

router.post("/", (req,res) => {
    console.log(req.body);
})

async function getUser(req, res, next){
    var BreakException = {}; // There's no built-in ability to break in forEach. 
                             //To interrupt execution you would have to throw an exception of some sort.
    let customer
    fs.readFile("./data/customers_data.json",function(err, data){
        var customers = JSON.parse(data.toString()).customers;
        try {
            customers.forEach(element => {
                if(element._id==req.params.id){
                    customer = element;
                    throw BreakException;
                }
            });
        } catch (error) {
            console.log(error);
        }
        if(customer ==null){
            return res.status(404).json({message : "cannot find customer"})
        }
        res.customer = customer;
        next();
    });
}

module.exports = router;