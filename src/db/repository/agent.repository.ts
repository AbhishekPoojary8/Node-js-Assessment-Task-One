import mongoose from "mongoose";
import AgentModel from "../models/Agent.model";

export class AgentRepository {
  private record: any;
  constructor(record: any) {
    this.record = record;
  }

  public async FindOne() {
    if (mongoose.connection.readyState !== 1) {
      throw new Error("Database connection is not established");
    }

    try {
      const agent = await AgentModel.findOne({ name: this.record?.agent });
      return agent;
    } catch (error) {
      console.error("Error finding agent:", error);
      throw error;
    }
  }
  public async CreateAgent() {
    let name = this.record.agent;
    const createdAgent = await AgentModel.updateOne(
      { name: name },
      { $setOnInsert: { name: name } },
      { upsert: true, new: true } // Upsert option
    );

    return createdAgent.upsertedId
      ? await AgentModel.findById(createdAgent.upsertedId)
      : await AgentModel.findOne({ name: name });
  }
}
