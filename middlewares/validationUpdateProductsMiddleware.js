const path = require('path');

/* BODY es igual que CHECK */
const { body } = require('express-validator');

const validations = [
	body('name').notEmpty().withMessage('Tienes que escribir el nombre del producto.')
		.isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres'),
    body('description').notEmpty().withMessage('Tienes que escribir una descripción.')
		.isLength({ min: 20 }).withMessage('La descrición debe tener al menos 20 caracteres')
]

module.exports = validations 