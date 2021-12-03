const jsonTable = require("../data/jsonTable");
const userModel = jsonTable("users");

/* Se requiere el resultado de validaciones solamente */
const { validationResult } = require('express-validator');
/* Algoritmo encripción */
const bcrypt = require('bcryptjs')

/* Contine los controladores de user */
const userController = {
    login: (req, res) => {
        res.render('users/login');
    },
    loginProcess: (req, res) =>{
         
         let userToLoguin = userModel.filter('email', req.body.email, 2)
		
        //Valida si el usuario esta o no en bd
		if(userToLoguin){
			//console.log("aqui");
            //console.log(userToLoguin);
            //console.log(userToLoguin.email + 'Aqui');
			//Valida si el hash almacenado es igual a la contraseña ingresada en el form
			let isOkThePassword = bcrypt.compareSync(req.body.password, userToLoguin.password)
			if( isOkThePassword ){
				//Se inicicaliza la variable de sesión
				//Se elimina la propiedad password de la sesión por seguridad
				
                delete userToLoguin.password
                delete userToLoguin.secondPassword

				//Genera una sessión con el usuario logueado, lo que no tiene es el password por seguridad.
                req.session.userLogged = userToLoguin

				//Si el usuario solicito recordar su usuario, se genera una cookie.
				if(req.body.remember){
				    res.cookie('userCoffte', req.body.email , { maxAge: (1000 * 60) * 2 })
                    //res.cookie('userCoffte', req.body.email , { maxAge: 60})
				}

				return res.redirect('/user/profile')
			}else{
				res.render('users/login', {
					errors: {
						email: 
						{ 
							msg: 'Credenciales inválidas'
						}
					}
				})
			}
		}else{
            
			res.render('users/login', {
				errors: {
					email: 
					{ 
						msg: 'Credenciales inválidas'
					}
				}
			})
		}
		
    },
    register: (req, res) => {

        res.render('users/register');
    },
    registerProcess: (req, res) =>{
        const resultValidation = validationResult(req);
		
		if (resultValidation.errors.length > 0) {
			return res.render('users/register', {
				/* DEvuelve un objeto literal */
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		}
		//console.log(req.body, req.file);

		//Validamos que no exista el usuario con el mismo mail
		let userInDB = userModel.filter('email', req.body.email, 2)
        
		if(userInDB && userInDB != ''){
            //console.log(userInDB + "-" + req.body.email);
			return res.render('users/register', {
				/* DEvuelve un objeto literal */
				errors: { 
					email: {
						msg: 'Este email ya esta registrado'
					}
				},
				oldData: req.body
			})
		}

        let row = {
            ...req.body,
            password: bcrypt.hashSync(req.body.password, 10),
            secondPassword: bcrypt.hashSync(req.body.secondPassword, 10),
            avatar: req.file.filename
        }

        //console.log(row);

        let userInsert = userModel.create(row)
        
        res.render('users/login');

    },
    profile: (req, res) => {
        let user = []
        res.render('users/userProfile', { user })
    },
    logout: (req, res) =>{
        //Se elimina la cookie generada
		res.clearCookie('userCoffte')
		//Se destruye la sesión
		req.session.destroy()
		return res.redirect('/')
    }

 }
 
 module.exports = userController