import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function PropertyPage() {
  const [propertyType, setPropertyType] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");
  const [depositAmount, setDepositAmount] = useState("");

  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5000/applyLoan", {
        // page 1 takes these parameters as defined in backend
        property_type: propertyType,
        loan_purpose: loanPurpose,
        deposit_amount: depositAmount,
      });

      if (response.data.message === 'Success') {
        navigate('/page2');
      } else {
        console.error("Error occurred during the request: ", response.data);
      }
    } catch (error) {
      console.error("Error occurred during the request: ", error);
    }
  };

  return (
    <div className="p-10">
      <h1 className="font-bold text-2xl mb-1">What type of property is it?</h1>
      <h2 className="text-l mb-4">Must be a residential address</h2>
      <input 
        className="w-full p-2 mb-8 border rounded-md" 
        type="text"
        value={propertyType} 
        onChange={(e) => setPropertyType(e.target.value)} 
      />
      
      <h1 className="font-bold text-2xl mb-4">Will you live in it or rent it out?</h1>
      <div className="mb-8">
        <button 
          className={`p-2 mr-2 border rounded-md ${loanPurpose === "Live in it" ? "bg-blue-500 text-white" : ""}`} 
          onClick={() => setLoanPurpose("Live in it")}
        >
          Live in it
        </button>
        <button 
          className={`p-2 border rounded-md ${loanPurpose === "Rent it out" ? "bg-blue-500 text-white" : ""}`} 
          onClick={() => setLoanPurpose("Rent it out")}
        >
          Rent it out
        </button>
      </div>
      
      <h1 className="font-bold text-2xl mb-4">How much do you plan to offer? ($)</h1>
      <input 
        className="w-full p-2 mb-10 border rounded-md" 
        type="number" 
        value={depositAmount} 
        onChange={(e) => setDepositAmount(e.target.value)} 
      />
      
      <button 
        className="p-2 bg-blue-500 text-white rounded-md self-end" 
        onClick={onSubmit}
      >
        Next
      </button>
    </div>
  );
}

export default PropertyPage;
