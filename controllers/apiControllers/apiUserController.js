const { json } = require("express/lib/response");
let db = require("../../database/models");
const Op = db.Sequelize.Op;

const apiUserController={

    list:(req, res) =>{
    db.Users.findAll({
        attributes:['id_users','first_name', 'last_name', 'email', [db.sequelize.fn('CONCAT', '/api/user/',  db.Sequelize.col('id_users')), 'url_detail'] ],
        include: ['profile']
    })
     .then(users=>{

         let resultado = {
             count : {count:users.length},
             users : users
         }
         res.json(resultado)
        }) 
     .catch(err=>{console.log(err)})     
    },

    detail:(req,res)=>{
        db.Users.findAll({
            attributes:['id_users','first_name', 'last_name', 'email', 'province', 'location', 'street', [db.sequelize.fn('CONCAT', 'http://localhost:3000/images/avatar/',  db.Sequelize.col('avatar')), 'avatar'], 'id_profile'],
            where: {
                id_users: Number(req.params.id)
            }
        })
        .then( user => {
            
            let resultado = {
                user: user
            }
            res.json(resultado)
        }) 
        .catch(err=>{console.log(err)})    
    }
}

module.exports= apiUserController