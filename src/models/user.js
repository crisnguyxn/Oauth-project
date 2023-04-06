const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    username:String,
    googleId:String,
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model('User',UserSchema)