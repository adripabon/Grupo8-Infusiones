const jsonTable = require("../data/jsonTable");
const productsModel = jsonTable("products");

const categoryProduct = jsonTable("categoryProduct");
const typeProduct = jsonTable("typeProduct");

/* Contine los controladores del index */
const productController = {

  /*  index: (req,res)=>{
         res.render('index',{about, 'menu': listaPlatos})
     }, */
  
  productCart: (req, res) => {
    res.render("products/productCart");
  },
  listProducts: (req, res) =>{
    let typeProduct = req.query.type
    
    res.locals.typeProduct = typeProduct

    let products = []
    if(typeProduct){
      products = productsModel.filter('category',typeProduct)
      //console.log(productsModel.filter('category',typeProduct));
    }else{
      products = productsModel.all()
    }
    res.render('products/list-products', {products})
  },
  productDetails: (req, res) => {
    let id = req.params.id;

    const product = productsModel.find(id);

    res.render("products/productDetails", { product });
  },
  edit: (req, res) => {
    let id = req.params.id;
    const product = productsModel.find(id);
    const category = categoryProduct.all()
    const type = typeProduct.all()
    res.render("products/edit-myProducts", { product, category, type });
  },

  update: (req, res) => {
    let id = req.params.id;
    let product = productsModel.find(id);
    //console.log(req.file);
    if (req.file)
        image = req.file.filename;
    else 
        image = product.image;

    product = {
      id: product.id,
      ...req.body,
      image: image,
    };

    id = productsModel.update(product);

    res.render("products/productDetails", { product });
  },
  create: (req, res) => {
    res.render("products/myProducts");
  },
  processCreate: (req,res) => {
    let id = productsModel.nextId()
    let image = ''

    if (req.file)
        image = req.file.filename;

    let product = {
        id:id,
        ...req.body,
        image:image
    }

    id = productsModel.create(product);

    res.render("products/productDetails", { product });

  },
  delete: ( req, res ) => {
      let id = req.params.id
      productsModel.delete(id)
      
      res.redirect('/')
  }

};

module.exports = productController;
