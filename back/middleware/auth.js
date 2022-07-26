const jwt = require("jsonwebtoken");
require('dotenv').config({path: './.env'});
module.exports = (request, response, next) => {
  try {
    const token = request.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET_ALEATOIRE);
    const userId = decodedToken.userId;
    request.auth = { userId };
    if (request.body.userId && request.body.userId !== userId) {
      throw "User ID non valable";
    } else {
      next();
    }
  } catch (error) {
    response.status(401).json({ error: error | "Requete non authentifié !" });
  }
};
