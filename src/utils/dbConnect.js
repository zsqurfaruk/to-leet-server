const mongoose = require("mongoose");

function dbConnect() {
  mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((error) => {
      console.error("Error connecting to database:");
    });
}

module.exports = dbConnect;
