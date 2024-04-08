import express from "express";
import { UserControler } from "../controllers/userController";
import verityToken from "../middlewares/verifyToken";
import { isAdmin, isModerator } from "../middlewares/verifyRole";

const router = express.Router();

router.get("/", verityToken, UserControler.getUserById);

export default router;
