const { Schema, model, Types } = require("mongoose");
const { hashPassword } = require("../utils/index");

const validateEmail = (email) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const UserSchema = new Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    validate: [validateEmail, "Please fill in a valida email address"],
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  todos: [
    {
      type: Types.ObjectId,
      ref: "Todo",
    },
  ],
});

UserSchema.pre("save", async function (next) {
  const user = this;

  if (this.isModified("password") || this.isNew) {
    const hashedPassword = await hashPassword(user.password);

    console.log("Hashed password from the UserModel", hashedPassword);
    user.password = hashedPassword;
    next();
  } else {
    return next();
  }
});

exports.UserModel = model("User", UserSchema);
