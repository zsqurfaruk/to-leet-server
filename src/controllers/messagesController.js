
 
const { encryptFunction } = require("../Encryption/encryption");
const Messages = require("../models/Messages");
// const { generateToken } = require("../utils/token");
 

exports.getNewMessages = async (req, res) => {
  try {
    const { receiverEmail, senderEmail } = req.query;

    // Define a filter object using the $or operator for the two conditions
    const filter = {
      $or: [
        {
          senderEmail: senderEmail,
          receiverEmail: receiverEmail,
        },
        {
          senderEmail: receiverEmail,
          receiverEmail: senderEmail,
        },
      ],
      // conversationId: req.params.conversationId,
    };

    // Use the filter in the MongoDB find query
    const messages = await Messages.find(filter);
    const encryptedData = encryptFunction(JSON.stringify(messages)); 
    res.status(200).json(encryptedData);
  } catch (error) {
    res.send("Internal server error");
  }
};
exports.getNewInboxUser = async (req, res) => {
  try {
     const messages = await Messages.find({
        conversationId:req.params.conversationId
     })
     res.status(200).json(messages)
  } catch (error) {
    res.send("Internal server error");
  }
};
exports.getAllMessages = async (req, res) => {
  try {
     const allMessages = await Messages.find({})
     res.status(200).json(allMessages)
  } catch (error) {
    res.send("Internal server error");
  }
};

exports.postNewMessages = async (req, res) => {
  try {
     const newMessages= new Messages(req.body)
     const savedMessages=await newMessages.save()
     res.status(200).json(savedMessages)
  } catch (error) {
    res.send("Internal server error");
  }
};
 
  