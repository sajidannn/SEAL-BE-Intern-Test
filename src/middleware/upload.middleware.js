import multer from 'multer';
import { nanoid } from 'nanoid';

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, `file-${nanoid(16)}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error('Invalid file type. Only png, jpg, jpeg, webp are allowed.'));
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // Maksimal 2MB
});

export default upload;
