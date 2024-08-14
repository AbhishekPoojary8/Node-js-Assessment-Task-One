import csvParser from "csv-parser";
import fs from "fs";
import { FileAdapter } from "./FileAdapter";

export class CsvFileAdapter implements FileAdapter {
  public async processFile(filePath: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const results: any[] = [];

      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on("data", (data) => results.push(data))
        .on("end", () => {
          fs.unlinkSync(filePath); // Clean up the file after processing
          resolve(results);
        })
        .on("error", (error) => reject(error));
    });
  }
}
