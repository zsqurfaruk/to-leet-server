const Product = require("../models/Products");

exports.getProducts = async (req, res) => {
  try {
    // const products = await Product.where("name").equals(/\w/); {same name ar sob pabe }
    const products = await Product.find({}).sort({ _id: -1 });
    const projection = products.map(
      ({
        _id,
        bedrooms,
        bathrooms,
        bedNumber,
        totalBed,
        title,
        description,
        cityName,
        areaName,
        districts,
        division,
        type,
        amount,
        negotiable,
        img1,
        updatedAt,
        available,
        university,
      }) => ({
        _id,
        bedrooms,
        bathrooms,
        bedNumber,
        totalBed,
        title,
        description,
        cityName,
        areaName,
        districts,
        division,
        type,
        amount,
        negotiable,
        img1,
        updatedAt,
        available,
        university,
      })
    );
    res.send(projection);
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
      result,
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
    const projection = posts.map(
      ({
        _id,
        bedrooms,
        bathrooms,
        bedNumber,
        totalBed,
        title,
        description,
        cityName,
        areaName,
        districts,
        division,
        type,
        amount,
        negotiable,
        img1,
        updatedAt,
        available,
        university,
      }) => ({
        _id,
        bedrooms,
        bathrooms,
        bedNumber,
        totalBed,
        title,
        description,
        cityName,
        areaName,
        districts,
        division,
        type,
        amount,
        negotiable,
        img1,
        updatedAt,
        available,
        university,
      })
    );

    res.status(200).json({
      message: "success",
      posts: projection,
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
    const projection = productType.map(
      ({
        _id,
        bedrooms,
        bathrooms,
        bedNumber,
        totalBed,
        title,
        description,
        cityName,
        areaName,
        districts,
        division,
        type,
        amount,
        negotiable,
        img1,
        updatedAt,
        available,
        university,
      }) => ({
        _id,
        bedrooms,
        bathrooms,
        bedNumber,
        totalBed,
        title,
        description,
        cityName,
        areaName,
        districts,
        division,
        type,
        amount,
        negotiable,
        img1,
        updatedAt,
        available,
        university,
      })
    );

    res.send(projection);
  } catch (error) {
    res.send("Failed request");
  }
};
exports.getProfile = async (req, res) => {
  try {
    const auth = req.params.email;
    const phoneNumber = Number(auth); 
    let user;

    if (!isNaN(phoneNumber)) {
      user = await Product.find(
        { $or: [{ email: auth }, { phone: phoneNumber }] },
        { email: 0, _id: 0 }
      ).sort({ _id: -1 });
    } else {
      user = await Product.find({ email: auth }, { email: 0, _id: 0 }).sort({
        _id: -1,
      });
    }

    res.send(user);
  } catch (error) {
    res.send("No data found");
  }
};

exports.getProductDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const productDetails = await Product.findOne({ _id: id });
    const { _id, name, email, ...others } = productDetails.toObject();
    res.send(others);
  } catch (error) {
    res.send("Failed request");
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const updateProduct = await Product.updateOne(
      { _id: id },
      { $set: { available: true } },
      { runValidators: true }
    );
    res.status(200).json({
      message: "success",
    });
  } catch (error) {
    res.send("Internal server error");
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
    res.send("Internal server error");
  }
};

exports.getCategoryCount = async (req, res) => {
  try {
    const countProduct = await Product.aggregate([
      {
        $group: {
          _id: "$type",
          count: {
            $count: {},
          },
        },
      },
      {
        $project: {
          _id: 0,
          type: "$_id",
          count: 1,
        },
      },
    ]);
    res.status(200).json({
      message: "success",
      countProduct,
    });
  } catch (error) {
    res.send("Internal server error");
  }
};
