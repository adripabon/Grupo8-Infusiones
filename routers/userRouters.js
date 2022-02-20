const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')
const upload = require('../middlewares/multerAvatarMiddleware')

//Valida si hay un usuario en sessión.
const guestMiddleware = require('../middlewares/guestUserMiddleware')

//Valida si no ha un usuario logueado
const authMiddleware = require('../middlewares/authUserMiddleware')

const validationRegisterMiddleware = require('../middlewares/validationRegisterMiddleware')
const validationUpdateMiddleware = require('../middlewares/validationUpdateMiddleware')
const validationLoginMiddleware = require('../middlewares/validationLoginMiddleware')
/* Inicio de sesión */
//Valida, si hay un usuario en sessión, no le carga el formulario de login.
router.get("/login", guestMiddleware, userController.login);
router.post("/login", validationLoginMiddleware, userController.loginProcess);

//Valida, si hay un usuario en sessión, no le carga el formulario de register.
router.get("/register", guestMiddleware, userController.register);
router.post("/register", upload.single('avatar'), validationRegisterMiddleware, userController.registerProcess);

//Si no hay una sessión válida, el sistema no debe permitir visualizar el profile
router.get("/profile", authMiddleware, userController.profile)

/* EDIT USER */
//Valida si tiene sessión y si es un administrador.
router.get("/edit/:id", authMiddleware, userController.edit)
router.put("/edit/:id",upload.single('avatar'),validationUpdateMiddleware, userController.update )

router.get("/logout", userController.logout)

module.exports = router