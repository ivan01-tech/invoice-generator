const mongoose = require("mongoose")

const UserModel = new mongoose.Schema({
	email: {
		type: String,
		require: true,
	},
	fullname: {
		type: String,
		require: true
	},
	phone: { type: String, require: true },
	invoices: [{ type: mongoose.Types.ObjectId }]

})

module.exports = mongoose.models.User || mongoose.model("User", UserModel)