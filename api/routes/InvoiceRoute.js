const express = require('express')
const InvoiceController = require('../controllers/invoiceController')

const route = express.Router()

route
    .route("/")
    .post(InvoiceController.createInvoice)
    .get(InvoiceController.getAllInvoice)
route
    .route("/:id")
    .post(InvoiceController.sendInvoice)


module.exports = route