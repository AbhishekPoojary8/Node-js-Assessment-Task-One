import mongoose, { Schema } from "mongoose";
import { IAccount } from "../../interfaces/model";

const AccountSchema: Schema = new Schema({
  accountName: { type: String, required: true },
  accountType: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const AccountModel = mongoose.model<IAccount>("Account", AccountSchema);
export default AccountModel;
