import React, { useEffect, useState } from 'react';
import axios from 'axios';

const View = () => {
  const [allData, setAllData] = useState([]);
  const [reconciledData, setReconciledData] = useState([]); // Initialize as an empty array
  const [unreconciledData, setUnreconciledData] = useState([]); // Initialize as an empty array

  useEffect(() => {
    axios
      .get('http://localhost:8080/bill/getvendorBills')
      .then((response) => {
        if (Array.isArray(response.data.data)) {
          const data = response.data.data;
          setAllData(data);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleReconcile = (item) => {
    setUnreconciledData((prevUnreconciledData) =>
      prevUnreconciledData.filter((dataItem) => dataItem._id !== item._id)
    );
    setReconciledData((prevReconciledData) => [...prevReconciledData, item]);
    setAllData((prevAllData) => prevAllData.filter((dataItem) => dataItem._id !== item._id));
  };

  const handleUnreconcile = (item) => {
    setReconciledData((prevReconciledData) =>
      prevReconciledData.filter((dataItem) => dataItem._id !== item._id)
    );
    setUnreconciledData((prevUnreconciledData) => [...prevUnreconciledData, item]);
    setAllData((prevAllData) => prevAllData.filter((dataItem) => dataItem._id !== item._id));
  };

  return (
    <div>
      <h2>View Data</h2>
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>Vendor Name</th>
            <th scope='col'>Bill No.</th>
            <th scope='col'>Amount</th>
            <th scope='col'>Tax</th>
            <th scope='col'>Reconciled</th>
          </tr>
        </thead>
        <tbody>
          {allData.map((item) => (
            <tr key={item._id}>
              <td>{item.vendorName}</td>
              <td>{item.billNo}</td>
              <td>₹ {item.amount}</td>
              <td>{item.tax}%</td>
              <td>
                <button
                  className='btn btn-success mt'
                  onClick={() => handleReconcile(item)}
                >
                  Yes
                </button>
                <button
                  className='btn btn-danger'
                  onClick={() => handleUnreconcile(item)}
                >
                  No
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <h3>Reconciled</h3>
        <table className='table'>
          
          <tbody>
            {reconciledData.map((item) => (
              <tr key={item._id}>
                <td>{item.vendorName}</td>
                <td>{item.billNo}</td>
                <td>₹ {item.amount}</td>
                <td>{item.tax}%</td>
                <td>
                <button
                  className='btn btn-success mr-2'
                  onClick={() => handleReconcile(item)}
                >
                  Yes
                </button>
                <button
                  className='btn btn-danger'
                  onClick={() => handleUnreconcile(item)}
                >
                  No
                </button>
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h3>Unreconciled</h3>
        <table className='table'>
        
            
          <tbody>
            {unreconciledData.map((item) => (
              <tr key={item._id}>
                <td>{item.vendorName}</td>
                <td>{item.billNo}</td>
                <td>₹ {item.amount}</td>
                <td>{item.tax}%</td>
                <td>
                <button
                  className='btn btn-success mr-2'
                  onClick={() => handleReconcile(item)}
                >
                  Yes
                </button>
                <button
                  className='btn btn-danger'
                  onClick={() => handleUnreconcile(item)}
                >
                  No
                </button>
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default View;
