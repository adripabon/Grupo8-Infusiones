module.exports = (sequelize, dataTypes) =>{
    let alias = 'Products'
    let columns = {
        id_products: {
            primaryKey: true,
            autoIncrement: true,
            type: dataTypes.INTEGER
        },
        name: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        description: {
            type: dataTypes.STRING(500),
            allowNull: false
        },
        price: {
            type: dataTypes.DOUBLE,
            allowNull: false
        },
        discount: {
            type: dataTypes.DOUBLE,
            allowNull: true
        },
        id_category_product: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        id_type_product: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        image: {
            type: dataTypes.STRING(300),
            allowNull: false
        }
    }
    let config = {
        tableName: 'products',
        timestamps: false  
    }
    
    const Product = sequelize.define(alias, columns, config)
    
    Product.associate = function(models){
        Product.belongsTo(models.TypeProducts, {
            as: "typeProduct",
            foreignKey: "id_type_product",
            timestamps: false
        })

        Product.belongsTo(models.CategoryProducts, {
            as: "categoryProducts",
            foreignKey: "id_category_product",
            timestamps: false
        })

        Product.hasMany(models.InvoicesDetails, {
            as: "productInvoiceDetail",
            foreignKey: "id_products",
        })
    }
    return Product
}