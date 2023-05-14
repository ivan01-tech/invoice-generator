const express = require("express");
const InvoiceController = require("../controllers/invoiceController");

const route = express.Router();

route
  .route("/")
  .post(InvoiceController.createInvoice)
  .get(InvoiceController.getAllInvoice);
route.route("/:id").get(InvoiceController.getInvoiceById);
route.route("/:invoice_id/send_email").post(InvoiceController.sendEmail);

module.exports = route;
