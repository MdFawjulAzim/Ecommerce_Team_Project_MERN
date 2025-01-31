import multer from "multer";
import fs from "fs";
import path from "path";

// Create folder if not exists file
const createFolderIfNotExists = (folderPath) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
};

const upload = (folderName) => {
  const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
      const folderPath = `uploads/${folderName}/`;
      createFolderIfNotExists(folderPath);
      cb(null, folderPath);
    },
    filename: (req, file, cb) => {
      let randomCode = Math.floor(1000 * Math.random() + 9000);
      cb(
        null,
        "user_Avatar_Image" +
          randomCode +
          Date.now() +
          "_" +
          file.originalname.trim().replace(/\ /g, "")
      );
    },
  });
  return multer({ storage: fileStorageEngine });
};


export default upload;
