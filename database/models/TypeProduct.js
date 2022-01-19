module.exports = (sequelize, dataTypes) =>{
    let alias = 'TypeProducts'
    let columns = {
        id_type_product: {
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
        tableName: 'type_product',
        timestamps: false  
    }
    
    const TypeProduct = sequelize.define(alias, columns, config)
    
    TypeProduct.associate = function(models){
        TypeProduct.hasMany(models.Products, {
            as: "typeProduct",
            foreignKey: "id_type_product",
        })
    }
    return TypeProduct
}