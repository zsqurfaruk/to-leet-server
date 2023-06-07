const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const verifyToken = require("../middleWare/verifyToken");
const authorization = require("../middleWare/authorization");

router
  .route("/")
  .get(productController.getProducts)
  .post(verifyToken, productController.createProduct);
router.route("/filter").post(productController.filterPost);
router.route("/category/type").get(productController.getCategoryCount);
router
  .route("/update/available/:id")
  .patch(verifyToken, productController.updateProduct);
router.get("/user/email/:email", verifyToken, productController.getProfile);
router
  .route("/rentType/:rentType")
  .get(productController.getSpecificTypeProducts);

router
  .route("/:id")
  .get(verifyToken, productController.getProductDetails)
  .delete(productController.deleteProduct);
module.exports = router;
