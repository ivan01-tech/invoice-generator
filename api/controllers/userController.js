const userModels = require("../models/userModels.js")

const getAllUsers = async function (req, res) {

	try {
		const users = await userModels.find().lean()

		if (!users || !users.length) return res.json({ message: "user not found ! ", status: "error" })

		return res.json({ data: users })
	} catch (err) {
		console.log(err)
	}
}

const createUser = async function (req, res) {
	try {

		const { email, phone, fullname, } = req.body

		if (!email || !phone || !fullname) return res.status(203).json({ status: "error", message: "all users credentials are required !" })

		const user = await userModels.findOne({ email })

		if (user) return res.status(409).json({ status: "error", message: "user already exist !" })

		const newUser = await userModels.create({
			email, phone, fullname
		})

		return res.status(201).json(newUser)
	} catch (err) {
		console.log("error : ", err)
	}

}

module.exports = { createUser, getAllUsers }