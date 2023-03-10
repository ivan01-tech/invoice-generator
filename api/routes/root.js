const express = require("express")
const rootRoute = express.Router()


rootRoute.get("/", function (req, res) {
	res.end("welcome to invoice genrator server")
})

module.exports = rootRoute