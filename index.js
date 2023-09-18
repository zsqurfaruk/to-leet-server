const express = require("express");
const app = express();
const cors = require("cors");
const dbConnect = require("./src/utils/dbConnect");
const productRoute = require("./src/routes/productRoute");
const usersRoute = require("./src/routes/usersRoute");
const feedbackRoute = require("./src/routes/feedbackRoute");
const port = process.env.PORT || 5000;
require("dotenv").config();

app.use(cors());
app.use(express.json());
dbConnect();

app.use("/api/v1/product", productRoute);
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/feedback", feedbackRoute);

app.get("/", (req, res) => {
  res.send("QuickVara start");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
