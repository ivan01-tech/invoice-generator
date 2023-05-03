const { default: mongoose } = require("mongoose")
const invoiceModel = require("../models/invoiceModel")
const userModels = require("../models/userModels")

module.exports = class InvoiceController {
	/**
	 * get All invoice
	 * @param {Request} req 
	 * @param {Response} res 
	 * @returns 
	 */
	static async getAllInvoice(req, res) {
		const invoices = await invoiceModel.find()
		return res.json(invoices)
	}

	/**
	 * to add new invoice 
	 * @param {Request} req 
	 * @param {Response} res 
	 * @access public
	 * @route /invoices
	 */
	static async createInvoice(req, res) {
		try {

			const { userId, items } = req.body


			if (!mongoose.Types.ObjectId.isValid(userId) || !Boolean(items?.length)) {
				return res.status(403).json({ message: "wrong crudentials!", status: "error" })
			}

			const user = await userModels.findById(userId).lean().exec()
			if (!user) {
				return res.status(404).json({ message: "User Not Found !", status: "error" })
			}
			console.log("userid : ", user)

			const parseItems = items.map(i => ({
				title: i.item,
				hours: parseFloat(i.hours),
				rate: parseFloat(i.rate)
			}))

			console.log("parse : ", parseItems)
			const invoice = await invoiceModel.create({
				userId: new mongoose.Types.ObjectId(userId),
				items: parseItems
			})
			console.log("invoice : ", invoice)
			return res.status(201).json({ ...invoice })

		} catch (err) {
			console.log("err : ", err)
			return res.status(500).json({ message: "Something went wrong ", status: "error" })
		}

	}
}