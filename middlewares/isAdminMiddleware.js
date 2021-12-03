//Valida si hay un usuario en sesión y si es un admin
function isAdminMiddleware (req, res, next){
    if(req.session.userLogged){
        if(!req.session.userLogged.isAdmin)
            return res.redirect('/')
    }
    next()
}

module.exports = isAdminMiddleware