import { verify, VerifyErrors, JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { RequestHandler } from "express";

dotenv.config();

export const verifyJWT: RequestHandler = (req: any, res: any, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  // console.log(authHeader); // bearer token
  const token = authHeader.split(" ")[1];
  verify(
    token,
    process.env.ACCESS_TOKEN_SECRET ?? "",
    (err: any, decode: any) => {
      if (err) return res.sendStatus(403); // invalid token
      req.name = decode?.username;
      next();
    }
  );
};
