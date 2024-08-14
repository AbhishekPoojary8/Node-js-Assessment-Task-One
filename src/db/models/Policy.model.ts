import mongoose, { Schema, Document } from "mongoose";
import { IPolicyInfo } from "../../interfaces/model";

const PolicyInfoSchema: Schema = new Schema({
  policyNumber: { type: String, required: true },
  policyStartDate: { type: Date, required: true },
  policyEndDate: { type: Date, required: true },
  premiumAmountWritten: { type: Number, required: true },
  premiumAmount: { type: Number },
  policyMode: { type: String, required: false },
  policyCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PolicyCategory",
    required: true,
  },
  policyCarrier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PolicyCarrier",
    required: true,
  },
  producer: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const PolicyInfoModel = mongoose.model<IPolicyInfo>(
  "PolicyInfo",
  PolicyInfoSchema
);
export default PolicyInfoModel;
