const express = require('express')
const app = express()
const port = 3000
const connectDB = require('./src/db/connect')
const authRouter = require('./src/routes/auth')
const passportSetupGG = require('./src/config/passport-config')
const passportSetupFB = require('./src/config/facebook/passport-facebook')
const sessionCookie = require('cookie-session')
const passport = require('passport')
const profileRoute = require('./src/routes/profile')
require('dotenv').config()
app.use(express.json())

app.use(sessionCookie({
    maxAge:24*60*60*1000,
    keys:[process.env.COOKIE_KEY]
}))
app.use(passport.initialize())
app.use(passport.session())
app.set('views','./src/views')
app.set('view engine','ejs')

app.use('/auth',authRouter)
app.use('/profile',profileRoute)
const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port,console.log(`Server is running on port ${port}`))
    } catch (error) {
        console.log(error);
    }
}

app.get('/',(req,res) => {
    res.render('home')
})

start()


