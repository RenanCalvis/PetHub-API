// src/config/upload.ts
import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const storage = multer.diskStorage({
  destination: path.resolve(__dirname, '..', '..', 'uploads'),
  filename: (req, file, cb) => {
    const hash = crypto.randomBytes(6).toString('hex');
    const filename = `${hash}-${file.originalname}`;
    cb(null, filename);
  },
});

export const upload = multer({ storage });
