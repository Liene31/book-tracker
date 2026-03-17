import jwt from "jsonwebtoken";

const { JWT_ISSUER, JWT_AUDIENCE, JWT_SECRET } = process.env;

// JWT_SECRET → secret key used to sign tokens
// JWT_ISSUER → who created the token (my app)
// JWT_AUDIENCE → who the token is for

export const jwtUtility = {
  // Takes a user → returns a token
  generate: (user) => {
    return new Promise((resolve, reject) => {
      const payload = {
        id: user._id,
        // role -> authorization (permission)
        // role defines what user is allowed to do with his role (can he delete, view other users etc)
        role: user.role,
      };
    });
  },
};
