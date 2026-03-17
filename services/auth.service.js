import argon2 from "argon2";
import { User } from "../models/user.model.js";

export const authService = {
  findByCredentials: async (credentials) => {
    try {
      const userFound = await User.findOne({ email: credentials.email });
      if (!userFound) {
        return false;
      }

      const passwordCorrect = await argon2.verify(
        userFound.password,
        credentials.password,
      );

      if (!passwordCorrect) {
        return false;
      } else {
        return userFound;
      }
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
      const hashedPassword = await argon2.hash(user.password);
      user.password = hashedPassword;
      const userToCreate = User(user);
      await userToCreate.save();
      return userToCreate;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },
};
