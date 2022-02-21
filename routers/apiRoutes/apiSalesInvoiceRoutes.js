const express = require('express')
const router = express.Router()

const apiSalesInvoiceController = require('../../controllers/apiControllers/apiSalesInvoiceController')

router.get("/sale-invoice", apiSalesInvoiceController.list)
module.exports = router