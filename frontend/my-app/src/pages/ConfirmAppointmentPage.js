import React, {useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from 'axios';


function ConfirmAppointments() {
  const { contact, year, month, day, timeEnd, timeStart } = useParams();
  const [appointmentDetails, setAppointmentDetails] = useState();
  const [showModal, setShowModal] = useState(false);
  const [Sending, setSending] = useState(false);
  const navigate= useNavigate()
  const goBack = () => {
    navigate(-1);
  }
  const handleConfirm = async (values) => {
    // Create an object with the appointment details
    const appointmentData = {
      contact,
      year,
      month,
      day,
      timeEnd,
      timeStart,
      details: appointmentDetails,
    };
    setShowModal(true);
    setSending(true);
    console.log(appointmentData)
    try {
      const response = await axios.post(
        'http://localhost:5000/calculators/borrow',
        appointmentData
      );
      setSending(false);
      setTimeout(() => {
        setShowModal(false);
      }, 4000);
    } catch (error) {
      console.error('Error occurred during the request: ', error);
    }
  }

  return (
    <div>
      <Navbar/>
      <div>
        <h2 className="font-bold text-xl my-10 ml-10">Confirm Appointment</h2>
        <p className="my-10 ml-10">
          Your appointment will be on: {year}-{month}-{day} at {timeStart} to{" "}x
          {timeEnd}
        </p>
      </div>
      <div className="relative mb-3 ml-10" data-te-input-wrapper-init>
        <label> Please Describe the details of your appointment below.</label>
        <textarea
          className="peer block min-h-[auto] w-3/5 rounded border-1 bg-gray-100 mt-5"
          id="LargeTextInput"
          rows="4"
          placeholder="Write Here"
          onChange={(e) => setAppointmentDetails(e.target.value)}
          required
        ></textarea>
      </div>
      <div className="grid gap-20 mb-15 md:grid-cols-2">
          <div className="grid gap-20 mb-15 md:grid-cols-2 mt-8">
            <button
              className="transition ease-in-out duration-500 bg-black hover:bg-white w-full text-white hover:text-black font-semibold py-2 px-4 mx-10 mt-4 border border-black rounded"
              onClick={goBack}
            >
                
              Back
            </button>
            <button
              type="submit"
              onClick={handleConfirm}
              className="transition ease-in-out duration-500 bg-black hover:bg-white w-full text-white font-semibold hover:text-black py-2 px-4 mr-3 mt-4 border border-black hover:border-black rounded"
            >
              Confirm
            </button>
          </div>
        </div>
        <div
        className={`fixed bottom-4 left-4 text-white p-2 rounded shadow-lg z-50 ease-in-out duration-500 transition-opacity ${
          showModal ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className='flex items-center'>
          <p className='flex items-center text-[#059669] bg-[#D1FAE5] text-center rounded-full px-4 py-1'>
            {Sending ? 'Confirming...' : 'Confirmed'}
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

export default ConfirmAppointments;
