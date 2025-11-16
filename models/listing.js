const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require("./review.js")

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
    reviews:[
        {
         type: Schema.Types.ObjectId,
         ref:"Review" ,  

        }
    ]
});

listingSchema.post("findOneAndDelete", async(listing)=>{
    if(listing){
        await Review.deleteMany({_id : {$in: listing.reviews}});
    }
    
})

// Create and export model
const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;
