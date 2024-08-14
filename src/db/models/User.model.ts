import mongoose, { Schema } from "mongoose";
import { IUser } from "../../interfaces/model";

const SchemaUser = new Schema({
  firstName: { type: String, required: true },
  dob: { type: Date, required: true },
  address: { type: String },
  phone: { type: String, required: true },
  state: { type: String },
  zipCode: { type: String },
  email: { type: String, required: true, unique: true },
  gender: { type: String },
  userType: { type: String, required: true },
});

const UserModel = mongoose.model<IUser>("User", SchemaUser);
export default UserModel;
