const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
 
router
  .route("/")
  .get(productController.getProducts)
  .post(productController.createProduct);
router.route("/category").get(productController.getCategoryCount)
router.route("/filter").get(productController.filterPost);
router.get("/user/email/:email", productController.getProfile);
router
  .route("/rentType/:rentType")
  .get(productController.getSpecificTypeProducts);

router
  .route("/:id")
  .get(productController.getProductDetails)
  .delete(productController.deleteProduct);
module.exports = router;
