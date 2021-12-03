//Valida si hay un usuario en sesión
function guestMiddleware (req, res, next){
    if(req.session.userLogged){
        return res.redirect('/user/profile')
    }
    next()
}

module.exports = guestMiddleware