const express = require("express")
const usersControllers = require("../controllers/userController.js")

const userRoute = express()

userRoute
	.get("/", usersControllers.getAllUsers)
	.post("/", usersControllers.createUser)

module.exports = userRoute