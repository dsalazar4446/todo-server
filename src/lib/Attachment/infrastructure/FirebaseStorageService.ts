import { v4 as uuid } from "uuid";
import path from "path";
import { IAttachmentStorageService } from "../application/services/IAttachmentStorageService";
import { bucket as storage} from "../../Common/infrastructure/firebase/firebaseApp";

export class FirebaseStorageService implements IAttachmentStorageService {
  private storage = storage;

  async upload(
    file: Express.Multer.File
  ): Promise<{ url: string; name: string }> {
    const ext = path.extname(file.originalname);
    const filename = `attachments/${uuid()}${ext}`;
    const fileRef = this.storage.file(filename);

    await fileRef.save(file.buffer, {
      contentType: file.mimetype,
      public: true,
    });

    const [url] = await fileRef.getSignedUrl({
      action: "read",
      expires: "03-01-2500",
    });

    return { url, name: filename };
  }

  async delete(fileName: string): Promise<void> {
    const fileRef = this.storage.file(fileName);
    await fileRef.delete();
  }
}
