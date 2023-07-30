import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function UserIncomePage() {
  const [employmentStatus, setEmploymentStatus] = useState("");
  const [salary, setSalary] = useState("");
  const [rentalIncomeStatus, setRentalIncomeStatus] = useState("");
  const [additionalIncome, setAdditionalIncome] = useState("");

  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5000/applyLoan", {
        // page 3 takes these parameters as defined in backend
        user_income_status: employmentStatus,
        user_income: salary,
        user_rental_income_status: rentalIncomeStatus,
        user_additional_income: additionalIncome,
        // placeholder
        income_files: ""
      });

      if (response.data.message === 'Success') {
        navigate('/page4');
      } else {
        console.error("Error occurred during the request: ", response.data);
      }
    } catch (error) {
      console.error("Error occurred during the request: ", error);
    }
  };

  return (
    <div className="m-4">
      <h1 className="font-bold text-2xl mb-4">What you earn</h1>

      <h2 className="font-bold text-l mb-2">Employment status</h2>
      <select value={employmentStatus} onChange={(e) => setEmploymentStatus(e.target.value)} className="w-full mb-4 p-2 border border-gray-300 rounded">
        <option value="">Select your employment status</option>
        <option value="Full-time">Full-time</option>
        <option value="Part-time">Part-time</option>
        <option value="Casual">Casual</option>
      </select>

      <h2 className="font-bold text-l mb-2">Income</h2>
      <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="Enter your salary" className="w-full mb-4 p-2 border border-gray-300 rounded" />

      <h2 className="font-bold text-2xl mb-2">Any current or future rental income?</h2>
      <div className="mb-4">
        <button onClick={() => setRentalIncomeStatus("Yes")} className={`px-4 py-2 mr-2 rounded ${rentalIncomeStatus === "Yes" ? "bg-blue-500 text-white" : "border border-gray-300"}`}>Yes</button>
        <button onClick={() => setRentalIncomeStatus("No")} className={`px-4 py-2 rounded ${rentalIncomeStatus === "No" ? "bg-blue-500 text-white" : "border border-gray-300"}`}>No</button>
      </div>

      <h2 className="font-bold text-2xl mb-2">Any other income apart from employment?</h2>
      <div className="mb-4">
        <button onClick={() => setAdditionalIncome("Yes")} className={`px-4 py-2 mr-2 rounded ${additionalIncome === "Yes" ? "bg-blue-500 text-white" : "border border-gray-300"}`}>Yes</button>
        <button onClick={() => setAdditionalIncome("No")} className={`px-4 py-2 rounded ${additionalIncome === "No" ? "bg-blue-500 text-white" : "border border-gray-300"}`}>No</button>
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
