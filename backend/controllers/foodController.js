// foodController.js
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from '../utils/cloudinary.js';

import foodModel from '../models/foodModel.js';
import vendorModel from '../models/vendorModel.js';
import multer from 'multer';
import fs from 'fs';

const storage = multer.memoryStorage();

// all food list
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({}).populate('vendor', 'shopName'); // Populate the vendor field
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Error' });
  }
};

// Get single food item
const getFood = async (req, res) => {
  try {
    const food = await foodModel
      .findById(req.params.id)
      .populate('vendor', 'shopName'); // Populate the vendor field
    if (!food) {
      return res.status(404).json({
        success: false,
        message: 'Food not found',
      });
    }
    res.json({ success: true, data: food });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Error fetching food' });
  }
};

// Add Food
const addFood = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload an image',
      });
    }

    // Upload to Cloudinary
    const result = await uploadToCloudinary(req.file.path);

    // Delete local file after upload
    fs.unlinkSync(req.file.path);

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      quantity: req.body.quantity,
      category: req.body.category,
      vendor: req.body.vendor,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });

    await food.save();
    res.json({ success: true, message: 'Food Added' });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error adding food item',
    });
  }
};

// Edit Food
const editFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.params.id);
    if (!food) {
      return res.status(404).json({
        success: false,
        message: 'Food not found',
      });
    }

    let imageData = food.image;

    if (req.file) {
      // Delete old image from Cloudinary
      if (food.image.public_id) {
        await deleteFromCloudinary(food.image.public_id);
      }

      // Upload new image to Cloudinary
      const result = await uploadToCloudinary(req.file.path);

      // Delete local file after upload
      fs.unlinkSync(req.file.path);

      imageData = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    const updatedFood = await foodModel.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        image: imageData,
      },
      { new: true }
    );

    res.json({
      success: true,
      message: 'Food Updated',
      data: updatedFood,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error updating food item',
    });
  }
};

// delete food
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    if (food.image.public_id) {
      await deleteFromCloudinary(food.image.public_id);
    }
    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: 'Food Removed' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Error' });
  }
};

// Get list of vendors
const getVendors = async (req, res) => {
  try {
    const vendors = await vendorModel.find({}, 'shopName');
    res.json({ success: true, data: vendors });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Error fetching vendors' });
  }
};

export { listFood, addFood, removeFood, getFood, editFood, getVendors };
