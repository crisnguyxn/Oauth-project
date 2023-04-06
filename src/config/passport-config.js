const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const keys = require('./keys.json')
const User = require('../models/user')

passport.serializeUser((user,done) => {
    done(null,user.id)
})

passport.deserializeUser((id,done) => {
    User.findById(id)
        .then(user => {
            done(null,user)
        })
        .catch(err => {
            console.log(err);
        })
})


passport.use(
    new GoogleStrategy({
        callbackURL:keys.web.redirect_uris[0],
        clientID:keys.web.client_id,
        clientSecret:keys.web.client_secret
    },async(accessToken,refreshToken,profile,done) => {
        const currentUser = await User.findOne({googleId:profile.id})
        if(!currentUser){
            const user = await User.create({username:profile.displayName,googleId:profile.id})
            done(null,user)
        }else{
            done(null,currentUser)
        }
    })
)