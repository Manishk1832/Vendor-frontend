import React, { useState } from "react";
import axios from "axios";
import api from "../config";

function AddItem({ addVendorBill }) {
  const [vendorData, setVendorData] = useState({
    vendorName: "",
    billNo: "",
    amount: "",
    tax: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendorData({ ...vendorData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8080/bill/vendorBills`, vendorData);

      setVendorData({
        vendorName: "",
        billNo: "",
        amount: "",
        tax: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="VendorForm"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header text-center">
              <h4 className="modal-title w-100 font-weight-bold">Add item</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body mx-3">
              <form onSubmit={handleSubmit}>
                <div className="form-group d-flex justify-content-center mb-1">
                  <input
                    type="text"
                    className="vendor-Name text-center"
                    name="vendorName"
                    value={vendorData.vendorName}
                    onChange={handleChange}
                    placeholder="Vendor Name"
                  />
                </div>
                <div className="form-group d-flex justify-content-center mb-1">
                  <input
                    type="text"
                    className="bill-No text-center"
                    name="billNo"
                    value={vendorData.billNo}
                    onChange={handleChange}
                    placeholder="Billno."
                  />
                </div>

                <div className="form-group d-flex justify-content-center mb-1">
                  <input
                    type="number"
                    className="amount text-center"
                    name="amount"
                    value={vendorData.amount}
                    onChange={handleChange}
                    placeholder="Amount"
                  />
                </div>
                <div className="form-group d-flex justify-content-center mb-1">
                  <input
                    type="number"
                    className="tax text-center"
                    name="tax"
                    value={vendorData.tax}
                    onChange={handleChange}
                    placeholder="Tax"
                  />
                </div>
                <div className="modal-footer d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-success"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="text-left ml-3 mt-3">
        <a
          href=""
          className="btn btn-primary btn-rounded mb-3"
          data-toggle="modal"
          data-target="#VendorForm"
        >
          Add item
        </a>
      </div>
    </>
  );
}

export default AddItem;
