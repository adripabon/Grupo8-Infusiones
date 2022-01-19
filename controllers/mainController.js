let db = require("../database/models");

/* Contine los controladores del index */
const mainController = {
   /*  index: (req,res)=>{
        res.render('index',{about, 'menu': listaPlatos})
    }, */
    index: (req, res) => {
        //const products = productsModel.all()
        
        db.Products.findAll({
            include: [
              { association: "typeProduct" },
              { association: "categoryProducts" }
            ]
          }).then((products) => {
            res.render("index", { products });
          })

        //res.render('index',{ products: products });
    }
}

module.exports = mainController