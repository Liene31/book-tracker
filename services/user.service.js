import { User } from "../models/user.model.js";

export const authService = {
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
