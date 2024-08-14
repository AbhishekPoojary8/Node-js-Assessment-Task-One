import mongoose from "mongoose";
import AccountModel from "../models/Account.model";

export class AccountRepositry {
  private record: any;
  constructor(record: any) {
    this.record = record;
  }

  public async FindOne() {
    if (mongoose.connection.readyState !== 1) {
      throw new Error("Database connection is not established");
    }

    try {
      const account = await AccountModel.findOne({
        accountName: this.record?.account_name,
      });
      return account;
    } catch (error) {
      console.error("Error finding agent:", error);
      throw error;
    }
  }
  public async CreatedAccount(userId: any) {
    const createdAccount = await AccountModel.updateOne(
      {
        accountName: this.record?.account_name,
        userId,
        accountType: this.record?.account_type,
      },
      {
        $setOnInsert: {
          accountName: this.record.account_name,
          userId: userId,
          accountType: this.record?.account_type,
        },
      },
      { upsert: true, new: true } // Upsert option
    );
    return createdAccount.upsertedId
      ? await AccountModel.findById(createdAccount.upsertedId)
      : await AccountModel.findOne({
          accountName: this.record?.account_name,
          userId,
          accountType: this.record?.account_type,
        });
  }
}
