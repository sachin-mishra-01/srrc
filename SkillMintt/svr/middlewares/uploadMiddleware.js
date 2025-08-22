import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cld.js";

// Allowed file types
const allowedMimeTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "video/mp4",
  "application/pdf",
];

// File filter
const fileFilter = (req, file, cb) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file type"), false);
  }
};

// Helper to sanitize filenames
const sanitizeFilename = (name) =>
  name.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9-_]/g, "");

// Cloudinary storage config
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let resourceType = "auto"; // default for images/videos
    let format = undefined;
    let contentDisposition = undefined;

    if (file.mimetype === "application/pdf") {
      resourceType = "raw";          // PDFs must be raw
      format = "pdf";                // force PDF format
      contentDisposition = "inline"; // open in browser
    }

    const filename = sanitizeFilename(file.originalname.split(".")[0]);

    return {
      folder: "sklp/uploads",
      resource_type: resourceType,
      format,
      content_disposition: contentDisposition,
      type: "upload",
      access_mode: "public",
      public_id: `${Date.now()}-${filename}`,
    };
  },
});

const upload = multer({ storage, fileFilter });

export default upload;
