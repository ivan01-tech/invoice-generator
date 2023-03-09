const express = require("express")
const userModels = require("../models/userModels.js")

const userRoute = express()

userRoute
	.get("/", async function (req, res) {
		try {

			const users = await userModels.find().lean()

			if (!users) return res.json({ message: "user not found ! ", status: "error" })

			return res.status((200)).json({ data: users })
		} catch (err) {
			console.log(err)
		}
	})

module.exports = userRoute