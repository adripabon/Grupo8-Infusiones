const express = require('express')
const router = express.Router()

const apiProductsController = require('../../controllers/apiControllers/apiProductsController')
const upload = require('../../middlewares/multerAvatarMiddleware')

router.get("/products", apiProductsController.list)
router.get("/product/:id", apiProductsController.detail)
module.exports = router