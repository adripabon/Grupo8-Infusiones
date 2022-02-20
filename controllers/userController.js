let db = require("../database/models");
const Op = db.Sequelize.Op;

/* Se requiere el resultado de validaciones solamente */
const { validationResult } = require('express-validator');
/* Algoritmo encripción */
const bcrypt = require('bcryptjs')

/* Contine los controladores de user */
const userController = {
    login: async (req, res) => {
        res.render('users/login');
    },
    loginProcess: async (req, res) =>{
        
		const resultValidation = validationResult(req);

        //let userToLoguin = userModel.filter('email', req.body.email, 2)
		
		if (resultValidation.errors.length > 0) {
			return res.render('users/login', {
				/* DEvuelve un objeto literal */
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		}

		let userToLoguin = await db.Users.findAll({
			where: { email: req.body.email }
		});

        //Valida si el usuario esta o no en bd
		if(userToLoguin.length > 0){
			//console.log("aqui");
            // console.log(userToLoguin[0].password);
            //console.log(userToLoguin.email + 'Aqui');
			//Valida si el hash almacenado es igual a la contraseña ingresada en el form
			let isOkThePassword = bcrypt.compareSync(req.body.password, userToLoguin[0].password)
			if( isOkThePassword ){
				//Se inicicaliza la variable de sesión
				//Se elimina la propiedad password de la sesión por seguridad
				
                delete userToLoguin[0].password
                delete userToLoguin[0].secondPassword

				//Genera una sessión con el usuario logueado, lo que no tiene es el password por seguridad.
                req.session.userLogged = userToLoguin[0]

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
    register: async (req, res) => {

        res.render('users/register');
    },
    registerProcess: async (req, res) =>{
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
        
		let userInDB = await db.Users.findAll({
			where: { email: req.body.email }
		});

		if( userInDB.length > 0 ){
            //console.log(userInDB + "-" + req.body.email);
			return res.render('users/register', {
				/* Devuelve un objeto literal */
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
			id_profile: 2, 
            password: bcrypt.hashSync(req.body.password, 10),
            second_password: bcrypt.hashSync(req.body.secondPassword, 10),
            avatar: req.file.filename
        }

		db.Users.create(row)
		.then(user => {
			res.render("users/login")
		})
    },
    profile: async (req, res) => {
        let user = []
        res.render('users/userProfile', { user })
    },
    logout: async (req, res) =>{
        //Se elimina la cookie generada
		res.clearCookie('userCoffte')
		//Se destruye la sesión
		req.session.destroy()
		return res.redirect('/')
    },
	edit: async (req, res) => {
    
		db.Users.findByPk(req.params.id)
		.then((user) => {
            res.render("users/edit-user", { 
				errors: [],
				oldData: user
			 });
          })
		
	},
	
	update: async (req, res) => {
		const resultValidation = validationResult(req);
		
		if (resultValidation.errors.length > 0) {
			return res.render('users/edit-user', {
				/* DEvuelve un objeto literal */
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		}

		let id = req.params.id;
		let user = await db.Users.findByPk(id);
		let image = user.avatar;

		
		//console.log(req.body);
		
		if (req.file) 
		  image = req.file.filename;

		let row = {
            ...req.body, 
            password: bcrypt.hashSync(req.body.password, 10),
            second_password: bcrypt.hashSync(req.body.secondPassword, 10),
			profile: user.id_profile,
			email: user.email,
            avatar: image
        }

		delete row.secondPassword
		
		//console.log(row);
		db.Users.update({
			...row
		},{
		  where: { id_users: id }
		}).then( 
		  db.Users.findByPk(id)
		  .then(user => {
			res.redirect("/")
		  })
		) 
	},

 }
 
 module.exports = userController