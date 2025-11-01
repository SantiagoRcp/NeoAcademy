import { Request } from "express";
import multer from "multer";
import path from "node:path";

function customFileName(req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  const ext = path.extname(file.originalname);
  cb(null, file.fieldname + "-" + uniqueSuffix + ext);
}

const storage = multer.diskStorage({ destination: "uploads", filename: customFileName });

export const upload = multer({ storage });
