/* Contine los controladores del index */
const productController = {
    /*  index: (req,res)=>{
         res.render('index',{about, 'menu': listaPlatos})
     }, */
    myProducts: (req, res) => {
        res.render('products/myProducts');
    },
    productCart: (req, res) => {
        res.render('products/productCart');
    },
    productDetails: (req, res) => {
        res.render('products/productDetails');
    }

 }
 
 module.exports = productController