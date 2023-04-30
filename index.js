const express = require("express");
const app = express();
const cors = require("cors");
const dbConnect = require("./src/utils/dbConnect");
const productRoute = require("./src/routes/productRoute");
const port = process.env.PORT || 5000;
require("dotenv").config();


app.use(cors());
app.use(express.json());
dbConnect()

app.use("/api/v1/product", productRoute);

app.get("/", (req, res) => {
  res.send("To leet start");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
