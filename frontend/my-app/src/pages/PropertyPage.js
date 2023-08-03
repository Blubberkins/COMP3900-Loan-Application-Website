import React, { useContext } from 'react';
import { LoanContext } from '../contexts/LoanContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function PropertyPage() {

  const navigate = useNavigate();

  // Global state
  const { loanDetails, setLoanDetails } = useContext(LoanContext)

  const onSubmit = async () => {
    try {
      navigate('/page2');
    } catch (error) {
      console.error("Error occurred during the request: ", error);
    }
  };

  return (
    <div className="p-10">
      <Navbar/>
      <h1 className="font-bold text-2xl mb-1 mt-10">What type of property is it?</h1>
      <h2 className="text-l mb-4">Must be a residential address</h2>
      <input 
        className="w-full p-2 mb-8 border rounded-md" 
        type="text"
        value={loanDetails.propertyType} 
        onChange={(e) => setLoanDetails({ ...loanDetails, propertyType: e.target.value })} 
      />
      
      <h1 className="font-bold text-2xl mb-4">Will you live in it or rent it out?</h1>
      <div className="mb-8">
        <button 
          className={`p-2 mr-2 border rounded-md ${loanDetails.loanPurpose === "Live in it" ? "bg-blue-500 text-white" : ""}`} 
          onClick={() => setLoanDetails({ ...loanDetails, loanPurpose: "Live in it" })}
        >
          Live in it
        </button>
        <button 
          className={`p-2 border rounded-md ${loanDetails.loanPurpose === "Rent it out" ? "bg-blue-500 text-white" : ""}`} 
          onClick={() => setLoanDetails({ ...loanDetails, loanPurpose: "Rent it out" })}
        >
          Rent it out
        </button>
      </div>
      
      <h1 className="font-bold text-2xl mb-4">How much do you plan to offer? ($)</h1>
      <input 
        className="w-full p-2 mb-10 border rounded-md" 
        type="number" 
        value={loanDetails.depositAmount} 
        onChange={(e) => setLoanDetails({ ...loanDetails, depositAmount: e.target.value })} 
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
