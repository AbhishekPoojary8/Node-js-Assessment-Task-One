//Interfaces for mongodb schema
import mongoose, { Document } from "mongoose";

//User Interface
export interface IUser extends Document {
  firstName: string;
  dob: Date;
  address: string;
  phone: string;
  state: string;
  zipCode: string;
  email: string;
  gender: string;
  userType: string;
}

//Account Interface
export interface IAccount extends Document {
  accountName: string;
  accountType: string;
  userId: mongoose.Schema.Types.ObjectId; // Reference to User
}

//Agent Interface
export interface IAgent extends Document {
  name: string;
  csr: string;
}

export interface IPolicyCategory extends Document {
  categoryName: string;
}

export interface IPolicyCarrier extends Document {
  companyName: string;
}

export interface IPolicyInfo extends Document {
  policyNumber: string;
  policyStartDate: Date;
  policyEndDate: Date;
  premiumAmountWritten: number;
  premiumAmount: number;
  policyMode: string;
  producer: string;
  policyCategory: mongoose.Schema.Types.ObjectId; // Reference to Policy Category
  policyCarrier: mongoose.Schema.Types.ObjectId; // Reference to Policy Carrier
  userId: mongoose.Schema.Types.ObjectId; // Reference to User
}
