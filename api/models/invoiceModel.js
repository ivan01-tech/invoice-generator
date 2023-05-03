const { default: mongoose } = require("mongoose")

const InvoiceSchema = mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, },
    items: [{
        title: {
            type: String,
            require: true
        },
        hours: {
            type: Number,
            require: true
        },
        rate: {
            type: Number,
            require: true
        }
    }]
})

module.exports = mongoose.model("Invoice", InvoiceSchema)
