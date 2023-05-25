const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router
  .route("/")
  .get(productController.getProducts)
  .post(productController.createProduct);
router.route("/filter").post(productController.filterPost);
router.route("/category/type").get(productController.getCategoryCount);
router.get("/user/email/:email", productController.getProfile);
router
  .route("/rentType/:rentType")
  .get(productController.getSpecificTypeProducts);

router
  .route("/:id")
  .get(productController.getProductDetails)
  .delete(productController.deleteProduct);
module.exports = router;
