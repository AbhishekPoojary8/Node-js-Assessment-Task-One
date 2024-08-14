// src/service/FileUploadService.ts
import express, { Router, Request, Response } from "express";
import UserModel from "../db/models/User.model";
import { UserRepositry } from "../db/repository/user.repository";
import { resolve } from "path";
export class UserService {
  public async handleUserPolicyFind(req: Request, res: Response): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        //   console.log(req, "Check the req");
        const { userName }: any = req.query;

        const userPolicies = new UserRepositry("");
        let userRepo = await userPolicies?.GetUserPolicy(userName);

        let policies = userRepo.map((individualPolicy) => {
          return {
            userName: individualPolicy.firstName,
            userpolicies: individualPolicy.policies,
          };
        });

        resolve({
          data:
            policies.length > 0
              ? policies
              : { message: "No Policies for particular user" },
          status: policies.length > 0 ? 200 : 404,
        });
      } catch {
        reject({
          data: { message: "Error while finding Policy" },
          status: 500,
        });
      }
    });
  }
  public async handleOverallUserPolicy(
    req: Request,
    res: Response
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const userRepo = new UserRepositry("");
        let userPolicies: any = await userRepo?.GetOverallUserPolicies();
        resolve({
          data:
            userPolicies.length > 0
              ? userPolicies
              : { message: "No aggregate Policies" },
          status: userPolicies.length > 0 ? 200 : 404,
        });
      } catch {
        reject({
          data: { message: "Error while finding Policy" },
          status: 500,
        });
      }
    });
  }
}
