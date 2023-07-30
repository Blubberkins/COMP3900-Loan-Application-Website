import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs } from 'flowbite-react';

function ViewAppointmentPage() {
  const navigate = useNavigate();
  const [CurrDates, setCurrentDates] = useState([
    { date: '2023-07-17', isOpen: false, location: "sydney", timeStart: "6:45", timeEnd: "7:30", Contact: "09019032", name: "Bob Smith"},
    { date: '2023-07-17', isOpen: false, location: "sydney", timeStart: "6:45", timeEnd: "7:30", Contact: "09019032", name: "Bob Smith"},
    { date: '2023-07-17', isOpen: false, location: "sydney", timeStart: "6:45", timeEnd: "7:30", Contact: "09019032", name: "Bob Smith"},
  ]);
  const [PastDates, setPastDates] = useState([
    { date: '2023-07-17', isOpen: false, location: "Perth", timeStart: "6:45", timeEnd: "7:30", Contact: "09019032", name: "Bob Smith"},
    { date: '2023-07-17', isOpen: false, location: "Melbourne", timeStart: "6:45", timeEnd: "7:30", Contact: "09019032", name: "Bob Smith"},
    { date: '2023-07-17', isOpen: false, location: "sydney", timeStart: "6:45", timeEnd: "7:30", Contact: "09019032", name: "Bob Smith"},
  ]);
  const handleCurrentAccordionToggle = (index) => {
    setCurrentDates((prevDates) =>
      prevDates.map((date, i) => ({
        ...date,
        isOpen: i === index ? !date.isOpen : false,
      }))
    );
  };
  const handlePastAccordionToggle = (index) => {
    setPastDates((prevDates) =>
      prevDates.map((date, i) => ({
        ...date,
        isOpen: i === index ? !date.isOpen : false,
      }))
    );
  };
  useEffect(() => {
    // Fetch data from your backend API
    fetch('your-backend-api-endpoint')
      .then((response) => response.json())
      .then((data) => setCurrentDates(data))
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    // Fetch data from your backend API
    fetch('your-backend-api-endpoint')
      .then((response) => response.json())
      .then((data) => setPastDates(data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      <h3 className='text-xl col-span-2 my-10 font-bold ml-20'>
        My Appointments
      </h3>
      <Tabs.Group aria-label='default' style='default' className='ml-10'>
        <Tabs.Item title='Current'>
          <div className='mt-8'>
            {CurrDates.map((date, index) => (
              <div key={index} className='mb-4'>
                <button
                  className='bg-gray-200 py-2 px-4 text-left w-full text-black font-semibold'
                  onClick={() => handleCurrentAccordionToggle(index)}
                >
                  On {date.date} from {date.timeStart} to {date.timeEnd}
                </button>
                {date.isOpen && (
                  <div className='bg-white py-2 px-4 mt-2'>
                    {/* Render additional content inside the accordion */}
                    {/* For example: {date.details} */}
                    <dl className="max-w-md text-gray-900 divide-y divide-gray-200">
                        <div className="flex flex-col pb-3">
                            <dt className="mb-1 text-gray-500 md:text-lg">
                                Location
                            </dt>
                            <dd className="text-lg font-semibold">
                                {date.location}
                            </dd>
                        </div>
                        <div className="flex flex-col py-3">
                            <dt className="mb-1 text-gray-500 md:text-lg">
                                Contact Details
                            </dt>
                            <dd className="text-lg font-semibold">
                                {date.Contact}
                            </dd>
                        </div>
                        <div className="flex flex-col pt-3">
                            <dt className="mb-1 text-gray-500 md:text-lg">
                                Appointment with
                            </dt>
                            <dd className="text-lg font-semibold">
                                {date.name}
                            </dd>
                        </div>
                    </dl>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Tabs.Item>
        <Tabs.Item title='History'>
        <div className='mt-8'>
            {PastDates.map((date, index) => (
              <div key={index} className='mb-4'>
                <button
                  className='bg-gray-200 py-2 px-4 text-left w-full text-black font-semibold'
                  onClick={() => handlePastAccordionToggle(index)}
                >
                  On {date.date} from {date.timeStart} to {date.timeEnd}
                </button>
                {date.isOpen && (
                  <div className='bg-white py-2 px-4 mt-2'>
                    {/* Render additional content inside the accordion */}
                    {/* For example: {date.details} */}
                    <dl className="max-w-md text-gray-900 divide-y divide-gray-200">
                        <div className="flex flex-col pb-3">
                            <dt className="mb-1 text-gray-500 md:text-lg">
                                Location
                            </dt>
                            <dd className="text-lg font-semibold">
                                {date.location}
                            </dd>
                        </div>
                        <div className="flex flex-col py-3">
                            <dt className="mb-1 text-gray-500 md:text-lg">
                                Contact Details
                            </dt>
                            <dd className="text-lg font-semibold">
                                {date.Contact}
                            </dd>
                        </div>
                        <div className="flex flex-col pt-3">
                            <dt className="mb-1 text-gray-500 md:text-lg">
                                Appointment with
                            </dt>
                            <dd className="text-lg font-semibold">
                                {date.name}
                            </dd>
                        </div>
                    </dl>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Tabs.Item>
      </Tabs.Group>
    </div>
  );
}

export default ViewAppointmentPage;
