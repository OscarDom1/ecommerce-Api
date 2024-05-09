import mongoose from "mongoose";

interface UserType {
  [key: string]: string | boolean | Array<string>;
}


const userSchema = new mongoose.Schema(
  {
    fullName: {type: String}, 
    email: {type: String}, 
    password: {type: String}, 
    confirm_password: {type: String}, 
    country: {type: String}, 
    phoneNumber: {type: String}, 
    profile_picture: {type: String},
    ecomm: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ecommerce"
      }
    ]

  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<UserType>('User', userSchema)

export = User;