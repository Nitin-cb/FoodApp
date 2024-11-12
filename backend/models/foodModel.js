import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 }, // New quantity field
  image: {
    public_id: { type: String, required: true },
    url: { type: String, required: true },
  },
  category: { type: String, required: true },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'vendor',
    required: true,
  }, // New vendor field
});

const foodModel = mongoose.models.food || mongoose.model('food', foodSchema);
export default foodModel;
