import { Request, Response } from "express";
import User from "../model/userModel";
import { v2 as cloudinaryV2 } from "cloudinary";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { LoginSchema, RegisterSchema, option } from "../utilis/utilis";

const jwtsecret = process.env.JWT_SECRET as string;

export const RegisterUser = async (req: Request, res: Response) => {
  try {
    const { fullName, email, password, confirm_password, country, phoneNumber } = req.body;

    // Validate user
    const validateUser = RegisterSchema.validate(req.body, option);
    if (validateUser.error) {
      return res.status(400).json({ Error: validateUser.error.details[0].message });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, await bcrypt.genSalt(12));

    // Check if user already exists
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // initialize a variable to store the picture URL
    let pictureUrl = "";

    //check if a file was uploaded
    if(req.file){
      //upload the image to cloudinary an retrieve its URL
      const result = await cloudinaryV2.uploader.upload(req.file.path);
      pictureUrl = result.secure_url
    }
    

    // Create new user
    if (!user){
      const newUser = await User.create({
        fullName,
        email,
        password: passwordHash,
        profile_picture: pictureUrl,
        country,
        phoneNumber,
      });

    return res.status(200).json({
      message: "Registration Successful",
      data: newUser,
    });
    }

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


export const loginUser = async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    //validate user

    const validateUser = LoginSchema.validate(req.body, option);

    if (validateUser.error) {
      res.status(400).json({ Error: validateUser.error.details[0].message });
    }

    //Verify if user exist
    const user = (await User.findOne({
      email: email,
    })) as unknown as { [key: string]: string };

    if (!User) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    const { _id } = user;

    //generate token
    const token = jwt.sign({ _id }, jwtsecret, { expiresIn: "30d" });

    //compare password
    const validUser = await bcrypt.compare(password, user.password);

    if (validUser) {
      return res.status(200).json({
        msg: "Login Successful",
        user,
        token,
      });
    }
    return res.status(400).json({
      error: "Invalid password",
    });
  } catch (error) {
    console.error("Something went wrong login in");
  }
};
