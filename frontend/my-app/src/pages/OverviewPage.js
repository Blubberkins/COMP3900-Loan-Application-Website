import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import axios from 'axios';

import {auth} from '../firebase';
import {  signOut } from "firebase/auth";
import Package from '../components/Package';
import PackageDetail from '../components/PackageDetail';
import '../App.css';

// screen reader accessibilty
Modal.setAppElement('#root');

function OverviewPage() {
    const navigate = useNavigate();
    // modal is used for creating dialogs, lightboxes, popovers etc
    // control appearance through different states
    const [modalIsOpen, setIsOpen] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);

    const [packages, setPackages] = useState([]);

    // data fetching from backend
    // currently, i'm hosing locally (change according to port)
    // useEffect(() => {
    //     axios.get('http://localhost:5000/view_all')
    //     .then(res => {
    //         setPackages(res.data.message);
    //     })
    //     .catch(err => {
    //         console.error(err);
    //     });
    // }, []);


    const openModal = (pkg) => {
        setSelectedPackage(pkg);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleLogout = () => {               
        signOut(auth).then(() => {
        // Sign-out successful.
            navigate("/");
            console.log("Signed out successfully")
            window.sessionStorage.setItem('isLogged', false);
        }).catch((error) => {
        // An error happened.
        });
    }

    const handleAddNew = () => {
        // backend logic on adding new package
        navigate('/add-new-package');
    };

    const handleEdit = () => {
        // backend logic on editing package
        navigate('/edit-package');  
    };

    return (

        // we use tailwind css to syle our HTML elements
        // these are utility classes provided by tailwind css
        <div className="flex flex-col h-screen">
            <header className="flex items-center justify-between p-6 bg-blue-500">
                <h1 className="text-2xl font-bold text-white">Carbon Bank</h1>
                <div>
                    <button onClick={handleAddNew} className="mr-6 bg-white px-4 py-2 rounded shadow text-blue-500 font-semibold">Add New Package</button>
                    <button onClick={handleLogout} className="bg-white px-4 py-2 rounded shadow text-blue-500 font-semibold">Logout</button>
                </div>
            </header>
            <div className="flex p-6 bg-blue-100">
                <button className="flex-grow py-4 mx-2 bg-white rounded shadow text-blue-500 font-semibold text-center">Current Packages</button>
                <button className="flex-grow py-4 mx-2 bg-white rounded shadow text-blue-500 font-semibold text-center">Settings</button>
            </div>
            <div className="overflow-y-scroll">
                <div className="grid grid-cols-2 gap-6 p-6">
                    {packages.map((pkg, index) => (
                        <div key={index} className="bg-white rounded shadow p-6" onClick={() => openModal(pkg)}>
                            <h2 className="font-bold text-xl">{pkg.loan_name}</h2>
                            <p className="mt-2">Loan to value ratio: {pkg.lvr}</p>
                            <p className="mt-2">Loan purpose: {pkg.loan_purpose}</p>
                            <p className="mt-2">Interest rate type: {pkg.ir_type}</p>
                            <p className="mt-2">Additional payments: {pkg.additional_payments ? "Yes" : "No"}</p>
                            <p className="mt-2">Redraws: {pkg.redraws ? "Yes" : "No"}</p>
                        </div>
                    ))}
                </div>
            </div>
            <Modal
                // pop up screen when package is clicked
                isOpen={modalIsOpen}
                // pop up screen closed with cross or clicking outside the pop screen
                onRequestClose={closeModal}
                contentLabel="Package Detail"
                className="m-auto w-1/2 mt-10 p-5 border-2 border-gray-300"
                >
                <button
                // cross button is implemeneted
                    className="absolute right-3 top-3 text-xl font-bold focus:outline-none"
                    onClick={closeModal}
                >
                    &#10005;
                </button>
                <div className="flex flex-col items-start border-b border-gray-400 pb-3">
                    <button
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded shadow text-center my-3"
                    onClick={handleEdit}
                    >
                    Edit/New Package
                    </button>
                    <h2 className="font-bold text-xl mt-3">{selectedPackage?.title}</h2>
                </div>
                <div className="mt-3">
                    <p className="mt-2">Loan to value ratio: {selectedPackage?.lvr}</p>
                    <p className="mt-2">Loan purpose: {selectedPackage?.loan_purpose}</p>
                    <p className="mt-2">Interest rate type: {selectedPackage?.ir_type}</p>
                    <p className="mt-2">Additional payments: {selectedPackage?.additional_payments ? "Yes" : "No"}</p>
                    <p className="mt-2">Redraws: {selectedPackage?.redraws ? "Yes" : "No"}</p>
                </div>
            </Modal>
        </div>
    );
}

export default OverviewPage;
                
