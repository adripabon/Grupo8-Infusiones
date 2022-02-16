const { json } = require("express/lib/response");
let db = require("../../database/models");
const Op = db.Sequelize.Op;

const apiUserController={

    list:(req, res) =>{
    db.Users.findAll({
        attributes:['id_users','first_name', 'last_name', 'email', 'province', 'location', 'street', 'avatar', 'id_profile'],
        include: ['profile']
    })
     .then(users=>{

        let usersArray = [];
        let userObj 
        users.map( user => {
            
            let url_detail = `/api/user/${user.id_users}` 
            userObj = { user,  url_detail: url_detail }
            usersArray.push(userObj)
        })

        //console.log(userArray)
         let resultado = {
             count : {count:users.length},
             users : usersArray
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