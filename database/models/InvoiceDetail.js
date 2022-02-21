module.exports = (sequelize, dataTypes) =>{
    let alias = 'InvoicesDetails'
    let columns = {
        id_invoice_detail: {
            primaryKey: true,
            autoIncrement: true,
            type: dataTypes.INTEGER
        },
        id_sales_invoice: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        id_products: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        quantity: {
            type: dataTypes.DOUBLE,
            allowNull: false
        },
        unit_price: {
            type: dataTypes.DOUBLE,
            allowNull: false
        },
        discount: {
            type: dataTypes.DOUBLE,
            allowNull: false
        },
        subtotal: {
            type: dataTypes.DOUBLE,
            allowNull: false
        }
    }
    let config = {
        tableName: 'invoice_detail',
        timestamps: false  
    }
    
    const InvoiceDetail = sequelize.define(alias, columns, config)
    
    InvoiceDetail.associate = function(models){
        InvoiceDetail.belongsTo(models.SalesInvoices, {
            as: "SaleInvoice",
            foreignKey: "id_sales_invoice",
            timestamps: false
        })

        InvoiceDetail.belongsTo(models.Products, {
            as: "ProductInvoiceDetail",
            foreignKey: "id_products",
            timestamps: false
        })

    }
    return InvoiceDetail
}