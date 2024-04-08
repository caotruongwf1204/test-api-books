import db from "../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { registerValidator, loginValidator } from "../validators/auth.validator";

export class AuthController {
  static async register(req, res) {
    try {
      const { name, email, password } = req.body;


      const { error } = registerValidator(req.body);

      if (error) {
        return res.status(400).json({ message: "Invalid input", error: error.details });
      }


      const existingUser = await db.User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await db.User.create({
        name,
        email,
        password: hashedPassword,
      });

      return res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
      return res.status(500).json({ message: "Server error" });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body

      const { error } = loginValidator(req.body);

      if (error) {
        return res.status(400).json({ message: "Invalid input", error: error.details });
      }

      // Kiểm tra xem người dùng có tồn tại trong cơ sở dữ liệu không
      const user = await db.User.findOne({where: {email}})
      if (!user) {
        return res.status(409).json({ message: "Account is not registered" })
      }

      // Xác thực mật khẩu
      const isCheck = await bcrypt.compare(password, user.password)
      if (!isCheck) {
        return res.status(401).json({ message: "Incorrect password" })
      }

      // Tạo JWT token
      const payload = {
        user: {
          id: user.id,
          name: user.name,
        },
      }

      const token = jwt.sign(payload, process.env.JWT_SECRET || 'truong12', { expiresIn: '5d' })
      // const refreshToken = jwt.sign()

      //trả về thông tin người dùng kèm theo token
      const data = {
        token,
        user: {
          id: user.id,
          email: user.email,
          password: user.password
        }

      }
      return res.status(200).json({message: "User logged in successfully",data});
    } catch (error) {
      console.log("error", error)
      return res.status(500).json({ message: "Server error" });
    }
  }
}
