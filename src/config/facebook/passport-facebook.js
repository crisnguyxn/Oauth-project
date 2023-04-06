const passport = require('passport')
const FacebookStrategy = require('passport-facebook')
const keys = require('./keyFB.json')

passport.use(
    new FacebookStrategy({
        clientID:keys.web.FACEBOOK_APP_ID,
        clientSecret:keys.web.FACEBOOK_APP_SECRET,
        callbackURL:keys.web.CALLBACK_URL
    },(accessToken,refreshToken,profile,done) => {
        console.log(profile);
    })
)