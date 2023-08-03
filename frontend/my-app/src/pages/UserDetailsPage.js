import React, { useContext } from 'react';
import { LoanContext } from '../contexts/LoanContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function UserDetailsPage() {

  const navigate = useNavigate();

  // Global state
  const { loanDetails, setLoanDetails } = useContext(LoanContext);

  const onSubmit = () => {
    try {
      setLoanDetails({
        ...loanDetails,
        user_title: loanDetails.userTitle,
        user_given_name: loanDetails.userGivenName,
        user_middle_name: loanDetails.userMiddleName,
        user_surname: loanDetails.userSurname,
        user_gender: loanDetails.userGender,
        user_dob: loanDetails.userDob,
        user_marital: loanDetails.userMarital,
        // placeholder 
        identification_files: "",
      });

      navigate('/page3');
    } catch (error) {
      console.error("Error occurred during the request: ", error);
    }
  };

  return (
    <div className="px-6 py-8">
      <Navbar/>
      <h1 className="font-bold text-2xl mb-2 mt-10">Title</h1>
      <select 
        value={loanDetails.userTitle} 
        onChange={(e) => setLoanDetails({...loanDetails, userTitle: e.target.value})} 
        className="mb-4 p-2 w-full bg-white rounded shadow"
      >
        <option value="Mr">Mr</option>
        <option value="Mrs">Mrs</option>
        <option value="Miss">Miss</option>
      </select>
      <h1 className="font-bold text-2xl mb-2">First name</h1>
      <input 
        type="text" 
        value={loanDetails.userGivenName} 
        onChange={(e) => setLoanDetails({...loanDetails, userGivenName: e.target.value})} 
        className="mb-4 p-2 w-full bg-white rounded shadow"
      />
      <h1 className="font-bold text-2xl mb-2">Middle name(s) (if any)</h1>
      <input 
        type="text" 
        value={loanDetails.userMiddleName} 
        onChange={(e) => setLoanDetails({...loanDetails, userMiddleName: e.target.value})} 
        className="mb-4 p-2 w-full bg-white rounded shadow"
      />
      <h1 className="font-bold text-2xl mb-2">Last name</h1>
      <input 
        type="text" 
        value={loanDetails.userSurname} 
        onChange={(e) => setLoanDetails({...loanDetails, userSurname: e.target.value})} 
        className="mb-4 p-2 w-full bg-white rounded shadow"
      />
      <h1 className="font-bold text-2xl mb-2">Gender</h1>
      <select 
        value={loanDetails.userGender} 
        onChange={(e) => setLoanDetails({...loanDetails, userGender: e.target.value})} 
        className="mb-4 p-2 w-full bg-white rounded shadow"
      >
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <h1 className="font-bold text-2xl mb-2">Date of birth</h1>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <input 
          type="text" 
          value={loanDetails.userDob} 
          onChange={(e) => setLoanDetails({...loanDetails, userDob: e.target.value})} 
          placeholder="dd/mm/yyyy" 
          className="mb-4 p-2 w-full bg-white rounded shadow" 
        />
      </div>
      <h1 className="font-bold text-2xl mb-2">What's your marital status?</h1>
      <select 
        value={loanDetails.userMarital} 
        onChange={(e) => setLoanDetails({...loanDetails, userMarital: e.target.value})} 
        className="mb-4 p-2 w-full bg-white rounded shadow"
      >
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
