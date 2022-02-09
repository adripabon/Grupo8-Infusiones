const express = require('express')
const router = express.Router()

const apiUserController = require('../../controllers/apiControllers/apiUserController')
const upload = require('../../middlewares/multerAvatarMiddleware')

router.get("/users", apiUserController.list)
router.get("/user/:id", apiUserController.detail)
module.exports = router