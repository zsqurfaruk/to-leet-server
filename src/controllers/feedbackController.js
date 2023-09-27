
const { encryptFunction } = require("../Encryption/encryption");
const Feedback = require("../models/Feedback");
// const { generateToken } = require("../utils/token");
 

exports.getFeedback = async (req, res) => {
  try {
    const getFeeds = await Feedback.find({});
    const feedbacks = encryptFunction(JSON.stringify(getFeeds));
      res.status(200).json({
        message: "success",
        feedbacks,
      });
  } catch (error) {
    res.send("Internal server error");
  }
};
exports.createFeedback = async (req, res) => {
    try {
      const postFeedback = new Feedback(req.body);
      const result = await postFeedback.save();
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
  exports.deleteFeedback = async (req, res) => {
    try {
      const id = req.params.id;
      const deleteFeedback = await Feedback.deleteOne({ _id: id});
      res.status(200).json({
        message: "success",
      });
    } catch (error) {
      res.send("Internal server error");
    }
  };