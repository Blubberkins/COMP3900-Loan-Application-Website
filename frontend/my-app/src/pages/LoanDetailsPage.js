import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

function LoanDetailsPage() {
  const [irType, setIrType] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [loanTerm, setLoanTerm] = useState("");

  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5000/applyLoan", {
        // page 5 takes these parameters as defined in backend
        ir_type: irType,
        payment_type: paymentType,
        loan_term: loanTerm,
      });

      if (response.data.message === 'Success') {
        // when application is finished, redirects to homepage
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
        <button onClick={() => setIrType("Variable")} className={`px-4 py-2 mr-2 rounded ${irType === "Variable" ? "bg-blue-500 text-white" : "border border-gray-300"}`}>Variable</button>
        <button onClick={() => setIrType("Fixed")} className={`px-4 py-2 rounded ${irType === "Fixed" ? "bg-blue-500 text-white" : "border border-gray-300"}`}>Fixed</button>
      </div>

      <h2 className="font-bold text-2xl mb-2">Type of payment?</h2>
      <div className="mb-4">
        <button onClick={() => setPaymentType("Principal and interest")} className={`px-4 py-2 mr-2 rounded ${paymentType === "Principal and interest" ? "bg-blue-500 text-white" : "border border-gray-300"}`}>Principal and interest</button>
        <button onClick={() => setPaymentType("Interest only")} className={`px-4 py-2 rounded ${paymentType === "Interest only" ? "bg-blue-500 text-white" : "border border-gray-300"}`}>Interest only</button>
      </div>

      <h2 className="font-bold text-2xl mb-2">Loan term</h2>
      <input type="number" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} placeholder="Enter loan term in years" className="w-full mb-10 p-2 border border-gray-300 rounded" />

      <button 
        className="p-2 bg-blue-500 text-white rounded-md self-end" 
        onClick={onSubmit}
      >
        Next
      </button>
    </div>
  );
}

export default LoanDetailsPage;
