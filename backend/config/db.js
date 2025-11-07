const mongoose = require("mongoose");

const connectDB = async () =>{
    await mongoose.connect("mongodb+srv://nadiarajpoot44:Q6EE9Z6UNufW7KiB@cluster0.ryqfdxz.mongodb.net/ecommerceDB")
}

module.exports = connectDB;
