import mongoose, { Schema } from "mongoose";
import { IAgent } from "../../interfaces/model";

const SchemaAgent: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  csr: { type: String, required: false }, // Optional field
});

const AgentModel = mongoose.model<IAgent>("Agent", SchemaAgent);
export default AgentModel;
