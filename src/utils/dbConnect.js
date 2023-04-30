const mongoose = require("mongoose");

function dbConnect () {
    mongoose.connect(process.env.DATABASE).then(() => {
      console.log("Database connected successfully");
    });
  };
  
  module.exports = dbConnect