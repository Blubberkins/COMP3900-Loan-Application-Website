import React, { useContext } from 'react';
import { LoanContext } from '../contexts/LoanContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

function LoanDetailsPage() {
  const navigate = useNavigate();

  // Global state
  const { loanDetails, setLoanDetails } = useContext(LoanContext);

  const onSubmit = async () => {
    try {
      const updatedLoanDetails = {
        ...loanDetails,
        ir_type: loanDetails.ir_type,
        payment_type: loanDetails.payment_type,
        loan_term: loanDetails.loan_term,
      };
      console.log(loanDetails)
      const response = await axios.post("http://localhost:5000/applyLoan", loanDetails);

      if (response.data.message === 'Success') {
        // Update the context state with the new values
        setLoanDetails(updatedLoanDetails);
        
        // When application is finished, redirects to homepage
        navigate('/home');
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
      <h1 className="font-bold text-2xl mb-4 mt-10">Type of interest rate</h1>

      <div className="mb-4">
        <button 
          onClick={() => setLoanDetails({...loanDetails, ir_type: "Variable"})} 
          className={`px-4 py-2 mr-2 rounded ${loanDetails.ir_type === "Variable" ? "bg-blue-500 text-white" : "border border-gray-300"}`}
        >
          Variable
        </button>
        <button 
          onClick={() => setLoanDetails({...loanDetails, ir_type: "Fixed"})} 
          className={`px-4 py-2 rounded ${loanDetails.ir_type === "Fixed" ? "bg-blue-500 text-white" : "border border-gray-300"}`}
        >
          Fixed
        </button>
      </div>

      <h2 className="font-bold text-2xl mb-2">Type of payment?</h2>
      <div className="mb-4">
        <button 
          onClick={() => setLoanDetails({...loanDetails, payment_type: "Principal and interest"})} 
          className={`px-4 py-2 mr-2 rounded ${loanDetails.payment_type === "Principal and interest" ? "bg-blue-500 text-white" : "border border-gray-300"}`}
        >
          Principal and interest
        </button>
        <button 
          onClick={() => setLoanDetails({...loanDetails, payment_type: "Interest only"})} 
          className={`px-4 py-2 rounded ${loanDetails.payment_type === "Interest only" ? "bg-blue-500 text-white" : "border border-gray-300"}`}
        >
          Interest only
        </button>
      </div>

      <h2 className="font-bold text-2xl mb-2">Loan term</h2>
      <input 
        type="number" 
        value={loanDetails.loan_term} 
        onChange={(e) => setLoanDetails({...loanDetails, loan_term: e.target.value})} 
        placeholder="Enter loan term in years" 
        className="w-full mb-10 p-2 border border-gray-300 rounded" 
      />

      <button 
        className="p-2 bg-blue-500 text-white rounded-md self-end" 
        onClick={onSubmit}
      >
        Submit Application
      </button>
    </div>
  );
}

export default LoanDetailsPage;
