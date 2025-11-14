const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ejs = require('ejs')
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
// const helmet = require("helmet");

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
// app.use(helmet());

// app.use(
//   helmet.contentSecurityPolicy({
//     useDefaults: true,
//     directives: {
//       "connect-src": ["'self'", "http://localhost:8080", "http://127.0.0.1:8080"],
//     },
//   })
// );



main().then (()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log("Error connecting to MongoDB:", err);
});




app.get('/', (req, res) => {
    res.send('Hello ');
});

//index route to display all listings
app.get('/listings', async (req, res) => {
    const allListings =  await Listing.find({});
    res.render("listings/index", {allListings});
});


// New listing form route
app.get('/listings/new', (req, res) => {
    res.render("listings/new");
});

//show route to display a specific listing by ID
app.get('/listings/:id', async (req, res) => {
    const {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show", {listing});
});


//Create listing route
app.post('/listings', async (req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
});

// Edit listing form route
app.get('/listings/:id/edit', async (req, res) => {
    const {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit", {listing});
});


// Update listing route
app.put('/listings/:id', async (req, res) => {
    const {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/{id}`);       
});


// Delete listing route
app.delete('/listings/:id', async (req, res) => {
    const {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect('/listings');
});



// app.get('/testListings', async (req, res) => {
//     let sampleListings = new Listing({
//         title: "Sample Listing",
//         description: "This is a sample listing description.",
//         image: "",
//         price: 100,
//         location: "Sample Location",
//         country: "Sample Country"
//     });
//     await sampleListings.save();
//     console.log("sample was saved");
//     res.send('Sample listing created and saved to the database.');
// });

app.listen(8000, () => {
    console.log('Server is running on port 8080');
});