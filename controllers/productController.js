const jsonTable = require('../data/jsonTable')
const productsModel = jsonTable('products')

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
        let id = req.params.id

        const product = productsModel.find(id)

        res.render('products/productDetails', { product });
    },
    edit: (req,res)=> {
        let id= req.params.id;
        const product = productsModel.find(id);
        res.render("products/edit-myProducts", {product});
   },

   update: (req,res)=>{
    let id= req.params.id;
    let product = productsModel.find(id);
    console.log(req.file);
    if(req.file)
            image = req.file.filename
        else
            image = product.image
    product = {
        id: product.id,
        ...req.body,
        image: image
    }
    res.send("archivos enviados")
},


 }
 
 module.exports = productController