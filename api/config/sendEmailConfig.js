require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
const path = require("node:path");

const nodemailer = require("nodemailer");
//reference the plugin
// const hbs = require("nodemailer-express-handlebars");

// define the sender params
module.exports = sendEmailConfig = function () {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    secure: true,
    port: 465,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  /* const pathDir = path.resolve("./views/").toString();
  // point to the template folder
  const handlebarOptions = {
    viewEngine: {
      partialsDir: pathDir,
      defaultLayout: false,
    },
    viewPath: pathDir,
  };
  console.log("path : ", pathDir);
  // use a template file with nodemailer
  transporter.use("compile", hbs(handlebarOptions)); */

  /**
   *to set coustom options for the email
   * @param {*} param0
   * @returns
   */
  const setEmailOptions = function ({ subject, receive, message, invoice_id }) {
    return {
      to: receive,
      from: `Ivan01-tech <${process.env.EMAIL}>`,
      subject,
      // the pdf to be attached
      attachments: [
        {
          filename: "invoice_email.pdf",
          path: path.resolve(
            __dirname,
            `../invoices/invoice_${invoice_id}.pdf`
          ),
          contentType: "application/pdf",
        },
      ],
      sender: process.env.EMAIL,
      // TODO modify it here : add the pdf file
      html: `<h2>You have receive a new message from Invoice Genarator App</h2>
       <h3>${message}</h3>`,
      text: `You have receive a new message from Invoice Genarator App : ${message}`,
      /* template: "email", //the name of the file
      context: {
        user,
        items,
        totalSum: items.reduce((acc, item) => acc + item.hours * item.rate, 0),
      }, */
    };
  };
  return { transporter, setEmailOptions };
};
