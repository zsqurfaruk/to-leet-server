const User = require("../models/Users");
const { generateToken } = require("../utils/token");
const bcrypt = require("bcryptjs");

exports.signupGet = async (req, res) => {
  try {
    const getUsers = await User.find({});
    const projection = getUsers.map(({ ToLeet }) => ({ ToLeet }));
    res.send(projection);
  } catch (error) {
    res.send("Internal server error");
  }
};
exports.signupPost = async (req, res) => {
  try {
    const user = new User(req.body);
    const result = await user.save();
    res.status(200).send(result);
  } catch (error) {
    res.send({
      message: "Internal server error",
    });
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
          eng: "Please provide your  mobile number or email  and password.",
          ban: "আপনার মোবাইল নাম্বার বা ইমেল এবং পাসওয়ার্ড প্রদান করুন.",
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
          eng: "Mobile number or Email or Password is not correct.",
          ban: "ইমেইল বা মোবাইল নাম্বার অথবা পাসওয়ার্ড ভুল দিয়েছেন।",
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
    const {
      password: pwd,
      ToLeet,
      updatedAt,
      createdAt,
      agree,
      ...others
    } = user.toObject();

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
    const {
      password: pwd,
      _id,
      role,
      ToLeet,
      token,
      firstName,
      lastName,
      agree,
      updatedAt,
      createdAt,
      ...others
    } = user.toObject();
    const newUser = others;
    // res.status(200).json({
    //   status: "success",
    //   data: newUser,
    // });
    res.send(newUser);
  } catch (error) {
    res.send("User not found, Please log in first");
  }
};

function securePass(password) {
  try {
    const hashPassword = bcrypt.hashSync(password);
    return hashPassword;
  } catch (error) {
    res.status("User not found, Please log in first");
  }
}
