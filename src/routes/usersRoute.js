const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const verifyToken = require("../middleWare/verifyToken");

router
  .route("/signup")
  .get(usersController.signupGet)
  .post(usersController.signupPost);

router.route("/reset/email").post(usersController.resetPass);
router.route("/signIn").post(usersController.signInPost);
router.route("/update/:email").put(usersController.updateUser);
router
  .route("/:email")
  .delete(usersController.deleteUser);
router.post("/me", verifyToken, usersController.getMe);

module.exports = router;
