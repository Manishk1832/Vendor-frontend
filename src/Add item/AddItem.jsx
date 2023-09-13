import React from 'react'
import axios from 'axios';
import { useState } from 'react';

function AddItem({ addVendorBill }) {
    const [vendorData, setVendorData] = useState({
      vendorName: '',
      billNo: '',
      amount: '',
      tax: '',
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setVendorData({ ...vendorData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('/api/vendor-bills', vendorData);
          addVendorBill(response.data);
          setVendorData({
            vendorName: '',
            billNo: '',
            amount: '',
            tax: '',
          });
        } catch (error) {
          console.error(error);
        }
      };

      


    return (
      <>
      <div className="container">
         <h1>Add item</h1>
          <form action=" ">
           <div className="form-group">
              <input type="text" className='vendor-Name' name='VendorName' value={vendorData.vendorName}  onChange={handleChange} placeholder='vendorName'/>
        </div>
        <br />
        <div className="form-group">
            <input type="text" className='bill-No' name='BillName' value={vendorData.billNo} onChange={handleChange} placeholder='billno' />
        </div>
        <div className="form-group">
            <input type="number" className='amount' name='amount' value={vendorData.billNo} onChange={handleChange} placeholder='billno' />
        </div>



        </form>
      </div>
      </>
    )
  }




export default AddItem