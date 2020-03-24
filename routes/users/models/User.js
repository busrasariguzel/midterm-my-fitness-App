const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs')


const userSchema = new mongoose.Schema({
    email:{type:String, unique:true, lowercase: true, required: true, trim: true},
    password: {type:String, required: true, trim: true},
    profile: {
        name:{type:String, default:''},
        picture:{type:String, default:''},

    },
    address: {type:String, default:'(Please update Address)'}
});


module.exports=mongoose.model('User', userSchema)