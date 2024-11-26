import React from 'react'
import './AddVendor.css'
import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets, url } from '../../assets/assets';

const AddVendor = () => {

    const [data, setData] = useState({
        shopName: "",
        name:"",
        address: "",
        phone: "",
        category: "Veg"
    });

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        const vendorData={
            shopName: data.shopName,
            name: data.name,
            address: data.address,
            phone: data.phone,
            category: data.category,
        }
        
        const response = await axios.post(`${url}/api/vendor/add`, vendorData);
        if (response.data.success) {
            console.log(response.data)
            toast.success(response.data.message)
            setData({
                shopName: "",
                name:"",
                address: "",
                phone: "",
                category: data.category
            })
            
        }
        else {
            toast.error(response.data.message)
        }
    }

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }



  return (
    <div className='add-vendor'>
            <form className='flex-col' onSubmit={onSubmitHandler} >
                {/*
                <div className='add-img-upload flex-col'>
                    <p>Upload image</p>
                    <input onChange={(e) => { setImage(e.target.files[0]); e.target.value = '' }} type="file" accept="image/*" id="image" hidden />
                    <label htmlFor="image">
                        <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" />
                    </label>
                </div>
                */}
                <div className='add-vendor-name flex-col'>
                    <p>Shope Name</p>
                    <input name='shopName' onChange={onChangeHandler} value={data.shopName} type="text" placeholder='Shop Name' required />
                </div>
                <div className='add-vendor-name flex-col'>
                    <p>Vendor Name</p>
                    <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Name' required />
                </div>
                <div className='add-vendor-address flex-col'>
                    <p>Vendor Address</p>
                    <textarea name='address' onChange={onChangeHandler} value={data.address}   type="text"  placeholder='Address' required />
                </div>
                <div className='add-vendor-category'>
                    <div className='add-vendor-category flex-col'>
                        <p>Category</p>
                        <select name='category'  onChange={onChangeHandler} >
                            <option value="Veg">Veg</option>
                            <option value="Non-Veg">Non-Veg</option>
                            
                        </select>
                    </div>
                    <div className='add-vendor-number flex-col'>
                        <p>Phone Number</p> 
                        <input name='phone'onChange={onChangeHandler} value={data.phone} type='text' placeholder='Phone' />
                    </div>
                </div>
                <button type='submit' className='add-btn' >ADD</button>
            </form>
        </div>
  )
}

export default AddVendor
