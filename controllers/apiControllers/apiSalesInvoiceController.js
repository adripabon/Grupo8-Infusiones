const { json } = require("express/lib/response");
let db = require("../../database/models");
const Op = db.Sequelize.Op;

const apiSalesInvoice={

    list:(req, res) =>{
        db.SalesInvoices.findAll({
            attributes:['id_sales_invoice','id_users', 'date_registration', 'subtotal', 'tax', 'total_cost' ],
            include: ['saleInvoiceDetail']
        })
        .then(salesInvoice=>{

            let resultado = {
                count : {count: salesInvoice.length},
                users : salesInvoice
            }
            res.json(resultado)
            }) 
        .catch(err=>{console.log(err)})     
    }
}

module.exports = apiSalesInvoice