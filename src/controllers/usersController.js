const User = require("../models/Users");
const { generateToken } = require("../utils/token");

exports.signupGet = async (req, res) => {
  try {
    const users = await User.find({}).sort({ _id: -1 });
    // const { password: pwd, ...others } = users[0].toObject();
    res.status(200).json({
      status: "success",
      data: users,
    });
  } catch (error) {
    res.status(400).send("Failed request");
  }
};
exports.signupPost = async (req, res) => {
  try {
    const user = new User(req.body);
    const result = await user.save();
    res.status(200).send(result);
  } catch (error) {
    res.send("User Request Failed");
  }
};

exports.signInPost = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.send({
        status: "failed",
        error: "Please provide your email and password.",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        status: "failed",
        error: "No user found.",
      });
    }
    const isPasswordValid = user.comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.json({
        status: "failed",
        error: "Email or Password is not correct.",
      });
    }

    if (user.status !== "active") {
      return res.json({
        status: "failed",
        error: "Your account is not active, please contact admin.",
      });
    }
    const token = generateToken(user);
    // if(token){
    //   localStorage.setItem("token", token)
    // }

    const { password: pwd, ...others } = user.toObject();

    // const result = await user.save();
    res.status(200).json({
      status: "success",
      message: "Successfully Logged In",
      data: {
        user: others,
        token,
      },
    });
  } catch (error) {
    res.status(400).send("User sign in Request Failed");
  }
};

exports.getMe = async (req, res) => {
  try {
    const email = req.user?.email;
    const user = await User.findOne({ email });
    const { password: pwd, ...others } = user.toObject();
    const newUser = others
    // res.status(200).json({
    //   status: "success",
    //   data: newUser,
    // });
    res.send(newUser)
  } catch (error) {
    res.status(400).send("User not found, Please log in first");
  }
};
// exports.logout = async (req, res) => {
//   try {
//     // clear the user's session and/or token
//     req.session.destroy(); // example for session-based authentication
//     // or req.user.token = null; // example for token-based authentication

//     // update the user's status to logged out in the database
//     const updatedUser = await User.findByIdAndUpdate(
//       req.user._id,
//       { isLoggedIn: false },
//       { new: true }
//     );
//     res.status(200).send("Successfully logged out");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error logging out");
//   }
// };
