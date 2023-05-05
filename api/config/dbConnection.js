const mongoose = require("mongoose")

const url = process.env.DATABASE_URI || "mongodb://localhost/invoice_db"

const dbConnection = async function () {
	mongoose.set("strictQuery", true)
	try {
		await mongoose.connect(url, {})
		// console.log("connected to mongoDB")
	} catch (err) {
		console.log("mongo error : ", err)
	}
}

module.exports = dbConnection