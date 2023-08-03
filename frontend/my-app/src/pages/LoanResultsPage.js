import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoanResults from '../components/LoanResults';

function LoanResultsPage() {

    const navigate = useNavigate();

    const onSubmit = async () => {
        try {
        // response1 returns the package list sorted by interest rate
        const response1 = await axios.post("http://localhost:5000/search", {
        });
        // response2 returns the package list sorted by user preferences
        const response2 = await axios.post("http://localhost:5000/recommend", {
        });

        // display the returned package list - first try response2
        if (response2.data.message === 'Success') {
            
        // if no response2 (no user preferences), then try response1
        } else if (response1.data.message === 'Success') {


        } else {
            console.error("Error occurred during the request: ", response1.data);
        }
        } catch (error) {
        console.error("Error occurred during the request: ", error);
        }
    };

    return (
        <div className="loan-results-page flex flex-col items-center justify-center h-screen bg-blue-50">
            <LoanResults />
        </div>
    );
}

export default LoanResultsPage;
