export interface IAttachmentStorageService {
  upload(file: Express.Multer.File): Promise<{ url: string; name: string }>;
  delete(fileName: string): Promise<void>;
}
