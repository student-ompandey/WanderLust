const User = require('../models/user');

module.exports.renderSignupForm = (req, res)=>{
    res.render("users/signup.ejs");
}

module.exports.signupUser = async(req, res, next)=>{
    try{
        let {username, email, password} = req.body;
        const newUser = new User({email, username});
        const registerUser = await User.register(newUser, password);
        req.flash("success", "Entity Created! Please INTIALIZE_LOGIN.");
        res.redirect("/login");
    } catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}

module.exports.renderLoginForm = (req, res)=>{
    res.render("users/login.ejs");
} 

module.exports.loginUser =  async (req, res) => {
    req.flash("success", "Welcome back to wanderLust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
  }


  module.exports.logoutUser = (req, res, next)=>{
    req.logout((err)=>{
        if(err){
           return next(err);
        }
        req.flash("success", "you are logged out now");
        res.redirect("/listings");
    })
}