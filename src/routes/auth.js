import express from "express";
import { AuthController } from "../controllers/authController";
import { HandleError } from "../middlewares/handleError";

const router = express.Router();

router.post('/register', HandleError.catchErrors(AuthController.register));
router.post('/login', HandleError.catchErrors(AuthController.login))



export default router;
