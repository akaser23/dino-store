const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
    purchaseDate: {
        type: Date,
        default: Date.now
    },
    listings: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Listing'
        }
    ]
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;