const { application } = require('express');
const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')


const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null, path.join(__dirname, '../public/images'))
    },
    filename: (req,file,cb) =>{
        const newFileName = 'PRODUCTS-' + Date.now() + path.extname(file.originalname)
        cb(null, newFileName)
    } 
});
const upload= multer({storage:storage})

const productController = require('../controllers/productController')


router.get("/product-cart/:id", productController.productCart);

/* LIST PRODUCT */
router.get("/list-products",productController.listProducts )


/* CREATE PRODUCT */
router.get("/myProducts", productController.create);
router.post("/create",upload.single('image'), productController.processCreate )

/* GET PRODUCT */
router.get("/product-details/:id", productController.productDetails);

/* EDIT PRODUCT */
router.get("/edit/:id", productController.edit)
router.put("/edit/:id",upload.single('image'), productController.update )

/* DELET PRODUCT */
router.delete("/delete/:id", productController.delete )


module.exports = router