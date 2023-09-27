const { encryptFunction } = require("../Encryption/encryption");
const User = require("../models/Users");
const { generateToken } = require("../utils/token");
const bcrypt = require("bcryptjs");

exports.signupGet = async (req, res) => {
  try {
    const getUsers = await User.find({});
    const projection = getUsers.map(({ _id,email,QuickVara, profileImage, role}) => ({_id, email, QuickVara,profileImage, role}));
    const encryptedUser = encryptFunction(JSON.stringify(projection)); // Convert to JSON string before encrypting
    res.send(encryptedUser);
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
      QuickVara,
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
      QuickVara,
      token,
      firstName,
      lastName,
      agree,
      updatedAt,
      createdAt,
      ...others
    } = user.toObject();
    const newUser = others;
    const encryptedNewUser = encryptFunction(JSON.stringify(newUser)); 
    res.send(encryptedNewUser);
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
 
exports.updateUser = async (req, res) => {
  try {
    const email = req.params.email;
    const { profileImage } = req.body; // Destructure the profileImage property from the  
    // Find and update the user's profile image by email
    const updateUser = await User.updateOne(
      { email: email },
      { $set: { profileImage: profileImage } }, // Update the profileImage field
      { runValidators: true }
    );

    if (updateUser.nModified === 0) {
      // Handle the case where no user was found with the specified email
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      updateUser,
      message: "Profile image updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const email = req.params.email;
    const deleteUser = await User.deleteOne({ email: email});
    res.status(200).json({
      message: "success",
    });
  } catch (error) {
    res.send("Internal server error");
  }
};