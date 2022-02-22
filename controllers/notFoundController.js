let db = require("../database/models");

/* Contine los controladores del index */
const mainController = {
   /*  index: (req,res)=>{
        res.render('index',{about, 'menu': listaPlatos})
    }, */
    notFound: (req, res) => {
        //const products = productsModel.all()
        
        res.status(404).render('not-found');
        //res.render('index',{ products: products });
    }
}

module.exports = mainController