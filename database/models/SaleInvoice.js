module.exports = (sequelize, dataTypes) =>{
    let alias = 'SalesInvoices'
    let columns = {
        id_sales_invoice: {
            primaryKey: true,
            autoIncrement: true,
            type: dataTypes.INTEGER
        },
        id_users: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        date_registration: {
            type: dataTypes.DATE,
            allowNull: false
        },
        subtotal: {
            type: dataTypes.DOUBLE,
            allowNull: false
        },
        tax: {
            type: dataTypes.DOUBLE,
            allowNull: false
        },
        total_cost: {
            type: dataTypes.DOUBLE,
            allowNull: false
        }
    }
    let config = {
        tableName: 'sales_invoice',
        timestamps: false  
    }
    
    const SaleInvoice = sequelize.define(alias, columns, config)
    
    SaleInvoice.associate = function(models){
        SaleInvoice.belongsTo(models.Users, {
            as: "saleInvoiceUser",
            foreignKey: "id_users",
            timestamps: false
        })

        SaleInvoice.hasMany(models.InvoicesDetails, {
            as: "saleInvoiceDetail",
            foreignKey: "id_sales_invoice",
        })

    }
    return SaleInvoice
}