// src/routes/FileUploadRoutes.ts
import express, { Router, Request, Response } from "express";
import multer from "multer";
import { FileUploadService } from "../../service/fileUploads.service";

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
          return res.status(400).json({ error: "No file uploaded" });
        }

        try {
          const data = await FileUploadService.handleFileUpload(req.file.path);
          res.status(200).json({
            message: "File processed successfully",
            data,
          });
        } catch (error: any) {
          res.status(500).json({ error: error.message });
        }
      }
    );
  }
}

export default new FileUploadRoutes().router;
