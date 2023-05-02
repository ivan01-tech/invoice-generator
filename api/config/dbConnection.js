const mongoose = require("mongoose")

const dbConnection = async function () {
	mongoose.set("strictQuery", true)
	try {
		await mongoose.connect("mongodb://localhost/invoice_db", {})
		// console.log("connected to mongoDB")
	} catch (err) {
		console.log("mongo error : ", err)
	}
}

module.exports = dbConnection