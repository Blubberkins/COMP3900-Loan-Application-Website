import React, { useContext, useState } from 'react';
import { LoanContext } from '../contexts/LoanContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

function LoanDetailsPage() {
  const [irType, setIrType] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [Sending, setSending] = useState(false);

  const navigate = useNavigate();

  // Global state
  const { loanDetails, setLoanDetails } = useContext(LoanContext);

  const onSubmit = async () => {
    setShowModal(true);
    setSending(true);
    try {
      const updatedLoanDetails = {
        ...loanDetails,
        ir_type: loanDetails.ir_type,
        payment_type: loanDetails.payment_type,
        loan_term: loanDetails.loan_term,
      };
      const response = await axios.post("http://localhost:5000/applyLoan", loanDetails);

      setSending(false);
      setTimeout(() => {
        setShowModal(false);
      }, 4000);

      if (response.data.message === 'Success') {
        // Update the context state with the new values
        setLoanDetails(updatedLoanDetails);
        // when application is finished, redirects to homepage
        setTimeout(() => {
        navigate('/home');
        }, 400);
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
      <div
        className={`fixed bottom-4 left-4 text-white p-2 rounded shadow-lg z-50 ease-in-out duration-500 transition-opacity ${
          showModal ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className='flex items-center'>
          <p className='flex items-center text-[#059669] bg-[#D1FAE5] text-center rounded-full px-4 py-1'>
            {Sending ? 'Sending' : 'Sent'}
            {Sending ? (
              <svg
              aria-hidden='true'
              className={`inline h-7 w-7 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 ml-2`}
              viewBox='0 0 100 101'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                fill='currentColor'
              />
              <path
                d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                fill='currentFill'
              />
            </svg>
            ) : (
              <svg
              xmlns='http://www.w3.org/2000/svg'
              className={`h-7 w-7 ml-11`}
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M5 13l4 4L19 7' />
            </svg>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoanDetailsPage;
