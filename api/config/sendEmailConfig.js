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
  const pathDir = path.resolve('./views/').toString()
  // point to the template folder
  const handlebarOptions = {
    viewEngine: {
      partialsDir: pathDir,
      defaultLayout: false,
    },
    viewPath: pathDir,
  };
  console.log("path : ", pathDir)
  // use a template file with nodemailer
  transporter.use('compile', hbs(handlebarOptions))

  const setEmailOptions = function ({ subject, receive, message, user, items }) {
    return {
      to: receive,
      from: `Ivan01-tech <${process.env.EMAIL}>`,
      subject,
      // TODO specify it here : the pdf
      // attachments: [{ path: ""}],
      sender: process.env.EMAIL,
      // TODO modify it here : add the pdf file
      // html: `<h2>You have receive a new message from Invoice Genarator App</h2>
      // <p>${message}</p>`,
      // text: `You have receive a new message from Invoice Genarator App : ${message}`,
      template: "email",//the name of the file
      context: {
        user,
        items,
        totalSum: items.reduce(
          (acc, item) => acc + item.hours * item.rate,
          0
        )
      }
    }
  }
  return { transporter, setEmailOptions }
}
