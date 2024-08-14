import PolicyCarrierModel from "../models/PolicyCarrier.model";

export class PolicyCarrierRepo {
  private record: any;
  constructor(record: any) {
    this.record = record;
  }

  public async FindOne() {
    try {
      const policyCarrier = await PolicyCarrierModel.findOne({
        companyName: this.record?.company_name,
      });
      return policyCarrier;
    } catch (error) {
      console.error("Error finding agent:", error);
      throw error;
    }
  }

  public async CreatePolicyCarrier() {
    const createdCarrier = await PolicyCarrierModel.updateOne(
      { companyName: this.record.company_name },
      { $setOnInsert: { companyName: this.record.company_name } },
      { upsert: true, new: true } // Upsert option
    );
    return createdCarrier.upsertedId
      ? await PolicyCarrierModel.findById(createdCarrier.upsertedId)
      : await PolicyCarrierModel.findOne({
          companyName: this.record.company_name,
        });
  }
}
