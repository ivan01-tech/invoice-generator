require("dotenv")()

const express = require("express")
const PORT = process.env.PORT || 3500
const app = express()



app.listen(PORT, function () {
	console.log("server running on port : ", PORT)
})