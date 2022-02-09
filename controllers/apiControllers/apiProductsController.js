let db = require("../../database/models");
const Op = db.Sequelize.Op;

const apiProductsController={

    list:(req, res) =>{
    db.Products.findAll({
        include: [
            { association: "typeProduct" },
            { association: "categoryProducts" },
          ]
    })
     .then(products=>{
         let resultado = {
             count : {count:products.length},
             products : products,
         }
         res.json(resultado)
        }) 
     .catch(err=>{console.log(err)})     
    },

    detail:(req,res)=>{
        db.Products.findByPk(req.params.id,)
        .then(product=>{
            
            let resultado = {
                ...product
            }
            res.json(resultado)
        }) 
        .catch(err=>{console.log(err)})    
    }
}

module.exports= apiProductsController
