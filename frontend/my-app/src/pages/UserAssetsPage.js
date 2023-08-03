import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

function UserAssetsPage() {
  const [userBankAccounts, setUserBankAccounts] = useState("");
  const [userProperty, setUserProperty] = useState("");
  const [userAssets, setUserAssets] = useState("");

  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5000/applyLoan", {
        // page 4 takes these parameters as defined in backend
        user_bank_accounts: userBankAccounts,
        user_property: userProperty,
        user_assets: userAssets,
        // placeholder
        financial_files: ""
      });

      if (response.data.message === 'Success') {
        navigate('/page5');
      } else {
        console.error("Error occurred during the request: ", response.data);
      }
    } catch (error) {
      console.error("Error occurred during the request: ", error);
    }
  };

  return (
    <div className="m-4">
      <Navbar/>
      <h1 className="font-bold text-2xl mb-4 mt-10">Do you have bank accounts?</h1>

      <div className="mb-4">
        <button onClick={() => setUserBankAccounts("Yes")} className={`px-4 py-2 mr-2 rounded ${userBankAccounts === "Yes" ? "bg-blue-500 text-white" : "border border-gray-300"}`}>Yes</button>
        <button onClick={() => setUserBankAccounts("No")} className={`px-4 py-2 rounded ${userBankAccounts === "No" ? "bg-blue-500 text-white" : "border border-gray-300"}`}>No</button>
      </div>

      <h2 className="font-bold text-xl mb-4">Do you own property?</h2>
      <div className="mb-4">
        <button onClick={() => setUserProperty("Yes")} className={`px-4 py-2 mr-2 rounded ${userProperty === "Yes" ? "bg-blue-500 text-white" : "border border-gray-300"}`}>Yes</button>
        <button onClick={() => setUserProperty("No")} className={`px-4 py-2 rounded ${userProperty === "No" ? "bg-blue-500 text-white" : "border border-gray-300"}`}>No</button>
      </div>

      <h2 className="font-bold text-xl mb-4">Do you have any other assets in addition to the above?</h2>
      <div className="mb-4">
        <button onClick={() => setUserAssets("Yes")} className={`px-4 py-2 mr-2 rounded ${userAssets === "Yes" ? "bg-blue-500 text-white" : "border border-gray-300"}`}>Yes</button>
        <button onClick={() => setUserAssets("No")} className={`px-4 py-2 rounded ${userAssets === "No" ? "bg-blue-500 text-white" : "border border-gray-300"}`}>No</button>
      </div>

      {/* Placeholder for financial_files */}
      <div className="mb-10">
        <h2 className="font-bold text-xl mb-2">Financial files (placeholder)</h2>
        <div className="border border-gray-300 p-4 rounded">Upload your files here</div>
      </div>

      <button 
        className="p-2 bg-blue-500 text-white rounded-md self-end" 
        onClick={onSubmit}
      >
        Next
      </button>
    </div>
  );
}

export default UserAssetsPage;
