const { json } = require("express/lib/response");
let db = require("../../database/models");
const Op = db.Sequelize.Op;

const apiCategoriesController={

    list:(req, res) =>{
    db.CategoryProducts.findAll({
        
        include: ['categoryProduct']
    })
     .then(category=>{

         let resultado = {
             count : {count:category.length},
             category : category 
         }
         res.json(resultado)
        }) 
     .catch(err=>{console.log(err)})     
    },
}

module.exports= apiCategoriesController