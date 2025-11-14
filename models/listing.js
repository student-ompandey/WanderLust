const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Listing Schema
const listingSchema = new Schema({
    title: {
        type: String,
        // required: true,  
    },
    description: {
        type: String,
    },
    image: {
        filename: {
            type: String,
            default: "listingimage",
        },
        url: {
            type: String,
            default: "https://unsplash.com/photos/two-chairs-sitting-in-front-of-a-swimming-pool-k_My4rXk4Lc",
        },
    },
    price: {
        type: Number,
        // required: true,
    },
    location: {
        type: String,
    },
    country: {
        type: String,
    },
});

// Create and export model
const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;
