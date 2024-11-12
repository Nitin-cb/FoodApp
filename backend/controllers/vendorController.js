import vendorModel from '../models/vendorModel.js';

// all vendor list
const listVendor = async (req, res) => {
  try {
    const vendors = await vendorModel.find({});
    res.json({ success: true, data: vendors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Error' });
  }
};

// add vendor
const addVendor = async (req, res) => {
  try {
    // let image_filename = `${req.file.filename}`

    const vendor = new vendorModel({
      shopName: req.body.shopName,
      name: req.body.name,
      address: req.body.address,
      phone: req.body.phone,
      category: req.body.category,
      //   image: image_filename,
    });

    await vendor.save();
    res.json({ success: true, message: 'Food Added' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Error' });
  }
};

// update vendor
const updateVendor = async (req, res) => {
  try {
    const { id, shopName, name, address, phone, category } = req.body;

    // Find the vendor by ID
    const vendor = await vendorModel.findById(id);

    if (!vendor) {
      return res.json({ success: false, message: 'Vendor not found' });
    }

    // Update the vendor information
    vendor.shopName = shopName;
    vendor.name = name;
    vendor.address = address;
    vendor.phone = phone;
    vendor.category = category;

    // Save the updated vendor
    await vendor.save();

    res.json({ success: true, message: 'Vendor updated' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Error updating vendor' });
  }
};

// delete vendor
const removeVendor = async (req, res) => {
  try {
    const food = await vendorModel.findById(req.body.id);
    // fs.unlink(`uploads/${food.image}`, () => { })

    await vendorModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: 'Vendor Removed' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Error' });
  }
};

export { listVendor, addVendor, removeVendor, updateVendor };
