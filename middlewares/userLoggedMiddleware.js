let db = require("../database/models");

async function userLoggedMiddleware (req, res, next){
    //1. Permite buscar si existe una cookie, si existe habilita la sessión.
    //2. Pregunta si se tiene una sessión.

    //Si se tiene una cookie o sessión habilitada, el sistema genera una variable local en la respuesta donde define res.locals.isLogged = true y userLogged    
    let userEmailInCookie = undefined
    let userFromCookie = undefined
    //console.log(req.cookies);
    if(req.cookies.userCoffte != undefined){
        //console.log('Entra a cookie');
        userEmailInCookie = req.cookies.userCoffte

        //console.log('email: ', userEmailInCookie);

        userFromCookie = await db.Users.findAll({
			where: { email: userEmailInCookie }
		});

        //console.log('userBD: ', userFromCookie);
        delete userFromCookie[0].password
        delete userFromCookie[0].secondPassword        
    }    

    //Tambien se validara, si existe una cookie, el sistema lo logueará de forma automática.
    if( userFromCookie){
        req.session.userLogged = userFromCookie[0]
    }
   
    //Variable de control de usuario legueado.
    res.locals.isLogged = false
    if(req.session && req.session.userLogged){
        res.locals.isLogged = true
        //console.log(req.session.userLogged);
        res.locals.userLogged = req.session.userLogged
    }

    next()
}
module.exports = userLoggedMiddleware