const { application } = require('express');
const express = require('express')
const router = express.Router()

//Se inicicaliza el middleware de validación.
const validationProductsMiddleware = require('../middlewares/validationProductsMiddleware')

//Se invoca el middleware de multer para la carga de archivos.
const multerMiddleware = require('../middlewares/multerMiddleware')
const productController = require('../controllers/productController')

const isAdminMiddleware = require('../middlewares/isAdminMiddleware')
const authUserMiddleware = require('../middlewares/authUserMiddleware')

router.get("/product-cart", productController.productCart);

/* LIST PRODUCT */
router.get("/list-products",productController.listProducts )


/* CREATE PRODUCT */
//Valida si tiene sessión y si es un administrador.
router.get("/myProducts", authUserMiddleware, isAdminMiddleware, productController.create);
router.post("/create", multerMiddleware.single('image'), validationProductsMiddleware, isAdminMiddleware, productController.processCreate )

/* GET PRODUCT */
router.get("/product-details/:id", productController.productDetails);

/* EDIT PRODUCT */
//Valida si tiene sessión y si es un administrador.
router.get("/edit/:id", authUserMiddleware, isAdminMiddleware, productController.edit)
router.put("/edit/:id",multerMiddleware.single('image'), validationProductsMiddleware, isAdminMiddleware, productController.update )

/* DELET PRODUCT */
//Valida si tiene sessión y si es un administrador.
router.delete("/delete/:id", authUserMiddleware, isAdminMiddleware, productController.delete )

router.post("/carritoAdd/:id",productController.carritoAdd )

module.exports = router