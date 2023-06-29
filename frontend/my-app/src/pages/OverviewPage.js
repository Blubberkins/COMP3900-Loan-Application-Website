import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
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
    // control appearance through differen tstates
    const [modalIsOpen, setIsOpen] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);



    const packages = [
        // examples
        // how to integrate backend here? i want to make this dynamic
        { id: 1, title: 'Loan Package 1', description: 'Loan Package Details' },
        { id: 2, title: 'Loan Package 2', description: 'Loan Package Details' },
        { id: 3, title: 'Loan Package 3', description: 'Loan Package Details' },
        { id: 4, title: 'Loan Package 4', description: 'Loan Package Details' },
        { id: 5, title: 'Loan Package 5', description: 'Loan Package Details' },
        { id: 6, title: 'Loan Package 6', description: 'Loan Package Details' },
    ];


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
                <h1 className="text-2xl font-bold text-white">What is our bank's name?</h1>
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
                    {packages.map((pkg) => (
                        <div key={pkg.id} className="bg-white rounded shadow p-6" onClick={() => openModal(pkg)}>
                            <h2 className="font-bold text-xl">{pkg.title}</h2>
                            <p className="mt-2">{pkg.description}</p>
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
                    <p className="mt-2">{selectedPackage?.description}</p>
                </div>
                </Modal>
        </div>
    );
}

export default OverviewPage;
                
