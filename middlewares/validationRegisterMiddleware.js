const path = require('path');

/* BODY es igual que CHECK */
const { body } = require('express-validator');

const validations = [
	body('first_name').notEmpty().withMessage('Tienes que escribir el nombre completo.')
		.isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
    body('last_name').notEmpty().withMessage('Tienes que escribir el apellido.')
	.isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres'),
	body('email')
		.notEmpty().withMessage('Tienes que escribir un correo electrónico').bail()
		.isEmail().withMessage('Debes escribir un formato de correo válido'),
	body('password').notEmpty().withMessage('Tienes que escribir una contraseña'),
		// .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
		// .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z\d@$.!%*#?&]{8,}$/, "i").withMessage('La contraseña debe ser una combinación de al menos una mayúscula, una minúscula, mínimo 8 a 20 caracteres'),
    body('secondPassword').custom((value, { req }) => {
		let password = req.body.password
        let secondPassword = req.body.secondPassword
        //console.log(password + " - " + secondPassword);

        if(password !== secondPassword){
            throw new Error('Las contraseñas no coinciden');
        }
        return true;
	}),
	body('province').notEmpty().withMessage('Tienes que escribir una provincia'),
    body('location').notEmpty().withMessage('Tienes que escribir una locación'),
    body('street').notEmpty().withMessage('Tienes que escribir una calle y su respectiva altura'),
	body('avatar').custom((value, { req }) => {
		let file = req.file;
		
		let acceptedExtensions = ['.jpg', '.jpeg',  '.png', '.gif'];
		
		if (!file) {
			throw new Error('Tienes que subir una imagen');
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
			}
		}

		return true;
	})
]

module.exports = validations 