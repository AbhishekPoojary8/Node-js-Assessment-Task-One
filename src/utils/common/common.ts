import { AccountRepositry } from "../../db/repository/account.repositry";
import { AgentRepository } from "../../db/repository/agent.repository";
import { PolicyRepository } from "../../db/repository/policy.repository";
import { PolicyCarrierRepo } from "../../db/repository/policyCarrier.repositry";
import { PolicyCategoryRepo } from "../../db/repository/policyCatogery.repositry";
import { UserRepositry } from "../../db/repository/user.repository";

export class Common {
  public agentRepo: any;
  public userRepo: any;
  public policyCarriesRepo: any;
  public policyCategoryRepo: any;
  public accountRepo: any;
  public policyRepo: any;
  constructor(record: any) {
    this.agentRepo = new AgentRepository(record);
    this.userRepo = new UserRepositry(record);
    this.policyCarriesRepo = new PolicyCarrierRepo(record);
    this.policyCategoryRepo = new PolicyCategoryRepo(record);
    this.accountRepo = new AccountRepositry(record);
    this.policyRepo = new PolicyRepository(record);
  }
}
const record = {}; // Example record object
const commonInstance = new Common(record);
