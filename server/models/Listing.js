const mongoose = require('mongoose');

const { Schema } = mongoose;

const listingSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    price: {
        type: Number,
        required: true,
        min: 0.99
    },
    quantity: {
        type: Number,
        min: 1,
        default: 1
    },
    //Possiblity to implements a timed listing
    listingTime: {
        type: Date
    }
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;