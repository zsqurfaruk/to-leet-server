const Product = require("../models/Products");

exports.getProducts = async (req, res) => {
  try {
    // const products = await Product.where("name").equals(/\w/); {same name ar sob pabe }
    const products = await Product.find({}).sort({ _id: -1 });
    res.send(products);
  } catch (error) {
    res.status(400).send("Failed request");
  }
};
exports.getSpecificTypeProducts = async (req, res) => {
  try {
    // const products = await Product.where("name").equals(/\w/); {same name ar sob pabe }
    const rentType = req.params.rentType;
    const productType = await Product.find({ rentType: rentType }).sort({
      _id: -1,
    });
    res.send(productType);
  } catch (error) {
    res.status(400).send("Failed request");
  }
};

exports.createProduct = async (req, res) => {
  try {
    //  create method
    // const result = Product.create(req.body)
    // save method
    const postProduct = new Product(req.body);
    // akhane chaile j kono condition dewya jabe
    const result = await postProduct.save();
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send("Failed request");
  }
};

exports.getProductDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const productDetails = await Product.findOne({ _id: id });
    res.send(productDetails);
  } catch (error) {
    res.status(400).send("Failed request");
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteProduct = await Product.deleteOne({ _id: id });
    res.status(200).json({
      message: "success",
    });
  } catch (error) {
    console.log(error);
  }
};
