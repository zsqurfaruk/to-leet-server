const Product = require("../models/Products");

exports.getProducts = async (req, res) => {
  try {
    // const products = await Product.where("name").equals(/\w/); {same name ar sob pabe }
    const products = await Product.find({}).sort({ _id: -1 });
    res.send(products);
  } catch (error) {
    res.send("Failed request");
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
    res.status(200).json({
      message: "success",
      result
    });
  } catch (error) {
    res.send({
      error: "Something went wrong!",
    });
  }
};


exports.filterPost = async (req, res) => {
  try {
    // const products = await Product.where("name").equals(/\w/); {same name ar sob pabe }
    const city = req.body.cityName;
    const area = req.body.homePopularAreaName;
    const type = req.body.filterModalValue;
    const districts = req.body.districtsName;
    const division = req.body.divisionNameEng;
    const posts = await Product.find({
      cityName: city,
      areaName: area,
      type: type,
      districts: districts,
      division: division,
    }).sort({ _id: -1 });

    // console.log(city);
    // console.log(req.body);
    // console.log( req.params );
    res.status(200).json({
      message: "success",
      posts: posts,
    });
  } catch (error) {
    res.send("Failed request");
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
    res.send("Failed request");
  }
};
exports.getProfile = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await Product.find({ email: email });
    res.send(user);
  } catch (error) {
    res.send("No user found");
  }
};

exports.getProductDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const productDetails = await Product.findOne({ _id: id });
    res.send(productDetails);
  } catch (error) {
    res.send("Failed request");
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
    res.send(error);
  }
};


exports.getCategoryCount = async (req, res)=>{
  try {
 
    const countProduct = await Product.aggregate([
      {
        $group:{
           _id: "$type",
           count:{
            $count:{}
           }
        }
      },
      {
       $project:{
        _id:0,
        type:"$_id",
        count:1
       }
      }
    ]);
    res.status(200).json({
      message: "success",
      countProduct
    });
  } catch (error) {
    res.send("error");
  }
}
