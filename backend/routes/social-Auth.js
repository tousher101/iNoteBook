const express=require('express');
const passport = require('passport');
const router = express.Router();
const JWT_SECRET = process.env.MY_SUPER_SCECRET_CODE;
const jwt = require('jsonwebtoken');


router.get('/google',passport.authenticate('google',{scope:['profile','email']}));



router.get('/google/callback',passport.authenticate('google',{session:false}),(req,res)=>{
const token = jwt.sign({id:req.user._id, JWT_SECRET, expiresIn:'1d'});
    
res.redirect(`https://inotebook24.netlify.app?token=${token}`)
});





module.exports=router