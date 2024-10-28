import mongoose from 'mongoose';

const vendorSchema = new mongoose.Schema({
  shopName: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: Number, required: true },
  //   image: { type: String, required: true },
  category: { type: String, required: true },
});

const vendorModel =
  mongoose.models.vendor || mongoose.model('vendor', vendorSchema);
export default vendorModel;
