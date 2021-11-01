/* Contine los controladores de user */
const userController = {
    /*  index: (req,res)=>{
         res.render('index',{about, 'menu': listaPlatos})
     }, */
     login: (req, res) => {
        res.render('users/login');
    },
    register: (req, res) => {
        res.render('users/register');
    }

 }
 
 module.exports = userController