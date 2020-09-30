const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

/*

   Usage : GET all Products
   URL : http://127.0.0.1:8000/api/products
   Method : GET
   Fields : no-fields


 */

router.get('/products',async (request,responce)=>{
    try {
        let products = await Product.find();
        responce.status(200).json(products)
    }
    catch (err) {
        console.error(err);
        responce.status(500).json({
            msg:err.message
        })
    }
});


/*

   Usage : GET Single Products
   URL : http://127.0.0.1:8000/api/products/:id
   Method : GET
   Fields : no-fields


 */
router.get('/products/:id',async (request,responce)=>{

    try {
        let productId = request.params.id;
        let product =await Product.findById(productId);
        responce.status(200).json(product);
    }
    catch (err) {
        console.error(err);
        responce.status(500).json({
            msg:err.message
        });
        
    }
});

/*

   Usage : Create a  Products
   URL : http://127.0.0.1:8000/api/products/
   Method : POST
   Fields : name , image , price , qty , info


 */

router.post('/products',async (request,responce) => {
  try {
        let newProduct = {
            name : request.body.name,
            image : request.body.image,
            price : request.body.price,
            qty : request.body.qty,
            info : request.body.info
        };
        //Product is exist or not
      let product = await Product.findOne({
          name:newProduct.name
      });
      if (product){
          return responce.status(401).json({
              msg:'Product is alredy Exists'
          })
      }

      product = new Product(newProduct);
      product = await product.save(); //insert product to db
      responce.status(200).json({
          Result:'Product is created',
          product:product
      });
}
    catch (err) {
        console.error(err);
        responce.status(500).json({
            msg:err.message
        });
    }
});

/*

   Usage : Update a Products
   URL : http://127.0.0.1:8000/api/products/:id
   Method : PUT
   Fields : name , image , price , qty , info


 */

router.put('/products/:id',async (request,responce)=>{
    let productId=request.params.id;
    try {
        let updatedProduct = {
            name : request.body.name,
            image : request.body.image,
            price : request.body.price,
            qty : request.body.qty,
            info : request.body.info
        };
        //Product is exist or not
       let product = await Product.findById(productId);
        if (!product){
            return responce.status(401).json({
                msg:"No Product Find"
            });
        }
        //update product
        product = await Product.findByIdAndUpdate(productId,{
            $set : updatedProduct
        },{new:true});
        responce.status(200).json({
            result:'Product Updated',
            product:product
        })
    }
    catch (err) {
        console.error(err);
        responce.status(500).json({
            msg:err.message
        });
        
    }
});

/*

   Usage : Delete product
   URL : http://127.0.0.1:8000/api/products/:id
   Method : DELETE
   Fields : no-fields


 */

router.delete('/products/:id',async (request,responce)=>{
    try {
        let productId = request.params.id;

        //Product is exist or not
        let product = await Product.findById(productId);
        if (!product){
            return responce.status(401).json({
                msg:"No Product Find"
            });
        }

        //delete
        product = await Product.findByIdAndDelete(productId);
        responce.status(200).json({
            result:"product is deleted",
            product:product
        });
    }

    catch (err) {
        console.error(err);
        responce.status(500).json({
            msg:err.message
        });
    }
});



module.exports=router;
