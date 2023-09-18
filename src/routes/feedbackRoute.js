const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedbackController");
// const verifyToken = require("../middleWare/verifyToken");
// const authorization = require("../middleWare/authorization");

router
  .route("/")
  .get(feedbackController.getFeedback)
  .post(feedbackController.createFeedback);
  router.route("/:id")
  .delete(feedbackController.deleteFeedback);
module.exports = router;
