// foodRoutes.js
import express from 'express';
import {
  addFood,
  listFood,
  removeFood,
  getFood,
  editFood,
  getVendors,
} from '../controllers/foodController.js';
import { upload } from '../middleware/upload.js';

const foodRouter = express.Router();

foodRouter.get('/list', listFood);
foodRouter.get('/:id', getFood);
foodRouter.post('/add', upload.single('image'), addFood);
foodRouter.put('/edit/:id', upload.single('image'), editFood);
foodRouter.post('/remove', removeFood);
foodRouter.get('/vendors', getVendors);

export default foodRouter;
