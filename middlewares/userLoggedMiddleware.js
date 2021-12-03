const jsonTable = require("../data/jsonTable");
const userModel = jsonTable("users");

function userLoggedMiddleware (req, res, next){
    //1. Permite buscar si existe una cookie, si existe habilita la sessión.
    //2. Pregunta si se tiene una sessión.

    //Si se tiene una cookie o sessión habilitada, el sistema genera una variable local en la respuesta donde define res.locals.isLogged = true y userLogged    
    let userEmailInCookie = undefined
    let userFromCookie = undefined
    //console.log(req.cookies);
    if(req.cookies.userCoffte != undefined){
        console.log('Entra a cookie');
        userEmailInCookie = req.cookies.userCoffte
        userFromCookie = userModel.filter('email', userEmailInCookie, 2)
        delete userFromCookie.password
        delete userFromCookie.secondPassword
    }    

    //Tambien se validara, si existe una cookie, el sistema lo logueará de forma automática.
    if(userFromCookie){
        req.session.userLogged = userFromCookie
    }
   
    //Variable de control de usuario legueado.
    res.locals.isLogged = false
    if(req.session && req.session.userLogged){
        res.locals.isLogged = true
        res.locals.userLogged = req.session.userLogged
    }

    next()
}
module.exports = userLoggedMiddleware