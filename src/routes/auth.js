const express = require('express')
const passport = require('passport')
const router = express.Router()

router.get('/login',(req,res) => {
    res.render('login.ejs')
})

router.get('/logout',(req,res) => {
    req.logOut()
    res.send('logout successfully')
})

router.get('/google',passport.authenticate('google',{
    scope:['profile']
}))

router.get('/facebook',passport.authenticate('facebook',{
    scope:['profile']
}))

router.get('/facebook/redirect',passport.authenticate('facebook'),(req,res) => {
    console.log('check');
})

router.get('/google/redirect',passport.authenticate('google'),(req,res) => {
    res.redirect('/profile')
})

module.exports = router