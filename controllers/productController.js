let db = require("../database/models");
const Op = db.Sequelize.Op;
const session = require('express-session');


/* Se requiere el resultado de validaciones solamente */
const { validationResult } = require('express-validator');
//const { where } = require("sequelize/dist");

/* Contine los controladores del index */
const productController = {
  
  productCart: async (req, res) => {
    let user=req.session.userLogged 
    let productosCarrito = req.session.carritoArray
    res.render("products/productCart", {productosCarrito, user});
  },
  listProducts: async (req, res) => {
    let typeProduct = req.query.type;
    
    res.locals.typeProduct = typeProduct;
    
    let products = [];
    if (typeProduct) {
      
      db.Products.findAll({
        attributes:['id_products','name', 'description', 'price', 'discount', 'id_type_product', 'image', [db.sequelize.fn('CONCAT', false), 'isSelected']  ],
        include: [
          { association: "typeProduct" },
          {
            association: "categoryProducts",
            where: { name: { [Op.like]: `%${typeProduct}%` } },
          },
        ],
      }).then((products) => {
        res.render("products/list-products",{ products });
      })
      .catch(err=>{console.log(err);});
      
    } else {
      db.Products.findAll({
        attributes:['id_products','name', 'description', 'price', 'id_type_product', 'image', [db.sequelize.fn('CONCAT', false), 'isSelected']  ],
        include: [
          { association: "typeProduct" },
          { association: "categoryProducts" },
        ],
      }).then((products) => {
        res.render("products/list-products", { products });
      });
      
    }
    
  },
  productDetails: async (req, res) => {
    //req.session.carritoArray = [];
    let product = await db.Products.findByPk(req.params.id, {
      attributes:['id_products','name', 'description', 'price', 'id_type_product', 'image', [db.sequelize.fn('CONCAT', false), 'isSelected']  ],
      include: [
        { association: "typeProduct" },
        { association: "categoryProducts" },
      ],
    })
    res.render("products/productDetails", { product });
  },
  carritoAdd: async(req,res) =>{
    if(req.session.carritoArray == undefined ){ req.session.carritoArray = []}
    let carritoArray = req.session.carritoArray
    req.session.carritoArray 
    db.Products.findByPk( req.params.id ,
      { 
        attributes:['id_products','name', 'description', 'price', 'id_type_product', 'image', [db.sequelize.fn('CONCAT', false), 'isSelected']  ],
      },
  ).then(product=>{
      carritoArray.push(product);
      req.session.carritoArray = carritoArray
      res.redirect("/product/product-cart")
    })      
  },

  carritoDelete: (req,res)=>{
    let carritoArray = req.session.carritoArray
    db.Products.findByPk(req.params.id)
    .then(product=>{
      let carritoArrayFiltrado = carritoArray.filter(result=>{
         return result.id_products != product.id_products
      })
      console.log(carritoArrayFiltrado);
     req.session.carritoArray= carritoArrayFiltrado
     res.redirect("/product/product-cart")
    })
     .catch(err=>console.log(err))
  },
  edit: async (req, res) => {
    
    const product = await db.Products.findByPk(req.params.id);
    const category = await db.CategoryProducts.findAll();
    const type =  await db.TypeProducts.findAll();

    Promise.all([product, category, type]).then(
      ([product, category, type]) =>{
        res.render("products/edit-myProducts", { product, category, type });
      })
    
  },

  update: async (req, res) => {
    const resultValidation = validationResult(req);
    console.log('Error ', resultValidation.errors.length);
    if (resultValidation.errors.length > 0) {
			const category = await db.CategoryProducts.findAll();
      const type =  await db.TypeProducts.findAll();
  
      Promise.all([category, type]).then(
        ([category, type]) =>{
          
          let oldData = req.body
          oldData.id_category_product = req.body.category
          oldData.id_type_product = req.body.type
          return res.render('products/edit-myProducts', {
            /* DEvuelve un objeto literal */
            errors: resultValidation.mapped(),
            product: oldData,
            category: category, 
            type: type
          });
      })
		}
    
    let id = req.params.id;
    let product = await db.Products.findByPk(id);
    let image = product.image;
    
    if (req.file) 
      image = req.file.filename;

    db.Products.update({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      discount: req.body.discount,
      id_category_product: req.body.category,
      id_type_product: req.body.type,
      image: image 
    },{
      where: { id_products: id }
    }).then( 
      db.Products.findByPk(id)
      .then(product => {
        res.redirect("/")
      })
    )   
  },
  create: async (req, res) => {
    res.render("products/myProducts");
  },
  processCreate: async (req, res) => {
    const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
			const category = await db.CategoryProducts.findAll();
      const type =  await db.TypeProducts.findAll();
  
      Promise.all([category, type]).then(
        ([category, type]) =>{
          
          let oldData = req.body
          oldData.id_category_product = req.body.category
          oldData.id_type_product = req.body.type
          return res.render('products/edit-myProducts', {
            /* DEvuelve un objeto literal */
            errors: resultValidation.mapped(),
            product: oldData,
            category: category, 
            type: type
          });
      })
		}
    
    let image = "";

    if (req.file) image = req.file.filename;

    let product = {
      ...req.body,
      id_category_product: req.body.category,
      id_type_product: req.body.type,
      image: image,
    };
    delete product.type
    delete product.category

    db.Products.create(product)
    .then(product => {
      res.render("products/productDetails", { product })
    })
    
    //res.render("products/productDetails", { product });
  },
  delete: async (req, res) => {
   
    db.Products.destroy({
      where: { id_products:req.params.id }
    }).then(
      res.redirect('/')
    )
  },
};

module.exports = productController;
