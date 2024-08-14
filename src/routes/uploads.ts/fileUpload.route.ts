// src/routes/FileUploadRoutes.ts
import express, { Router, Request, Response } from "express";
import multer from "multer";
import { FileUploadService } from "../../service/fileUploads.service";
import {
  ERROR_CODES,
  STATUS_MESSAGES,
  SUCCESS_CODES,
} from "../../config/message";

const upload = multer({ dest: "uploads/" });

class FileUploadRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    //CSV Upload route
    this.router.post(
      "/upload-csv",
      upload.single("file"),
      async (req: Request, res: Response) => {
        if (!req.file) {
          return res
            .status(ERROR_CODES.DATA_NOT_FOUND)
            .json({ error: STATUS_MESSAGES.FILE_NOT_UPLOADED });
        }

        try {
          const data = await FileUploadService.handleFileUpload(req.file.path);
          res.status(SUCCESS_CODES.SUCCESS).json({
            message: STATUS_MESSAGES.FILE_PROCESSED_SUCCESS,
            data,
          });
        } catch (error: any) {
          res
            .status(ERROR_CODES.INTERNAL_SERVER_ERROR)
            .json({ error: error.message });
        }
      }
    );
  }
}

export default new FileUploadRoutes().router;
