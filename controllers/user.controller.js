const { UserModel } = require("../models/User.model");
const { genJWT, comparePasswords } = require("../utils/index");

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await UserModel.findOne({ email });

    if (user) {
      return res
        .status(409)
        .json({ message: "User with such email already exists" });
    }

    user = new UserModel({
      email,
      password,
    });

    const token = await genJWT({
      id: user.id,
    });

    await user.save();
    return res.status(200).json({ token });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Server error occured" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res
        .status(403)
        .json({ message: "User with such email doesn't exist" });
    }

    const passwordsMatch = await comparePasswords(password, user.password);

    if (!passwordsMatch) {
      return res.status(403).json({ message: "Invalid credentials" });
    }

    const token = await genJWT({
      id: user.id,
    });

    return res.status(200).json({ token });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  register,
  login,
};
