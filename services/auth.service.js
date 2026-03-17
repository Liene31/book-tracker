import { User } from "../models/user.model.js";

export const authService = {
  findByCredentials: async (credentials) => {
    try {
      const userFound = await User.findOne({ email: credentials.email });
      if (!userFound) {
        return false;
      }

      return userFound;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },
  emailExists: async (email) => {
    try {
      const userFound = await User.findOne({ email });

      if (userFound) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },

  userNameExists: async (userName) => {
    try {
      const userFound = await User.findOne({ userName });

      if (userFound) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },

  create: async (user) => {
    try {
      const userToCreate = User(user);
      await userToCreate.save();
      return userToCreate;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },
};
