const express = require("express");
const router = express.Router();
const MessagesController = require("../controllers/messagesController");
 

router.route("/").post(MessagesController.postNewMessages);
router.route("/").get(MessagesController.getNewMessages);
router.route("/allMessages").get(MessagesController.getAllMessages);
router.route("/:conversationId").get(MessagesController.getNewInboxUser);

module.exports = router;
