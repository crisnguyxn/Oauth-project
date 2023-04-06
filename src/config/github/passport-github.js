const passport = require('passport')
const GihubStrategy = require('passport-github')
const keys = require('./keyGH.json')
const User =  require('../../models/user')
const user = require('../../models/user')


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
    new GihubStrategy({
        clientID: keys.web.clientID,
        clientSecret:keys.web.clientSecret,
        callbackURL:keys.web.callbackURL
    },async(accessToken,refreshToken,profile,done) => {
        const currentUser = await User.findOne({userId:profile.id})
        if(!currentUser){
            const newUser = await User.create({username:profile.username,userId:profile.id})
            done(null,newUser)
        }else{
            done(null,currentUser)
        }
    })
)