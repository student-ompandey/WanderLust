const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ejs = require('ejs')
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const wrapAsync = require("./utils/wrapAsync.js")
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema} = require("./Schema.js");

const Listing = require('./models/listing');

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main(){
    await mongoose.connect(MONGO_URL);
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

main().then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error connecting to MongoDB:", err);
});

app.get('/', (req, res) => {
    res.send('Hello ');
});

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
app.get('/listings', async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", {allListings});
});

// New listing form route
app.get('/listings/new', (req, res) => {
    res.render("listings/new");
});

//show route to display a specific listing by ID
app.get('/listings/:id',wrapAsync( async (req, res) => {
    const {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show", {listing});
}));

//Create listing route
app.post('/listings',validateListing, wrapAsync(async (req, res, next) => {
  
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
}));

// Edit listing form route
app.get('/listings/:id/edit',wrapAsync ( async (req, res) => {
    const {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit", {listing});
}));

// Update listing route
app.put('/listings/:id',validateListing, wrapAsync( async (req, res) => {
        if(!res.body.Listing){
        throw new ExpressError(400, "Send the valid data for the listing")
    }
    const {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
}));

// Delete listing route
app.delete('/listings/:id',wrapAsync( async (req, res) => {
    const {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect('/listings');
}));

// 404 handler (FIXED)
app.use((req, res, next) => {
    next(new ExpressError(404, "Page not Found"));
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    res.status(statusCode).render("error.ejs", { err });
});

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});
