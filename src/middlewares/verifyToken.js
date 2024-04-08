import jwt from "jsonwebtoken";
import db from "../models"

const verityToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ messenge: "Require authrization" });
  }
  // tach token
  const accessToken = token.split(' ')[1]
  try {
    const decoded = await jwt.verify(accessToken, process.env.JWT_SECRET || "truong12")
    const id = decoded.user.id;
    const repo = await db.User
    const user = await repo.findOne({ where: { id } });
    req.user = user
  } catch (error) {
    console.log("error", error)
    return res.status(401).json({ message: "Invalid token" });
  }

  next();

};

export default verityToken
