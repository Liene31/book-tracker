import { authService } from "../services/user.service.js";

export const authController = {
  register: async (req, res) => {
    try {
      const userToAdd = req.body;
      const userCreated = await authService.create(userToAdd);

      res.location(`/api/user/${userCreated._id}`);
      res.status(201).json({
        id: userCreated._id,
        userName: userCreated.userName,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ statusCode: 500, message: "DB error" });
    }
  },

  login: (req, res) => {
    res.status(200).json({ message: "ok login" });
  },
};
