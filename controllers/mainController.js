const jsonTable = require('../data/jsonTable')
const productsModel = jsonTable('products')


/* Contine los controladores del index */
const mainController = {
   /*  index: (req,res)=>{
        res.render('index',{about, 'menu': listaPlatos})
    }, */
    index: (req, res) => {
        const products = productsModel.all()

        res.render('index',{ products: products });
    }
}

module.exports = mainController