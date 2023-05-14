const { default: mongoose } = require("mongoose");
const invoiceModel = require("../models/invoiceModel");
const userModels = require("../models/userModels");
const sendEmailConfig = require("../config/sendEmailConfig");
const generatePDF = require("../utils/generatePDF");

module.exports = class InvoiceController {
  /**
   * get All invoice
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @returns
   */
  static async getAllInvoice(req, res) {
    const invoices = await invoiceModel.find();
    if (!invoices || !Boolean(invoices.length)) {
      return res
        .status(404)
        .json({ status: "error", message: "invoice not found" });
    }
    return res.json(invoices);
  }

  /**
   * to add new invoice
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @access public
   * @route /invoices
   */
  static async createInvoice(req, res) {
    try {
      const { userId, items } = req.body;

      if (!mongoose.Types.ObjectId.isValid(userId) || !Boolean(items?.length)) {
        return res
          .status(403)
          .json({ message: "wrong crudentials!", status: "error" });
      }

      const user = await userModels.findById(userId).lean().exec();
      if (!user) {
        return res
          .status(404)
          .json({ message: "User Not Found !", status: "error" });
      }
      console.log("userid : ", user);

      const parseItems = items.map((i) => ({
        title: i.item,
        hours: parseFloat(i.hours),
        rate: parseFloat(i.rate),
      }));

      console.log("parse : ", parseItems);
      const invoice = await invoiceModel.create({
        userId: new mongoose.Types.ObjectId(userId),
        items: parseItems,
      });
      // TODO send the correct response
      console.log("invoice : ", invoice);
      return res.status(201).json({ ...invoice });
    } catch (err) {
      console.log("err : ", err);
      return res
        .status(500)
        .json({ message: "Something went wrong ", status: "error" });
    }
  }
  /**
   * to get invoice by it's id
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @access public
   * @route /invoices/:id
   */
  static async getInvoiceById(req, res) {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res
          .status(404)
          .json({ status: "error", message: "wrong crudentials !" });
      }

      const invoice = await invoiceModel
        .findById(new mongoose.Types.ObjectId(id))
        // .populate("User", { strictPopulate: false })
        .lean()
        .exec();
      if (!invoice) {
        return res
          .status(404)
          .json({ status: "error", message: "invoice not found" });
      }

      const user = await userModels
        .findById(new mongoose.Types.ObjectId(invoice?.userId))
        .lean()
        .exec();
      console.log("invoice : ", invoice);
      console.log("invoice : ", user);

      if (!user) {
        return res
          .status(404)
          .json({ status: "error", message: "user not found" });
      }

      return res.json({ items: invoice?.items, user });
    } catch (err) {
      console.log("err : ", err);
      return res
        .status(500)
        .json({ message: "Something went wrong ", status: "error" });
    }
  }
  /**
   * to send invoice via mail
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @access public
   * @route /invoices/:id/send_email
   */
  static async sendEmail(req, res) {
    try {
      const { invoice_id } = req.params;
      const { userId } = req.body;
      console.log("userId : ", userId);
      // is the invoice id valid ?
      if (
        !mongoose.Types.ObjectId.isValid(invoice_id) ||
        !mongoose.Types.ObjectId.isValid(userId)
      ) {
        return res
          .status(400)
          .json({ status: "error", message: "the provided id is not valid" });
      }

      /* // fetch the data we want to use
      const invoice = await invoiceModel
        .findById(new mongoose.Types.ObjectId(invoice_id))
        // .populate("User", { strictPopulate: false })
        .lean()
        .exec();

      if (!invoice) {
        return res
          .status(404)
          .json({ status: "error", message: "invoice not found" });
      }
 */
      const user = await userModels
        .findById(new mongoose.Types.ObjectId(userId))
        .lean()
        .exec();

      if (!user) {
        return res
          .status(404)
          .json({ status: "error", message: "user not found" });
      }

      // time to generate the pdf
      await generatePDF(invoice_id);
      console.log("passed 2 : ", user);
      // now we send it
      const { transporter, setEmailOptions } = sendEmailConfig();

      return transporter
        .sendMail(
          setEmailOptions({
            message: "Here is your invoice",
            subject: "Payment Invoice",
            // TODO set it to the current user email
            receive: user.email,
            invoice_id,
          })
        )
        .then((r) => {
          console.log("res : ", r);
          return res.status(200).json({
            message: "email send successfully !  : emailID " + r.messageId,
          });
        })
        .catch((err) => {
          console.log("err : ", err);
          return res.status(500).json({
            status: "error",
            message: "Can't send the email: server error !",
          });
        });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Something went wrong ", status: "error" });
    }
  }
};
