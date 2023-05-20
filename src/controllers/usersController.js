const User = require("../models/Users");
const { generateToken } = require("../utils/token");
const bcrypt = require("bcryptjs");

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
    res.status(400).send("User Request Failed");
  }
};

exports.resetPass = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        status: "failed",
        error: {
          eng: "No user found.",
          ban: "কোন ইউজার পাওয়া যায় নাই।",
        },
      });
    }
    const pass = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    if (confirmPassword !== pass) {
      return res.json({
        status: "failed",
        error: {
          eng: "Password matching error.",
          ban: "পাসওয়ার্ডে ত্রুটি আছে.",
        },
      });
    }
    const password = securePass(pass);
   

    const result = await User.updateOne(
      { email },
      { $set: { password: password } }
    );

    res.status(200).json({
      status: "success",
      message: "password update successful.",
    });
  } catch (error) {
    res.send("Password can not changed");
  }
};
exports.signInPost = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.send({
        status: "failed",
        error: {
          eng: "Please provide your email and password.",
          ban: "আপনার ইমেল এবং পাসওয়ার্ড প্রদান করুন.",
        },
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        status: "failed",
        error: {
          eng: "No user found.",
          ban: "কোন ইউজার পাওয়া যায় নাই।",
        },
      });
    }
    const isPasswordValid = user.comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.json({
        status: "failed",
        error: {
          eng: "Email or Password is not correct.",
          ban: "ইমেইল অথবা পাসওয়ার্ড ভুল দিয়েছেন।",
        },
      });
    }

    if (user.status !== "active") {
      return res.json({
        status: "failed",
        error: {
          eng: "Your account is not active, please contact admin.",
          ban: "আপনার অ্যাকাউন্তটি অ্যাক্টিভ করতে এডমিনের সাথে যোগাযোগ করুন।",
        },
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
    res.send("User sign in Request Failed");
  }
};

exports.getMe = async (req, res) => {
  try {
    const email = req.user?.email;
    const user = await User.findOne({ email });
    const { password: pwd, ...others } = user.toObject();
    const newUser = others;
    // res.status(200).json({
    //   status: "success",
    //   data: newUser,
    // });
    res.send(newUser);
  } catch (error) {
    res.status(400).send("User not found, Please log in first");
  }
};

// const forgetPass = async (password) => {
//   try {
//     const passHash = await bcrypt.hashSync(password);
//     return passHash;
//   } catch (error) {
//     console.log("User not found, Please log in first");
//   }
// };

function securePass(password) {
  try {
    const hashPassword = bcrypt.hashSync(password);
    return hashPassword;
  } catch (error) {
    console.log("User not found, Please log in first");
  }
}
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
