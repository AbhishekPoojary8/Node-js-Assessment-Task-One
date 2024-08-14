import mongoose, { Schema } from "mongoose";
import { IPolicyCarrier } from "../../interfaces/model";

const PolicyCarrierSchema: Schema = new Schema({
  companyName: { type: String, required: true },
});

const PolicyCarrierModel = mongoose.model<IPolicyCarrier>(
  "PolicyCarrier",
  PolicyCarrierSchema
);
export default PolicyCarrierModel;
