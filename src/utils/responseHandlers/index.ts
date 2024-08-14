import { Response } from "express";

class ResponseHandler {
  static success(
    res: Response,
    message: string,
    data: any = null,
    statusCode: number = 200
  ) {
    res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }

  static error(
    res: Response,
    message: string,
    statusCode: number = 500,
    error: any = null
  ) {
    res.status(statusCode).json({
      success: false,
      message,
      error,
    });
  }
}

export default ResponseHandler;
