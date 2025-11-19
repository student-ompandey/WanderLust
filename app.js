    if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
    }


    const express = require('express');
    const app = express();
    const mongoose = require('mongoose');
    const path = require('path');
    const methodOverride = require('method-override');
    const ejsMate = require('ejs-mate');
    const ExpressError = require("./utils/ExpressError.js");
    const session = require('express-session');
    const MongoStore = require('connect-mongo');
    const flash = require('connect-flash');
    const passport = require('passport');
    const LocalStrategy = require('passport-local');
    const User = require("./models/user.js");

    const listingsRouter = require("./routes/listing.js");
    const reviewsRouter = require("./routes/review.js")
    const userRouter = require("./routes/user.js")

    const dbUrl = process.env.ATLASDB_URL;
    const SECRET = "MY-SUPER-SECURE-SECRET-KEY";

    async function main(){
        await mongoose.connect(dbUrl);
    }

    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));
    app.use(express.urlencoded({extended:true}));
    app.use(methodOverride("_method"));
    app.engine('ejs', ejsMate);
    app.use(express.static(path.join(__dirname, "/public")));

    // const store = MongoStore.create({
    //     mongoUrl:dbUrl,
    //     crypto:{
    //         secret: SECRET
    //     },
    //     touchAfter: 24*3600,
    // })

    // store.on("error", (err) => {
    //     console.error("Fatal Error in MONGO SESSION STORE:", err);
    //     // 🚨 महत्वपूर्ण: यदि सत्र स्टोर विफल हो जाता है, तो सर्वर को बंद करें
    //     // process.exit(1); 
    // });

    const sessionOptions = {
        // store:store,
        secret: SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            expires: Date.now() + 7 * 24 * 60 *60* 1000,
            maxAge: 7 * 24 * 60 *60* 1000,
            httpOnly: true,
        }
    };



    main().then(() => {
        console.log("Connected to MongoDB");
    }).catch((err) => {
        console.log("Error connecting to MongoDB:", err);
    });


    app.use(session(sessionOptions));
    app.use(flash());


    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy(User.authenticate()));

    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());


    app.use((req, res, next)=>{
        res.locals.success = req.flash("success");
        res.locals.error = req.flash("error");
        res.locals.currUser = req.user;
        next();
    })




    app.use("/listings", listingsRouter);
    app.use("/listings/:id/reviews", reviewsRouter);
    app.use("/", userRouter);


    app.use((req, res, next) => {
        next(new ExpressError(404, "Page not Found"));
    });

    app.use((err, req, res, next) => {
        let { statusCode = 500, message = "Something went wrong!" } = err; 
        if (statusCode === 500 && !err.stack) {
            message = "Internal Server Error";
        }
        
        res.status(statusCode).render("error.ejs", { err }); 
    });

    app.listen(8000, () => {
        console.log('Server is running on port 8000');
    });