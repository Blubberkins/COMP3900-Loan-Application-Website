import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

function UserDetailsPage() {
  const [userTitle, setUserTitle] = useState("");
  const [userGivenName, setUserGivenName] = useState("");
  const [userMiddleName, setUserMiddleName] = useState("");
  const [userSurname, setUserSurname] = useState("");
  const [userGender, setUserGender] = useState("");
  const [userDob, setUserDob] = useState("");
  const [userMarital, setUserMarital] = useState("");

  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5000/applyLoan", {
        // page 2 takes these parameters as defined in backend
        user_title: userTitle,
        user_given_name: userGivenName,
        user_middle_name: userMiddleName,
        user_surname: userSurname,
        user_gender: userGender,
        user_dob: userDob,
        user_marital: userMarital,
        // placeholder 
        identification_files: "",
      });

      if (response.data.message === 'Success') {
        navigate('/page3');
      } else {
        console.error("Error occurred during the request: ", response.data);
      }
    } catch (error) {
      console.error("Error occurred during the request: ", error);
    }
  };

  return (
    <div className="px-6 py-8">
      <Navbar/>
      <h1 className="font-bold text-2xl mb-2 mt-10">Title</h1>
      <select value={userTitle} onChange={(e) => setUserTitle(e.target.value)} className="mb-4 p-2 w-full bg-white rounded shadow">
        <option value="Mr">Mr</option>
        <option value="Mrs">Mrs</option>
        <option value="Miss">Miss</option>
      </select>
      <h1 className="font-bold text-2xl mb-2">First name</h1>
      <input type="text" value={userGivenName} onChange={(e) => setUserGivenName(e.target.value)} className="mb-4 p-2 w-full bg-white rounded shadow"/>
      <h1 className="font-bold text-2xl mb-2">Middle name(s) (if any)</h1>
      <input type="text" value={userMiddleName} onChange={(e) => setUserMiddleName(e.target.value)} className="mb-4 p-2 w-full bg-white rounded shadow"/>
      <h1 className="font-bold text-2xl mb-2">Last name</h1>
      <input type="text" value={userSurname} onChange={(e) => setUserSurname(e.target.value)} className="mb-4 p-2 w-full bg-white rounded shadow"/>
      <h1 className="font-bold text-2xl mb-2">Gender</h1>
      <select value={userGender} onChange={(e) => setUserGender(e.target.value)} className="mb-4 p-2 w-full bg-white rounded shadow">
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <h1 className="font-bold text-2xl mb-2">Date of birth</h1>
      <div className="grid grid-cols-3 gap-4 mb-4">
      <input type="text" value={userDob} onChange={(e) => setUserDob(e.target.value)} placeholder="dd/mm/yyyy" className="mb-4 p-2 w-full bg-white rounded shadow" />
      </div>
      <h1 className="font-bold text-2xl mb-2">What's your marital status?</h1>
      <select value={userMarital} onChange={(e) => setUserMarital(e.target.value)} className="mb-4 p-2 w-full bg-white rounded shadow">
        <option value="Married">Married</option>
        <option value="Unmarried">Unmarried</option>
      </select>
      <h1 className="font-bold text-2xl mb-2">Identification Files</h1>
      <div className="mb-8 p-2 w-full bg-white rounded shadow">
        Placeholder for identification files
      </div>
      <button 
        className="p-2 bg-blue-500 text-white rounded-md self-end" 
        onClick={onSubmit}
      >
        Next
      </button>
    </div>
  );
}

export default UserDetailsPage;
