import { RouteDefinition } from "../../../Common/infrastructure/routes/RouteBuilder";
import { DeleteAttachmentSchema } from "../../../Task/infrastructure/schemas/TaskSchema";
import { uploadMiddleware } from "../middleware/multerMiddleware";


export const AttachmentRouter: RouteDefinition[] = [
  {
    method: "post",
    path: "/:id/attachments/upload",
    controller: "UploadAttachmentController",
    auth: true,
    middleware: [uploadMiddleware.single("file")],
  },
  {
    method: "delete",
    path: "/:id/attachments",
    controller: "DeleteAttachmentController",
    auth: true,
    validate: DeleteAttachmentSchema,
  },
];
