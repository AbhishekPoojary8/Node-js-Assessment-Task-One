import mongoose, { Schema, Document } from "mongoose";
import { IPolicyCategory } from "../../interfaces/model";

const PolicyCategorySchema: Schema = new Schema({
  categoryName: { type: String, required: true },
});

const PolicyCategoryModel = mongoose.model<IPolicyCategory>(
  "PolicyCategory",
  PolicyCategorySchema
);
export default PolicyCategoryModel;
