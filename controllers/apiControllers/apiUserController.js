let db = require("../../database/models");
const Op = db.Sequelize.Op;

const apiUserController={

    list:(req, res) =>{
    db.Users.findAll({
        attributes:['id_users','first_name', 'last_name', 'email', 'province', 'location', 'street', 'avatar', 'id_profile'],
        include: ['profile']
    })
     .then(users=>{
        
         let resultado = {
             count : {count:users.length},
             users : {
                url: "/api/users/"+ users.id_users,     
                 ...users,
             }
             
         }
         res.json(resultado)
        }) 
     .catch(err=>{console.log(err)})     
    },

    detail:(req,res)=>{
        db.Users.findByPk(req.params.id)
        .then(user=>{
            delete user.password,
            delete user.secondPassword
            let resultado = {
                ...user
            }
            res.json(resultado)
        }) 
        .catch(err=>{console.log(err)})    
    }
}

module.exports= apiUserController