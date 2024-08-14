export interface FileAdapter {
  processFile(filePath: string): Promise<any[]>;
}
