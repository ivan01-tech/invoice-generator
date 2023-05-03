const invoiceModel = require("../models/invoiceModel")
const userModels = require("../models/userModels")

module.exports = class InvoiceController {

	static async getAllInvoice() {

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
			console.log("userid", items)
			console.log("userid", userId)

			if (!userId || !items?.length) {
				return res.status(403).json({ message: "wrong crudentials!", status: "error" })
			}

			const user = await userModels.findById(userId).lean().exec()
			if (!user) {
				return res.status(404).json({ message: "User Not Found !", status: "error" })
			}

			const parseItems = items.map(i => ({
				...i,
				hours: parseFloat(i.hours),
				rate: parseFloat(i.rate)
			}))

			const invoice = await invoiceModel.create({
				userId, items: parseItems
			})

			return res.status(201).json({ ...invoice })

		} catch (err) {
			return res.status(500).json({ message: "Something went wrong ", status: "error" })
		}

	}
}