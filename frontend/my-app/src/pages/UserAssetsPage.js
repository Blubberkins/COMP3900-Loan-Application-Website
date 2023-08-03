import React, { useContext } from 'react';
import { LoanContext } from '../contexts/LoanContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function UserAssetsPage() {
  const navigate = useNavigate();

  // Global state
  const { loanDetails, setLoanDetails } = useContext(LoanContext);

  const onSubmit = () => {
    try {
      setLoanDetails({
        ...loanDetails,
        user_bank_accounts: loanDetails.userBankAccounts,
        user_property: loanDetails.userProperty,
        user_assets: loanDetails.userAssets,
        // placeholder
        financial_files: ""
      });

      navigate('/page5');
    } catch (error) {
      console.error("Error occurred during the request: ", error);
    }
  };

  return (
    <div className="m-4">
      <Navbar/>
      <h1 className="font-bold text-2xl mb-4 mt-10">Do you have bank accounts?</h1>

      <div className="mb-4">
        <button 
          onClick={() => setLoanDetails({...loanDetails, userBankAccounts: "Yes"})} 
          className={`px-4 py-2 mr-2 rounded ${loanDetails.userBankAccounts === "Yes" ? "bg-blue-500 text-white" : "border border-gray-300"}`}
        >
          Yes
        </button>
        <button 
          onClick={() => setLoanDetails({...loanDetails, userBankAccounts: "No"})} 
          className={`px-4 py-2 rounded ${loanDetails.userBankAccounts === "No" ? "bg-blue-500 text-white" : "border border-gray-300"}`}
        >
          No
        </button>
      </div>

      <h2 className="font-bold text-xl mb-4">Do you own property?</h2>
      <div className="mb-4">
        <button 
          onClick={() => setLoanDetails({...loanDetails, userProperty: "Yes"})} 
          className={`px-4 py-2 mr-2 rounded ${loanDetails.userProperty === "Yes" ? "bg-blue-500 text-white" : "border border-gray-300"}`}
        >
          Yes
        </button>
        <button 
          onClick={() => setLoanDetails({...loanDetails, userProperty: "No"})} 
          className={`px-4 py-2 rounded ${loanDetails.userProperty === "No" ? "bg-blue-500 text-white" : "border border-gray-300"}`}
        >
          No
        </button>
      </div>

      <h2 className="font-bold text-xl mb-4">Do you have any other assets in addition to the above?</h2>
      <div className="mb-4">
        <button 
          onClick={() => setLoanDetails({...loanDetails, userAssets: "Yes"})} 
          className={`px-4 py-2 mr-2 rounded ${loanDetails.userAssets === "Yes" ? "bg-blue-500 text-white" : "border border-gray-300"}`}
        >
          Yes
        </button>
        <button 
          onClick={() => setLoanDetails({...loanDetails, userAssets: "No"})} 
          className={`px-4 py-2 rounded ${loanDetails.userAssets === "No" ? "bg-blue-500 text-white" : "border border-gray-300"}`}
        >
          No
        </button>
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
