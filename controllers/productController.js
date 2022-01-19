let db = require("../database/models");
const Op = db.Sequelize.Op;

/* Contine los controladores del index */
const productController = {

  productCart: async (req, res) => {
    res.render("products/productCart");
  },
  listProducts: async (req, res) => {
    let typeProduct = req.query.type;

    res.locals.typeProduct = typeProduct;

    let products = [];
    if (typeProduct) {

      db.Products.findAll({
        include: [
          { association: "typeProduct" },
          {
            association: "categoryProducts",
            where: { name: { [Op.like]: `%${typeProduct}%` } },
          },
        ],
      }).then((products) => {
        res.render("products/list-products", { products });
      });

    } else {
      db.Products.findAll({
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

    let product = await db.Products.findByPk(req.params.id, {
      include: [
        { association: "typeProduct" },
        { association: "categoryProducts" },
      ],
    })

    res.render("products/productDetails", { product });
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
    let id = req.params.id;
    let product = await db.Products.findByPk(id);
    let image = product.image;
    //console.log(req.file);
    
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
        res.render("products/productDetails", { product})
      })
    )   
  },
  create: async (req, res) => {
    res.render("products/myProducts");
  },
  processCreate: async (req, res) => {
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
