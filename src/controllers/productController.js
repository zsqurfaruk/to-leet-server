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
    res.send({
      message: "Something went wrong!",
    });
  }
};

exports.filterPost = async (req, res) => {
  try {
    // const products = await Product.where("name").equals(/\w/); {same name ar sob pabe }
    const city = req.query.cityName;
    const area = req.query.homePopularAreaName;
    const type = req.query.filterModalValue;
    const districts = req.query.districtsName;
    const division = req.query.divisionNameEng;
    const university = req.query.openModalValue;
    const filter = req.query.filterValue;
    const posts = await Product.find({
      cityName: city,
      areaName: area,
      type: type,
      districts: districts,
      division: division,
    }).sort({ _id: -1 });

    console.log(filter);
    console.log(req.query);
    // console.log( req.params );
    res.status(200).json({
      message: "success",
      posts: posts,
    });
  } catch (error) {
    res.status(400).send("Failed request");
  }
};
exports.getSpecificTypeProducts = async (req, res) => {
  try {
    // const products = await Product.where("name").equals(/\w/); {same name ar sob pabe }
    const rentType = req.params?.rentType;
    const productType = await Product.find({ "type.eng": rentType }).sort({
      _id: -1,
    });
    res.send(productType);
  } catch (error) {
    res.status(400).send("Failed request");
  }
};
exports.getProfile = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await Product.find({ email: email });
    res.send(user);
  } catch (error) {
    res.status(400).send("No user found");
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
