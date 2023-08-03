import React, { useState } from "react";
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoanResults() {
    const navigate = useNavigate();
    const [repaymentType, setRepaymentType] = useState('');
    const [loanOffers, setLoanOffers] = useState([]);
    const [propertyValue, setPropertyValue] = useState('');
    const [borrowingAmount, setBorrowingAmount] = useState('');

    // repayment type can be principal and interest or just interest
    const handleRepaymentTypeClick = (type) => {
        setRepaymentType(type);
    }

    const handleBookAppointment = () => {
        navigate('/appointment');
    }

    const handleSearch = () => {
        axios.post('http://localhost:5000/search', {
            estimated_value: propertyValue,
            borrowing_amount: borrowingAmount
        })
        .then(response => {
            setLoanOffers(response.data);
        })
        .catch(error => {
            console.error(error);
        });
    }

    return (
        <div className="w-full p-10">
            <h2 className="text-2xl font-bold mb-8">Loan Search Criteria</h2>
            <div className="grid grid-cols-2 gap-4 mb-8">
                <div>
                    <h3 className="font-bold mb-2">Estimated Property Value ($)</h3>
                    <input type="number" className="w-full px-2 py-1 border rounded" value={propertyValue} onChange={e => setPropertyValue(e.target.value)} />
                </div>
                <div>
                    <h3 className="font-bold mb-2">Borrowing Amount ($)</h3>
                    <input type="number" className="w-full px-2 py-1 border rounded" value={borrowingAmount} onChange={e => setBorrowingAmount(e.target.value)} />
                </div>
            </div>
            <div className="grid grid-cols-4 gap-4 mb-8">
                <div className="col-span-2">
                    <h3 className="font-bold mb-2">Repayment Type</h3>
                    <button 
                        className={`mr-2 px-4 py-2 rounded ${repaymentType === 'principal' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border-blue-500'}`} 
                        onClick={() => handleRepaymentTypeClick('principal')}
                    >
                        Principal and Interest
                    </button>
                    <button 
                        className={`px-4 py-2 rounded ${repaymentType === 'interest' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border-blue-500'}`} 
                        onClick={() => handleRepaymentTypeClick('interest')}
                    >
                        Interest Only
                    </button>
                </div>
                <div>
                    <h3 className="font-bold mb-2">Interest Only Period (Month)</h3>
                    <input type="number" className="w-full px-2 py-1 border rounded" />
                </div>
                <div>
                    <h3 className="font-bold mb-2">Repayment Frequency (Month)</h3>
                    <input type="number" className="w-full px-2 py-1 border rounded" />
                </div>
            </div>
            <Button variant="contained" color="primary" onClick={handleSearch}>Search</Button>
            <h2 className="text-2xl font-bold mb-8">Loan Offerings</h2>
            <div className="grid grid-cols-4 gap-4">
                {loanOffers.map((offer, index) => (
                    <div className="border rounded p-4" key={index}>
                        <h3 className="font-bold mb-4">Loan Package {index + 1}</h3>
                        <p>Interest Rate: {offer.interest_rate}</p>
                        <p>Max LVR: {offer.max_lvr}</p>
                        <Button variant="contained" color="primary" onClick={handleBookAppointment}>Book an appointment</Button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LoanResults;
