const path = require('path');

/* BODY es igual que CHECK */
const { body } = require('express-validator');

const validations = [
	body('first_name').notEmpty().withMessage('Tienes que escribir el nombre completo.'),
    body('last_name').notEmpty().withMessage('Tienes que escribir el apellido.'),
	body('email')
		.notEmpty().withMessage('Tienes que escribir un correo electrónico').bail()
		.isEmail().withMessage('Debes escribir un formato de correo válido'),
	body('password').notEmpty().withMessage('Tienes que escribir una contraseña'),
    body('secondPassword').custom((value, { req }) => {
		let password = req.body.password
        let secondPassword = req.body.secondPassword
        //console.log(password + " - " + secondPassword);

        if(password !== secondPassword){
            throw new Error('El usuario y contraseña no coincide');
        }
        return true;
	}),
	body('province').notEmpty().withMessage('Tienes que escribir una provincia'),
    body('location').notEmpty().withMessage('Tienes que escribir una locación'),
    body('street').notEmpty().withMessage('Tienes que escribir una calle y su respectiva altura'),
	body('avatar').custom((value, { req }) => {
		let file = req.file;
		
		let acceptedExtensions = ['.jpg', '.png', '.gif'];
		
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