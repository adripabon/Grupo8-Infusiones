const { json } = require("express/lib/response");
let db = require("../../database/models");
const Op = db.Sequelize.Op;

const apiCategoriesController={

    list:(req, res) =>{
    db.CategoryProducts.findAll({
        
        include: ['categoryProduct']
    })
     .then(category=>{
         countByCategory = [];
         categoryByOne = []
         category.map(cat=>{
             categoryProduct = {
                 categoryName : cat.name,
                 catProduct : cat.categoryProduct
             }
             
            countByCategory.push(categoryProduct)
         });

         countByCategory.map(catByOne=>{
           
           let result = {
               categoryName : catByOne.categoryName,
               count : catByOne.catProduct.length,
            }
            categoryByOne.push(result)
         })
         let resultado = {
             count : {count:category.length},
             countByCategory : categoryByOne,
             category : category 
         }
         res.json(resultado)
        }) 
     .catch(err=>{console.log(err)})     
    },
}

module.exports= apiCategoriesController