const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  } catch (error) {
    console.log(error.message);
  }
};

const comparePasswords = async (pass, hashPass) =>
  await bcrypt.compare(pass, hashPass);

const genJWT = async (payload) => {
  try {
    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    return token;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  hashPassword,
  genJWT,
  comparePasswords,
};
