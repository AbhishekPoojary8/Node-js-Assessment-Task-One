// src/routes/FileUploadRoutes.ts
import express, { Router, Request, Response } from "express";
import multer from "multer";
import { FileUploadService } from "../../service/fileUploads.service";
import { UserService } from "../../service/user.service";
import { ERROR_CODES } from "../../config/message";

class UserRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private async initializeRoutes() {
    let service = new UserService();
    this.router.get(
      "/find-user-policy",
      async (req: Request, res: Response) => {
        try {
          let policies = await service.handleUserPolicyFind(req, res);
          let { data, status } = policies;
          res.status(status).json(data);
        } catch (error) {
          res
            .status(ERROR_CODES.INTERNAL_SERVER_ERROR)
            .json({ message: "Error while finding user" });
        }
      }
    );
    this.router.get(
      "/aggregate-user-policies",
      async (req: Request, res: Response) => {
        try {
          let aggregates = await service.handleOverallUserPolicy(req, res);
          let { data, status } = aggregates;
          res.status(status).json(data);
        } catch (error) {
          res
            .status(ERROR_CODES.INTERNAL_SERVER_ERROR)
            .json({ message: "Error while finding aggregates" });
        }
      }
    );
  }
}

export default new UserRoutes().router;
