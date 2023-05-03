const express = require('express')
const InvoiceController = require('../controllers/invoiceController')

const route = express.Router()

route
    .route("/")
    .post(InvoiceController.createInvoice)

module.exports = route