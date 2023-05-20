const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const verifyToken = require("../middleWare/verifyToken");

router
  .route("/signup")
  .get(usersController.signupGet)
  .post(usersController.signupPost)
  .put(usersController.signupPost);
router.route("/reset/email").post(usersController.resetPass)
router.route("/signIn").post(usersController.signInPost);
router.post("/me", verifyToken, usersController.getMe);
// router.post("/logout", usersController.logout)

module.exports = router;
