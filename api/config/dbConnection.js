const mongoose = require("mongoose")

const dbConnection = async function () {
	try {
		await mongoose.connect("mongodb://localhost/invoice_db", {})
	} catch (err) {
		console.log("mongo error : ", err)
	}
}


module.exports = dbConnection