import { authService } from "../services/auth.service.js";
import { jwtUtility } from "./utility/jwt.utility.js";

export const authController = {
  register: async (req, res) => {
    try {
      const userToAdd = req.body;

      const userNameExists = await authService.userNameExists(
        userToAdd.userName,
      );
      const emailExists = await authService.emailExists(userToAdd.email);

      if (userNameExists) {
        return res
          .status(409)
          .json({ message: `Username ${userToAdd.userName}  already exists` });
      }
      if (emailExists) {
        return res
          .status(409)
          .json({ message: `Email ${userToAdd.email} already exists` });
      }

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

  login: async (req, res) => {
    try {
      const credentials = req.body;

      const userFound = await authService.findByCredentials(credentials);
      if (!userFound) {
        return res
          .status(401)
          .json({ statusCode: 401, message: "Wrong user details" });
      }
      const token = await jwtUtility.generate(userFound);

      res.status(200).json({
        id: userFound._id,
        userName: userFound.userName,
        token: token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ statusCode: 500, message: "DB error" });
    }
  },
};
