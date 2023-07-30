import React, {useState} from "react";
import { useParams, useNavigate } from "react-router-dom";

function ConfirmAppointments() {
  const { contact, year, month, day, timeEnd, timeStart } = useParams();
  const [appointmentDetails, setAppointmentDetails] = useState();
  const navigate= useNavigate()
  const goBack = () => {
    navigate(-1);
  }
  const handleConfirm = () => {
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
    console.log(appointmentData)
    fetch("your-backend-api-endpoint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response from the server
          // For example, show a success message or navigate to a different page
          console.log(data);
          navigate("/home"); // Redirect to the success page
        })
        .catch((error) => {
          // Handle any errors
          console.error(error);
        }); 
    };

  return (
    <div>
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
    </div>
  );
}

export default ConfirmAppointments;
