import multer from 'multer';
import { nanoid } from 'nanoid';

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, `file-${nanoid(16)}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png'];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error('Invalid file type. Only JPEG and PNG are allowed.'));
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // Maksimal 2MB
});

export default upload;
