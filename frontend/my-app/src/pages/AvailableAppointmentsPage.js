import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function AvailableAppointments() {
  const navigate = useNavigate();
  const { year, month, day } = useParams();
  const [Dates, setDates] = useState([
    {
      isOpen: false,
      location: "sydney",
      timeStart: "6:45",
      timeEnd: "7:30",
      Contact: "09019032",
      name: "Bob Smith",
    },
    {
      isOpen: false,
      location: "sydney",
      timeStart: "6:45",
      timeEnd: "7:30",
      Contact: "09019032",
      name: "Bob Smith",
    },
    {
      isOpen: false,
      location: "sydney",
      timeStart: "6:45",
      timeEnd: "7:30",
      Contact: "09019032",
      name: "Bob Smith",
    },
    {
      date: '2023-08-5',
      isOpen: false,
      location: 'sydney',
      timeStart: '9:00',
      timeEnd: '10:00',
      Contact: '0123456789',
      name: 'John Jonathan',
    },
    {
      date: '2023-08-5',
      isOpen: false,
      location: 'sydney',
      timeStart: '10:00',
      timeEnd: '11:00',
      Contact: '0123456789',
      name: 'John Jonathan',
    },
    {
      date: '2023-08-5',
      isOpen: false,
      location: 'sydney',
      timeStart: '11:00',
      timeEnd: '12:00',
      Contact: '0123456789',
      name: 'John Jonathan',
    },
    {
      date: '2023-08-5',
      isOpen: false,
      location: 'sydney',
      timeStart: '14:00',
      timeEnd: '15:00',
      Contact: '0123456789',
      name: 'John Jonathan',
    },
    {
      date: '2023-08-5',
      isOpen: false,
      location: 'sydney',
      timeStart: '15:00',
      timeEnd: '16:00',
      Contact: '0123456789',
      name: 'John Jonathan',
    },
    {
      date: '2023-08-5',
      isOpen: false,
      location: 'sydney',
      timeStart: '17:00',
      timeEnd: '18:00',
      Contact: '0123456789',
      name: 'John Jonathan',
    },
  ]);
  const [appointment, setAppointmnet] = useState();
  const handleAccordionToggle = (index) => {
    setDates((Dates) =>
      Dates.map((date, i) => ({
        ...date,
        isOpen: i === index ? !date.isOpen : false,
      }))
    );
  };
  useEffect(() => {
    // Fetch data from your backend API
    const apiUrl = `your-backend-api-endpoint?year=${year}&month=${month}&day=${day}`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setDates(data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      <Navbar/>
      <div>
      <h3 className='text-xl col-span-2 my-10 font-bold ml-20'>
        Available Appointments
      </h3>
        <p className='text-xl col-span-2 my-10 font-bold ml-20'>
          Selected Date: {year}-{month}-{day}
        </p>
      </div>
      <div className="mt-8 ml-20 mr-20">
        {Dates.map((date, index) => (
          <div key={index} className="mb-4">
            <button
              className="bg-gray-200 py-2 px-4 text-left w-full text-black font-semibold"
              onClick={() => handleAccordionToggle(index)}
            >
              from {date.timeStart} to {date.timeEnd}
            </button>
            {date.isOpen && (
              <div className="bg-white py-2 px-4 mt-2">
                {/* Render additional content inside the accordion */}
                {/* For example: {date.details} */}
                <dl className="max-w-md text-gray-900 divide-y divide-gray-200">
                  <div className="flex flex-col pb-3">
                    <dt className="mb-1 text-gray-500 md:text-lg">Location</dt>
                    <dd className="text-lg font-semibold">{date.location}</dd>
                  </div>
                  <div className="flex flex-col py-3">
                    <dt className="mb-1 text-gray-500 md:text-lg">
                      Contact Details
                    </dt>
                    <dd className="text-lg font-semibold">{date.Contact}</dd>
                  </div>
                  <div className="flex flex-col pt-3">
                    <dt className="mb-1 text-gray-500 md:text-lg">
                      Appointment with
                    </dt>
                    <dd className="text-lg font-semibold">{date.name}</dd>
                  </div>
                  <div className="pt-5">
                    <Link
                      to={`/confirmAppointments/${date.Contact}/${year}/${month}/${day}/${date.timeEnd}/${date.timeStart}`}
                      className="transition ease-in-out duration-500 bg-black hover:bg-white w-full text-white hover:text-black font-semibold py-2 px-4 border border-black rounded"
                    >
                      Make an appointment
                    </Link>
                  </div>
                </dl>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AvailableAppointments;
