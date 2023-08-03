import React, { useContext } from 'react';
import { LoanContext } from '../contexts/LoanContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function UserIncomePage() {
  const navigate = useNavigate();

  // Global state
  const { loanDetails, setLoanDetails } = useContext(LoanContext);

  const onSubmit = () => {
    try {
      setLoanDetails({
        ...loanDetails,
        user_income_status: loanDetails.employmentStatus,
        user_income: loanDetails.salary,
        user_rental_income_status: loanDetails.rentalIncomeStatus,
        user_additional_income: loanDetails.additionalIncome,
        // placeholder
        income_files: ""
      });

      navigate('/page4');
    } catch (error) {
      console.error("Error occurred during the request: ", error);
    }
  };

  return (
    <div className="m-4">
      <Navbar/>
      <h1 className="font-bold text-2xl mb-4 mt-10">What you earn</h1>

      <h2 className="font-bold text-l mb-2">Employment status</h2>
      <select 
        value={loanDetails.employmentStatus} 
        onChange={(e) => setLoanDetails({...loanDetails, employmentStatus: e.target.value})} 
        className="w-full mb-4 p-2 border border-gray-300 rounded"
      >
        <option value="">Select your employment status</option>
        <option value="Full-time">Full-time</option>
        <option value="Part-time">Part-time</option>
        <option value="Casual">Casual</option>
      </select>

      <h2 className="font-bold text-l mb-2">Income</h2>
      <input 
        type="number" 
        value={loanDetails.salary} 
        onChange={(e) => setLoanDetails({...loanDetails, salary: e.target.value})} 
        placeholder="Enter your salary" 
        className="w-full mb-4 p-2 border border-gray-300 rounded" 
      />

      <h2 className="font-bold text-2xl mb-2">Any current or future rental income?</h2>
      <div className="mb-4">
        <button 
          onClick={() => setLoanDetails({...loanDetails, rentalIncomeStatus: "Yes"})} 
          className={`px-4 py-2 mr-2 rounded ${loanDetails.rentalIncomeStatus === "Yes" ? "bg-blue-500 text-white" : "border border-gray-300"}`}
        >
          Yes
        </button>
        <button 
          onClick={() => setLoanDetails({...loanDetails, rentalIncomeStatus: "No"})} 
          className={`px-4 py-2 rounded ${loanDetails.rentalIncomeStatus === "No" ? "bg-blue-500 text-white" : "border border-gray-300"}`}
        >
          No
        </button>
      </div>

      <h2 className="font-bold text-2xl mb-2">Any other income apart from employment?</h2>
      <div className="mb-4">
        <button 
          onClick={() => setLoanDetails({...loanDetails, additionalIncome: "Yes"})} 
          className={`px-4 py-2 mr-2 rounded ${loanDetails.additionalIncome === "Yes" ? "bg-blue-500 text-white" : "border border-gray-300"}`}
        >
          Yes
        </button>
        <button 
          onClick={() => setLoanDetails({...loanDetails, additionalIncome: "No"})} 
          className={`px-4 py-2 rounded ${loanDetails.additionalIncome === "No" ? "bg-blue-500 text-white" : "border border-gray-300"}`}
        >
          No
        </button>
      </div>

      {/* placeholder */}
      <h2 className="font-bold text-2xl mb-20">Income files (placeholder)</h2>

      <button 
        className="p-2 bg-blue-500 text-white rounded-md self-end" 
        onClick={onSubmit}
      >
        Next
      </button>
    </div>
  );
}

export default UserIncomePage;
