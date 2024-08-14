import PolicyCategoryModel from "../models/PolicyCategory.model";

export class PolicyCategoryRepo {
  private record: any;
  constructor(record: any) {
    this.record = record;
  }

  public async FindOne() {
    try {
      const policyCarrier = await PolicyCategoryModel.findOne({
        categoryName: this.record?.category_name,
      });
      return policyCarrier;
    } catch (error) {
      console.error("Error finding agent:", error);
      throw error;
    }
  }

  public async CreatePolicyCategory() {
    const createdPolicyCategory = await PolicyCategoryModel.updateOne(
      { categoryName: this.record.category_name },
      { $setOnInsert: { categoryName: this.record.category_name } },
      { upsert: true, new: true } // Upsert option
    );
    return createdPolicyCategory.upsertedId
      ? await PolicyCategoryModel.findById(createdPolicyCategory.upsertedId)
      : await PolicyCategoryModel.findOne({
          categoryName: this.record.category_name,
        });
  }
}
