const express = require('express')
const router = express.Router()

const apiCategoriesController = require('../../controllers/apiControllers/apiCategoriesController')
const upload = require('../../middlewares/multerAvatarMiddleware')

router.get("/categories", apiCategoriesController.list)
module.exports = router