require("dotenv").config()
const express = require("express")
const dbConnection = require("./config/dbConnection.js")
const { default: mongoose } = require("mongoose")
const rootRoute = require("./routes/root.js")
const usersRoute = require("./routes/userRoute.js")
const PORT = process.env.PORT || 3500
const app = express()

dbConnection()
// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routes
app.use("/", rootRoute)
// users route
app.use("/users", usersRoute)

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
