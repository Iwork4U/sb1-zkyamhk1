import multer from 'multer';
import { FILE_UPLOAD_LIMITS } from '../config/constants.js';
import { AppError } from '../utils/errorHandler.js';

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (FILE_UPLOAD_LIMITS.ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new AppError('Only .txt files are allowed', 400));
  }
};

export const fileUploadMiddleware = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: FILE_UPLOAD_LIMITS.MAX_FILE_SIZE
  }
}).single('domainList');