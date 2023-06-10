const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const usersSchema = new mongoose.Schema(
  {
    email: {
      type: String || Number,
      // validate: [validator.isEmail, "Provide a valid email"],
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "Email is required"],
    },
    password: {
      type: String || Number,
      required: [true, "Password is required"],
      // validate: {
      //   validator: (value) =>
      //     validator.isStrongPassword(value, {
      //       minLength: 6,
            
      //     }),
      //   message: "Password{VALUE} is not strong enough.",
      // },
    },
    confirmPassword: {
      type: String || Number,
      required: [true, "Password is required"],
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "Password matching error.",
      },
    },
    firstName: {
      type: String,
      required: [true, "Please provide first name"],
      trim: true,
      minLength: [3, " Name must be at least 3 character"],
      maxLength: [55, "name is too large"],
    },
    lastName: {
      type: String,
      required: [true, "Please provide last name"],
      trim: true,
      minLength: [3, " Name must be at least 3 character"],
      maxLength: [55, "Name is too large"],
    },
    agree: Boolean,
    status:{
      type: String,
      default: "active",
      enum: ["active", "inactive", "blocked"]

    },
    role:{
      type: String,
      default: "user",
      enum: ["admin", "moderator", "user","seller"]

    },
    ToLeet: String,
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
);

usersSchema.pre("save", function (next) {
  const password = this.password;
  const hashPassword = bcrypt.hashSync(password);
  this.password = hashPassword;
  this.confirmPassword = undefined;

  next();
});

usersSchema.methods.comparePassword= function(password, hash){
  const isPasswordValid = bcrypt.compareSync(password, hash)
   return isPasswordValid

}

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;
