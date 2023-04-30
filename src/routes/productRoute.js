const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
// const multer = require("multer");
// const uploader = multer({ dest: "image/"})

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "image/");
//   },
//   filename: function (req, file, cb) {
//     const name = Date.now() + "-" + file.originalname;
//     console.log(name);
//     cb(null, name);
//   },
// });

// const upload = multer({ storage: storage });

// router.post("/",)
// router.post("/imageUpload",, productController.photoUpload)
// router.get("/photoUpload", productController.photoUpload)
router
  .route("/")
  .get(productController.getProducts)
  .post(productController.createProduct);

router.route("/rentType/:rentType").get(productController.getSpecificTypeProducts);

router
  .route("/:id")
  .get(productController.getProductDetails)
  .delete(productController.deleteProduct);
module.exports = router;
