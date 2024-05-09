import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../model/userModel";

const jwtsecret = process.env.JWT_SECRET as string;

export const auth = async (req: Request | any, res: Response, next: NextFunction) => {
  try {
    const autorization = req.headers.authorization;

    if (!autorization) {
      return res.status(401).json({ message: "Kindly sign in as a user" });
    }

    const token = autorization.slice(7, autorization.length);

    let verify = jwt.verify(token, jwtsecret);
    if (!verify) {
      return res.status(400).json({
        message: "Invalid token",
      });
    }

    const { _id } = verify as {[Key: string] : string};

    const user = await User.findById(_id);
    if(!user){
        return res.status(400).json({
            message: "User not found",
        })
    }
    req.user = verify;
    next();
  } catch (error) {
    console.log(error);
  }
};

