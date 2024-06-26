const { encryptFunction } = require("../Encryption/encryption");
const Product = require("../models/Products");

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ _id: -1 });
    const projection = products.map(
      ({
        _id,
        bedrooms,
        bathrooms,
        bedNumber,
        totalBed,
        title,
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
    const encryptedData = encryptFunction(JSON.stringify(projection)); // Convert to JSON string before encrypting

    res.send(encryptedData);
  } catch (error) {
    res.send("Failed request");
  }
};

exports.createProduct = async (req, res) => {
  try {
    const postProduct = new Product(req.body);
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
    const limit = req.query.limit
    const  city  = req.body.cityName;
    const area = req.body.homePopularAreaName;
    const filterType = req.body.filterModalValue;
    const districts = req.body.districtsName;
    const division = req.body.divisionNameEng;
   
    let posts;
    if (limit) {
      posts = await Product.find({
        cityName: city,
        areaName: area,
        type: filterType,
        districts: districts,
        division: division,
      })
        .sort({ _id: -1 })
        .limit(Number(limit));  
    } else {
      posts = await Product.find({
        $or: [
          {
            $or: [
              { "cityName.eng": city.eng },
              { "division.eng": city.eng },
            ],
            $or: [
              { "areaName.eng": area.eng },
              { "districts.eng": area.eng },
            ],
            "type.eng": filterType.eng,
          },
        ],
      }).sort({ _id: -1 });
    }
    
    const projection = posts.map(
      ({
        _id,
        bedrooms,
        bathrooms,
        bedNumber,
        totalBed,
        title,
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
    const encryptedData = encryptFunction(JSON.stringify(projection)); 
    res.status(200).json({
      message: "success",
      posts: encryptedData,
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
    const encryptedData = encryptFunction(JSON.stringify(projection)); 
    res.send(encryptedData);
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
        { email: 0, firstName: 0, lastName: 0 }
      ).sort({ _id: -1 });
    } else {
      user = await Product.find(
        { email: auth },
        { email: 0, firstName: 0, lastName: 0 }
      ).sort({
        _id: -1,
      });
    }
    const encryptedUserData = encryptFunction(JSON.stringify(user));
    res.send(encryptedUserData);
  } catch (error) {
    res.send("No data found");
  }
};

exports.getProductDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const productDetails = await Product.findOne({ _id: id });
    const {...others } = productDetails.toObject();
    const encryptedData = encryptFunction(JSON.stringify(others));
    res.send(encryptedData);
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
