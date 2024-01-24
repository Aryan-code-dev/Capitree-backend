//schema for edge model 
const mongoose = require('mongoose')
//const bcrypt = require('bcryptjs');


 const edgeSchema = new mongoose.Schema({
    edgeId: {
        type: String,
        required: true,
        unique: true
    },
    label: {
        type: String,
        required: true
    },
    source: {
        type: String,
        required: true
    },
    target: {
        type: String,
        required: true
    },
    owner:{
        type: String,
        required: true,
    },
    type:{
        type:String,
        required: true,
    }
 });



const Edge = mongoose.model('EDGE', edgeSchema);

module.exports = Edge ; 