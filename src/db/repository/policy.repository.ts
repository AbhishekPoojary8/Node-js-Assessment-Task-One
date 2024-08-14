import PolicyInfoModel from "../models/Policy.model";
import PolicyCategoryModel from "../models/PolicyCategory.model";

export class PolicyRepository {
  private record: any;
  constructor(record: any) {
    this.record = record;
  }

  public async FindOne() {
    try {
      const policy = await PolicyInfoModel.findOne({
        policyNumber: this.record?.policy_number,
      });
      return policy;
    } catch (error) {
      console.error("Error finding agent:", error);
      throw error;
    }
  }

  public async CreatePolicy({ userId, categoryId, carrierId }: any) {
    const createdPolicyCategory = await PolicyInfoModel.updateOne(
      { policyNumber: this.record.policy_number, userId: userId },
      {
        $setOnInsert: {
          policyNumber: this.record?.policy_number,
          userId: userId,
          policyCarrier: carrierId,
          policyCategory: categoryId,
          policyStartDate: this.record?.policy_start_date,
          policyEndDate: this.record?.policy_end_date,
          premiumAmount: this.record?.premium_amount,
          premiumAmountWritten: this.record?.premium_amount_written,
          policyMode: this.record?.policy_mode,
          producer: this.record?.producer,
        },
      },
      { upsert: true, new: true } // Upsert option
    );
    return createdPolicyCategory.upsertedId
      ? await PolicyCategoryModel.findById(createdPolicyCategory.upsertedId)
      : await PolicyCategoryModel.findOne({
          policyNumber: this.record?.policy_number,
        });
  }
}
