import React, { useEffect, useState } from 'react'
import './Vendors.css'
import { url, currency } from '../../assets/assets'
import axios from 'axios';
import { toast } from 'react-toastify';

const Vendors = () => {

 

  return (
    <div className='list add flex-col'>
      <p> Vendors List</p>
      <div className='list-table'>
        <div className="list-table-format title">
          
          <b>Name</b>
          <b>Shope Name</b>
          <b>Address</b>
          <b>Category</b>
          <b>Phone</b>
          
        </div>
        
      </div>
    </div>
  )
}

export default Vendors
