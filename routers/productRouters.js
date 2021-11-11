const express = require('express')
const router = express.Router()

const productController = require('../controllers/productController')

router.get("/myProducts", productController.myProducts);

router.get("/product-cart/:id", productController.productCart);

router.get("/product-details/:id", productController.productDetails);

module.exports = router