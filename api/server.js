require("dotenv").config()
const express = require("express")
// const nodemailer = require("nodemailer")

const dbConnection = require("./config/dbConnection.js")
const { default: mongoose } = require("mongoose")
const rootRoute = require("./routes/root.js")
const usersRoute = require("./routes/userRoute.js")
const PORT = process.env.PORT || 4000
const app = express()

dbConnection()
// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routes
app.use("/", rootRoute)
// users route
app.use("/users", usersRoute)

// temporary route test sending email 
app.get("/email", function (req, res) {
	const mailOptions = {
		from: '"Example Team" <ivansilatsa@example.com>',
		to: 'belvinetonleu@example.com, user2@example.com',
		subject: 'Nice Nodemailer test',
		text: 'Hey there, it’s our first message sent with Nodemailer 😉 ',
		html: '<b><h1>Hey there!</h1> </b><br> This is our first message sent with Nodemailer'
	};
	const transporter = nodemailer.createTransport(mailOptions)

	transporter.verify(function (err, success) {
		if (err) throw err
		console.log("Server is ready to send email : ", success)
	})

	transporter.sendMail(mailOptions, function (err, info) {
		if (err) throw err
		console.log("info : ", info)
	})


})

mongoose.connection.on("open", function (err) {
	console.log("Connected to mongoDB")

	// listen to the server now
	app.listen(PORT, function () {
		console.log("server up and running on port : ", PORT)
	})

})

mongoose.connection.on("error", function (err) {
	console.log(err)
})
