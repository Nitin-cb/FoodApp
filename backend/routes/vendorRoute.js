import express from 'express';
import {
  addVendor,
  listVendor,
  removeVendor,
} from '../controllers/vendorController.js';
// import multer from 'multer';
const vendorRouter = express.Router();

// const storage = multer.diskStorage({
//   destination: 'uploads',
//   filename: (req, file, cb) => {
//     return cb(null, `${Date.now()}${file.originalname}`);
//   },
// });

// const upload = multer({ storage: storage });

vendorRouter.get('/list', listVendor);
// vendorRouter.post("/add",upload.single('image'),addVendor);
vendorRouter.post('/add', addVendor);
vendorRouter.post('/remove', removeVendor);

export default vendorRouter;
