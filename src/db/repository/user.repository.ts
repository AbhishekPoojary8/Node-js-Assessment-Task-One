import mongoose from "mongoose";
import AgentModel from "../models/Agent.model";
import UserModel from "../models/User.model";

export class UserRepositry {
  private record?: any;
  constructor(record: any) {
    this.record = record;
  }

  public async FindOne() {
    try {
      const user = await UserModel.findOne({ email: this.record?.email });
      return user;
    } catch (error) {
      console.error("Error finding agent:", error);
      throw error;
    }
  }
  public async CreateUser() {
    const filter = {
      email: this.record.email, // Use email to check for existing document
    };

    const update = {
      $set: {
        firstName: this.record.firstname,
        dob: this.record.dob,
        address: this.record.address,
        zipCode: this.record.zip,
        phone: this.record.phone,
        state: this.record.state,
        gender: this.record.gender || null,
        userType: this.record.userType,
        email: this.record.email,
      },
    };

    const options = {
      upsert: true,
      new: true, // This is not actually applicable here; use `findOne` for retrieval
      setDefaultsOnInsert: true,
    };

    // Update or insert the document
    await UserModel.updateOne(filter, update, options);

    // Retrieve the updated or inserted document
    const user = await UserModel.findOne(filter);

    return user;
  }
  public async GetUserPolicy(userName: string) {
    let usePolicy = await UserModel.aggregate([
      // Match the user by email
      {
        $match: { firstName: userName as string },
      },
      // Lookup policies related to the user
      {
        $lookup: {
          from: "policyinfos", // Collection name of PolicyInfoModel
          localField: "_id",
          foreignField: "userId",
          as: "policies",
        },
      },
      {
        $unwind: {
          path: "$policies",
          preserveNullAndEmptyArrays: true,
        },
      },
      // Unwind the policies array
      // Optional: lookup and populate policyCategory and policyCarrier
      {
        $lookup: {
          from: "policycategories",
          localField: "policies.policyCategory",
          foreignField: "_id",
          as: "policies.policyCategory",
        },
      },
      {
        $lookup: {
          from: "policycarriers",
          localField: "policies.policyCarrier",
          foreignField: "_id",
          as: "policies.policyCarrier",
        },
      },
    ]);
    return usePolicy;
  }

  public async GetOverallUserPolicies() {
    const aggregatedPolicies = await UserModel.aggregate([
      // Match the user by their ObjectId
      {
        $lookup: {
          from: "policyinfos", // Collection name of PolicyInfoModel
          localField: "_id",
          foreignField: "userId",
          as: "policies",
        },
      },
      // Group the result by user, and push all policies into an array
      {
        $group: {
          _id: "$_id",
          firstName: { $first: "$firstName" },
          email: { $first: "$email" },
          policies: { $first: "$policies" },
        },
      },
      // Project the necessary fields
      {
        $project: {
          _id: 0,
          userId: "$_id",
          firstName: 1,
          email: 1,
          policies: 1,
        },
      },
    ]);

    return aggregatedPolicies;
  }
}
