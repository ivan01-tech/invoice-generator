const path = require("node:path")
require("dotenv").config()
const nodemailer = require("nodemailer")
//reference the plugin
const hbs = require('nodemailer-express-handlebars');
module.exports = sendEmailConfig = function () {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    secure: true,
    port: 465,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    },
  })

  // point to the template folder
  const handlebarOptions = {
    viewEngine: {
      partialsDir: path.resolve('../view/'),
      defaultLayout: true,
    },
    viewPath: path.resolve('../views/'),
  };

  // use a template file with nodemailer
  transporter.use('compile', hbs(handlebarOptions))

  const setEmailOptions = function ({ subject, receive, message, user, items }) {
    return {
      to: receive,
      from: `Ivan01-tech <${process.env.EMAIL}>`,
      subject,
      // TODO specify it here : the pdf
      // attachments: [{ path: path.resolve("../public/pdf/React-pdf.pdf") }],
      sender: process.env.EMAIL,
      // TODO modify it here : add the pdf file
      html: `<h2>You have receive a new message from Invoice Genarator App</h2>
    <p>${message}</p>`,
      text: `You have receive a new message from Invoice Genarator App : ${message}`,
      template: "email",//the name of the file
      context: { user, items }
    }
  }
  return { transporter, setEmailOptions }
}
