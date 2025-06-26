import multer from 'multer';
import path from 'path';

const uploadDir = path.join(__dirname, '../../uploads');

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

export const upload = multer({ storage });