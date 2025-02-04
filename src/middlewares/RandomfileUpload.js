import multer from "multer";
import path from "path";

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files to "uploads" directory
  },
  filename: (req, file, cb) => {
    cb(
      null,
      "_Image" +
        randomCode +
        Date.now() +
        "_" +
        file.originalname.trim().replace(/\ /g, "")
    );
  },
});

// Multer configuration (accept any file type)
const uploads = multer({ storage: storage });

export default uploads;
