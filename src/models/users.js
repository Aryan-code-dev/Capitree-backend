//schema for user model 
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path')

 const userSchema = new mongoose.Schema({
    id:{
        type: Number,
        unique: true,
        autoIncrement: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
 });

 userSchema.methods.generateAuthToken = async function () {

    try {
        let token = jwt.sign(
            {
                name: this.username,
                email: this.email,
            },
            process.env.APP_SECRET,
            { expiresIn: "24h" }
        );
        return token;
    } catch (err) {
        console.log(err);
    }

}


userSchema.methods.validatePassword = async function (U_password) {
    try {
        return await bcrypt.compare(U_password, this.password);
    } catch (err) {
        console.log(err);
    }
}


const User = mongoose.model('USER', userSchema);

module.exports = User; 