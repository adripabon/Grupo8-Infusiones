let db = require("../../database/models");
const Op = db.Sequelize.Op;

//llamado de la categoria
let categoriasArray = []
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
        
     }
     categoriasArray.push(resultado)
     console.log(categoriasArray[0].countByCategory);
    }) 
 .catch(err=>{console.log(err)}) 
 
//fin de llamado a la categoria

const apiProductsController={

    list:(req, res) =>{
   
    db.Products.findAll({
        attributes:['id_products','description', 'price', 'discount', 'id_category_product', 'id_type_product', 'image', [db.sequelize.fn('CONCAT', '/api/product/',  db.Sequelize.col('id_products')), 'url_detail'] ],
        include: [
            { association: "typeProduct" },
            { association: "categoryProducts" },
          ]
    })
     .then(products=>{
        let productsArray = [];
        let productObj 
        products.map( product => {
            
            let url_detail = `/api/product/${product.id_products}` 
            productObj = { product,  url_detail: url_detail }
            productsArray.push(productObj)
        })

        //console.log(userArray)
         let resultado = {
             count : {count:products.length},
             countByCategory : categoriasArray[0].countByCategory,
             products : productsArray
         }
         res.json(resultado)
        }) 
     .catch(err=>{console.log(err)})     
    },

    detail:(req,res)=>{
        db.Products.findByPk(req.params.id,)
        .then(product=>{
            
            let resultado = {
            product: product,
            url_image : `localhost:3000/images/AVATAR/${product.image}`
            }
            res.json(resultado)
        }) 
        .catch(err=>{console.log(err)})    
    }
}

module.exports= apiProductsController
