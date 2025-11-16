const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js")
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema, reviewSchema} = require("../Schema.js");
const Listing = require('../models/listing');


const validateListing = (req, res, next)=>{
     let {error} = listingSchema.validate(req.body);
   if(error){
    let errMsg = error.details.map((el)=>  el.message).join(",");
    throw new ExpressError(400, errMsg);
   } else {
    next();
   }
}

//index route to display all listings
router.get('/', async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", {allListings});
});

// New listing form route
router.get('/new', (req, res) => {
    res.render("listings/new");
});

//show route to display a specific listing by ID
router.get('/:id',wrapAsync( async (req, res) => {
    const {id} = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    if(!listing){
         req.flash("error", "Listing you requested from does not exist!");
         res.redirect("/listings");
    }
    res.render("listings/show", {listing});
}));

//Create listing route
router.post('/',validateListing, wrapAsync(async (req, res, next) => {
  
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    req.flash("success", "New listing created!");
    res.redirect("/listings");
}));

// Edit listing form route
router.get('/:id/edit',wrapAsync ( async (req, res) => {
    const {id} = req.params;
    const listing = await Listing.findById(id);
      if(!listing){
         req.flash("error", "Listing you requested from does not exist!");
         res.redirect("/listings");
    }
    res.render("listings/edit", {listing});
}));

// Update listing route
router.put('/:id',validateListing, wrapAsync( async (req, res) => {
        if(!res.body.Listing){
        throw new ExpressError(400, "Send the valid data for the listing")
    }
    const {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
     req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
}));

// Delete listing route
router.delete('/:id',wrapAsync( async (req, res) => {
    const {id} = req.params;
    await Listing.findByIdAndDelete(id);
     req.flash("success", "Listing deleted!");  
    res.redirect('/listings');
}));

module.exports = router;