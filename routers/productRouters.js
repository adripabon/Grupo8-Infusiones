const { application } = require('express');
const express = require('express')
const router = express.Router()
const multer= require('multer')
const path = require('path')


const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
        console.log("aqui");
        cb(null, path.join(__dirname, '../public/images'))
    },
    filename: (req,file,cb) =>{
       console.log(file.originalName);
        const newFileName = 'PRODUCTS-' + Date.now() + path.extname(file.originalname)
        cb(null, newFileName)
    } 
});
const upload= multer({storage:storage})

const productController = require('../controllers/productController')

router.get("/myProducts", productController.myProducts);

router.get("/product-cart", productController.productCart);

router.get("/product-details/:id", productController.productDetails);

router.get("/edit/:id", productController.edit)

router.put("/edit/:id",upload.single('image'), productController.update )


module.exports = router