import mongoose from "mongoose";

export const Users = mongoose.model("Users", {
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    cartData: { type: Object },
    date: { type: Date, default: Date.now() },
  });
  
export const UsersV2 = mongoose.model("UsersV2", {
    firstName: { type: String },
    lastName: { type: String },
    username: { type: String },
    phoneNumber: { type: String },
    profilePicture: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    date: { type: Date, default: Date.now() },
  });