import db from "../models";

export class UserControler {
  static async getUserById(req, res) {
    try {
      const { id } = req.user;
      const user = await db.User.findOne({
        where: { id },
        attributes: { exclude: ["password","role_code"] },
        include: [
          {model: db.Role, as: 'roleData', attributes: ['id', 'code', 'value']}
        ]
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ message: "Server error" });
    }
  }
}
