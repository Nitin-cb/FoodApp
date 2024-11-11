import foodModel from '../models/foodModel.js';
import cloudinary from '../config/cloudinary.js';

// all food list
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Error' });
  }
};

// Get single food item
const getFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.params.id);
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

// add food
const addFood = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload an image',
      });
    }

    // Create a base64 string from the buffer
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    let dataURI = 'data:' + req.file.mimetype + ';base64,' + b64;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'foods',
      resource_type: 'auto',
      width: 1000,
      crop: 'scale',
    });

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });

    await food.save();
    res.json({ success: true, message: 'Food Added' });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Error adding food item',
    });
  }
};

// Edit food
const editFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.params.id);
    if (!food) {
      return res.status(404).json({
        success: false,
        message: 'Food not found',
      });
    }

    // Update image if new one is provided
    let imageData = food.image; // Keep existing image by default
    if (req.file) {
      // Delete old image from Cloudinary
      if (food.image.public_id) {
        await cloudinary.uploader.destroy(food.image.public_id);
      }

      // Upload new image
      const b64 = Buffer.from(req.file.buffer).toString('base64');
      let dataURI = 'data:' + req.file.mimetype + ';base64,' + b64;
      const result = await cloudinary.uploader.upload(dataURI, {
        folder: 'foods',
        width: 1000,
        crop: 'scale',
      });

      imageData = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    // Update food details
    const updatedFood = await foodModel.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name || food.name,
        description: req.body.description || food.description,
        price: req.body.price || food.price,
        category: req.body.category || food.category,
        image: imageData,
      },
      { new: true } // Return updated document
    );

    res.json({
      success: true,
      message: 'Food Updated',
      data: updatedFood,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Error updating food',
    });
  }
};

// delete food
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);

    // Delete image from Cloudinary
    if (food.image.public_id) {
      await cloudinary.uploader.destroy(food.image.public_id);
    }

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: 'Food Removed' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Error' });
  }
};

export { listFood, addFood, removeFood, getFood, editFood };
