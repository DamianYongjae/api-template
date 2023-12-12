import jwt from "jsonwebtoken";
import config, { ALGORITHM, SALTROUNDS, SECRET } from "../config";
import dotenv from "dotenv";

dotenv.config();

/** This function verify token, if token is correct return payload */
export const checkAuth = (req: any) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization !== "" &&
    req.headers.authorization !== "null"
  ) {
    try {
      const token = req.headers.authorization.replace("Bearer ", "");

      if (token.includes("session_")) {
        return {};
      } else {
        jwt.verify(token, SECRET);
        // console.log(jwt.decode(token));
        return jwt.decode(token) as any;
      }
    } catch (error) {
      // throw new Error("Unauthorized - the JWT token is invalid");
      return;
    }
  } else {
    // throw new Error("Unauthorized - you must log in first");
    return;
  }
};
