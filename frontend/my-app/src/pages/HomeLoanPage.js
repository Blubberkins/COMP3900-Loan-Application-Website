import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import HomeLoanForm from '../components/HomeLoanForm';

function HomeLoanPage() {

    const [loanPurpose, setLoanPurpose]  = useState("");
    const [irType, setIrType] = useState("");
    const [additionalPayments, setAdditionalPayments] = useState("");
    const [redraws, setRedraws] = useState("");

    const navigate = useNavigate();

    const onSubmit = async () => {
        try {
        const response = await axios.post("http://localhost:5000/preferences", {
            loan_purpose: loanPurpose,
            ir_type: irType,
            additional_payments: additionalPayments,
            redraws: redraws,
        });

        if (response.data.message === 'Success') {
            navigate('/loan-results');
        } else {
            console.error("Error occurred during the request: ", response.data);
        }
        } catch (error) {
        console.error("Error occurred during the request: ", error);
        }
    };

    return (
        <div className="homeloan-page flex flex-col items-center justify-center h-screen bg-blue-50">
            <HomeLoanForm />
        </div>
    );
}

export default HomeLoanPage;
