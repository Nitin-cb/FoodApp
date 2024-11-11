import express from 'express';
import {
  addFood,
  listFood,
  removeFood,
} from '../controllers/foodController.js';
import multer from 'multer';
const foodRouter = express.Router();

// Configure multer to use memory storage instead of disk storage
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  },
});

// Middleware to handle file upload errors
const handleUpload = (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading
      return res.status(400).json({
        success: false,
        message: `Upload error: ${err.message}`,
      });
    } else if (err) {
      // An unknown error occurred
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
    // Everything went fine
    next();
  });
};

foodRouter.get('/list', listFood);
foodRouter.post('/add', handleUpload, addFood);
foodRouter.post('/remove', removeFood);

export default foodRouter;
