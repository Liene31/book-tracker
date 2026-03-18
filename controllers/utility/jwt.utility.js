import jwt from "jsonwebtoken";

const { JWT_ISSUER, JWT_AUDIENCE, JWT_SECRET } = process.env;

// JWT_SECRET → secret key used to sign tokens (value in .env)
// JWT_ISSUER → who created the token (my app) (value in .env)
// JWT_AUDIENCE → who the token is for (value in .env)

export const jwtUtility = {
  // Takes a user → returns a token
  generate: (user) => {
    return new Promise((resolve, reject) => {
      // payload should not contain any sensitive information
      // payload = who you are + what you’re allowed to do
      const payload = {
        id: user._id,
        // role -> authorization (permission)
        // role defines what user is allowed to do with his role (can he delete, view other users etc)
        role: user.role,
      };

      const options = {
        algorithm: "HS512",
        expiresIn: "3d",
        audience: JWT_AUDIENCE,
        issuer: JWT_ISSUER,
      };

      // JWT_SECRET is not the token itself (I define in .env) — it’s a secret key used to secure tokens.
      // It is used to -> create (sign) tokens & verify tokens

      // token is created and signed by secret key and returned if all goes well
      jwt.sign(payload, JWT_SECRET, options, (error, token) => {
        if (error) {
          reject(error);
        }

        resolve(token);
      });
    });
  },

  decode: (token) => {
    return new Promise((resolve, reject) => {
      if (!token) {
        reject(new Error("Token has not been received"));
      }

      const options = {
        audience: JWT_AUDIENCE,
        issuer: JWT_ISSUER,
      };

      jwt.verify(token, JWT_SECRET, options, (error, payload) => {
        if (error) {
          reject(error);
        }
        // returns what was saved in the payload when generating the payload
        // plus: iat -> issued at & exp -> expiration
        resolve(payload);
      });
    });
  },
};
