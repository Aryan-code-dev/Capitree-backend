//schema for node model 
const mongoose = require('mongoose');


 const nodeSchema = new mongoose.Schema({
    nodeId: {
        type: String,
        required: true,
        unique:true,
    },
    label: {
        type: String,
        required: true
    },
    height: {
        type: Number,
        default: 10,
        required: true
    },
    width: {
        type: Number,
        default: 10,
        required: true
    },
    x: {
        type: Number,
        default: 10,
        required: true
    },
    y: {
        type: Number,
        default: 10,
        required: true
    },
    owner:{
        type: String,
        required: true,   
    },
    type:{
        type:String,
        required: true,
    },
    returnType:{
        type:String
    }
 });



const Node = mongoose.model('NODE', nodeSchema);

module.exports = Node ; 