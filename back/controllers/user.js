const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config({path: './.env'});
const User = require("../models/user");

exports.signup = async (request, response) => {
  const hash = await bcrypt.hash(request.body.password, 10);
  try {
    const user = new User({
      email: request.body.email,
      password: hash,
      username: request.body.username,
    });
    await user.save();

    response.status(201).json({ message: "Utilisateur crée !" });
  } catch (e) {
    response.status(500).json({ e });
  }
};

exports.login = async (request, response) => {
  const user = await User.findOne({ email: request.body.email });
  try {
    if (!user) {
      return response.status(401).json({ error: "Utilisateur non trouvé" });
    }
    const valid = bcrypt.compare(request.body.password, user.password);
    if (!valid) {
      return response.status(401).json({ error: "Mot de passe incorrect" });
    }
    response.status(200).json({
      userId: user._id,
      token: jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET_ALEATOIRE, {
        expiresIn: "24h",
      }),
      isAdmin: user.isAdmin,
      username: user.username,
    });
  } catch (e) {
    response.status(500).json({ e });
  }
};
