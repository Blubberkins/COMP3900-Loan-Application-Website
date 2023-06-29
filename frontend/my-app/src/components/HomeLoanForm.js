import React, { useState } from "react";
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function HomeLoanForm() {
    const navigate = useNavigate();
    const [active, setActive] = useState({
        purpose: "",
        interestRate: "",
        additionalPayments: "",
        redraws: ""
    });

    const handleClick = (key, value) => {
        setActive({ ...active, [key]: value });
    }

    const handleFindLoan = () => {
        navigate('/loan-results');
    };

    return (
        <div className="w-full text-center py-10">
            <h2 className="text-2xl font-bold mb-8">Let us know what you are looking for</h2>
            <div className="grid grid-cols-4 gap-4 mb-10">
                <div>
                    <h3 className="font-bold mb-4">Purpose of Loan</h3>
                    <button 
                        className={`mr-2 px-4 py-2 rounded ${active.purpose === 'live' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border-blue-500'}`} 
                        onClick={() => handleClick('purpose', 'live')}
                    >
                        To live in
                    </button>
                    <button 
                        className={`px-4 py-2 rounded ${active.purpose === 'investment' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border-blue-500'}`} 
                        onClick={() => handleClick('purpose', 'investment')}
                    >
                        An investment
                    </button>
                </div>
                <div>
                    <h3 className="font-bold mb-4">Fixed or Variable Interest Rate</h3>
                    <button 
                        className={`mr-2 px-4 py-2 rounded ${active.interestRate === 'fixed' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border-blue-500'}`} 
                        onClick={() => handleClick('interestRate', 'fixed')}
                    >
                        Fixed
                    </button>
                    <button 
                        className={`px-4 py-2 rounded ${active.interestRate === 'variable' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border-blue-500'}`} 
                        onClick={() => handleClick('interestRate', 'variable')}
                    >
                        Variable
                    </button>
                </div>
                <div>
                    <h3 className="font-bold mb-4">Ability to make additional payments?</h3>
                    <button 
                        className={`mr-2 px-4 py-2 rounded ${active.additionalPayments === 'yes' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border-blue-500'}`} 
                        onClick={() => handleClick('additionalPayments', 'yes')}
                    >
                        Yes
                    </button>
                    <button 
                        className={`px-4 py-2 rounded ${active.additionalPayments === 'no' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border-blue-500'}`} 
                        onClick={() => handleClick('additionalPayments', 'no')}
                    >
                        No
                    </button>
                </div>
                <div>
                    <h3 className="font-bold mb-4">Access to redraws?</h3>
                    <button 
                        className={`mr-2 px-4 py-2 rounded ${active.redraws === 'yes' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border-blue-500'}`} 
                        onClick={() => handleClick('redraws', 'yes')}
                    >
                        Yes
                    </button>
                    <button 
                        className={`px-4 py-2 rounded ${active.redraws === 'no' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border-blue-500'}`} 
                        onClick={() => handleClick('redraws', 'no')}
                    >
                        No
                    </button>
                </div>
            </div>
            <div>
                <Button variant="contained" color="primary" onClick={handleFindLoan}>Find me a suitable loan</Button>
            </div>
        </div>
    );
}

export default HomeLoanForm;
