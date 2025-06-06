const passport = require('passport');
const GoggleStrtegy= require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const clientID=process.env.GOOGLE_CLIENT_ID
const clientSecret = process.env.GOOGLE_CLIENT_SECRETE 
passport.use(new GoggleStrtegy({clientID,clientSecret, callbackURL: '/auth/google/callback'},

    async(accessToken, refreshToken, profile, done)=>{
        try{

            let user = await User.findOne({googleId:profile.id});
            if(!user){
                user = await User.create({
                    googleId: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    photo:profile.photos[0].value

                });
            }
            return done(null,user);
        }catch(err){return done(err, null)}
    }
))