//schema for user model 
const mongoose = require('mongoose')
//const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const path = require('path')

 const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
 });

 userSchema.methods.generateAuthToken = async function() {

    try{
        let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY , {expiresIn: '14h'});
        return token;
    }catch(err){
        console.log(err);
    }

}

const User = mongoose.model('USER', userSchema);

module.exports = User ; 