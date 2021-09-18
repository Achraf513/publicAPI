var fs = require('fs');
let rawdata = fs.readFileSync("./data/products_data.json");
let products = JSON.parse(rawdata).products;
let finalizedProducts = [];
products.forEach(product => {
    finalizedProducts.push(
        {
            "_id": product.id,
            "title": product.title,
            "price": product.price,
            "description": product.description,
            "category": product.category,
            "picURL": product.image,
            "rating": product.rating.rate,
            "stock": product.rating.count,
        }
    )
});
fs.writeFile("./data/products_data.json",JSON.stringify(finalizedProducts),(err)=>{
    console.log(err);
});

