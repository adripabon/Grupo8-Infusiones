module.exports = (sequelize, dataTypes) =>{
    let alias = 'CategoryProducts'
    let columns = {
        id_category_product: {
            primaryKey: true,
            autoIncrement: true,
            type: dataTypes.INTEGER
        },
        description: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(50),
            allowNull: true
        }
    }
    let config = {
        tableName: 'category_product',
        timestamps: false  
    }
    
    const CategoryProduct = sequelize.define(alias, columns, config)
    
    CategoryProduct.associate = function(models){
        CategoryProduct.hasMany(models.Products, {
            as: "categoryProduct",
            foreignKey: "id_category_product",
        })
    }
    return CategoryProduct
}