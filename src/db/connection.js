require("dotenv").config();

const mongoose = require("mongoose");
const DB_NAME = process.env.DB_NAME;



mongoose.connect(`mongodb://localhost:27017/${DB_NAME}`
).then(() => console.log("Mongo DB Connected")
).catch((err) => console.log("Mongo DB Error:", err));

