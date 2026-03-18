import { jwtUtility } from "../../controllers/utility/jwt.utility.js";

export const authMiddleware = () => {
  return async (req, res, next) => {
    //frontend sends in the req header token (in my case saved in the localStorage)
    const authorization = req.headers.authorization;
    if (!authorization) {
      res.status(401).json({
        statusCode: 401,
        message: "Please connect in order to continue",
      });
    } else {
      const token = authorization.split(" ")[1];

      if (!token) {
        res.status(401).json({
          statusCode: 401,
          message: "Please connect in order to continue",
        });
      }

      try {
        const payload = await jwtUtility.decode(token);
        //creating req.user and assigning what's in payload
        //now req.user accessible the same way as req.body or req.param
        req.user = payload;
        next();
      } catch (error) {
        res.status(401).json({
          statusCode: 401,
          message: "Please connect in order to continue",
        });
      }
    }
  };
};
