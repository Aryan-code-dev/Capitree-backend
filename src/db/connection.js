// require("dotenv").config();

// const mongoose = require("mongoose");
// const DB_NAME = process.env.DB_NAME;



// mongoose.connect(`mongodb://localhost:27017/${DB_NAME}`
// ).then(() => console.log("Mongo DB Connected")
// ).catch((err) => console.log("Mongo DB Error:", err));

require("dotenv").config();

const mongoose = require("mongoose");
const password = process.env.password;
const uname = process.env.uname



const con_string = 'mongodb+srv://'+uname+':'+password+'@cluster0.dnwerzh.mongodb.net/capitree?retryWrites=true&w=majority';

mongoose.connect(con_string);