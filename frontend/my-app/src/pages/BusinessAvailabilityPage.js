import React, { useState, useEffect } from 'react';

function BusinessAvailabilitiesPage() {
    const [availabilities, setAvailabilities] = useState({
        monday: Array(9).fill(false),
        tuesday: Array(9).fill(false),
        wednesday: Array(9).fill(false),
        thursday: Array(9).fill(false),
        friday: Array(9).fill(false),
      });
    
      const handleAvailabilityToggle = (day, timeSlot) => {
        setAvailabilities((prevAvailabilities) => {
          const updatedAvailabilities = {
            ...prevAvailabilities,
            [day]: [...prevAvailabilities[day]], // Create a new array for the specified day
          };
          updatedAvailabilities[day][timeSlot] = !updatedAvailabilities[day][timeSlot];
          return updatedAvailabilities;
        });
      };
      useEffect(() => {
        const fetchAvailabilities = async () => {
          try {
            // Fetch availabilities from the backend endpoint
            const response = await fetch('/api/availabilities');
            if (response.ok) {
              const data = await response.json();
              setAvailabilities(data);
            } else {
              console.error('Request failed:', response.status);
              // Optional: Handle the error
            }
          } catch (error) {
            console.error('Error fetching availabilities:', error);
            // Optional: Handle the error
          }
        };
    
        fetchAvailabilities();
      }, []);
      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(availabilities)
        try {
          const response = await fetch('/api/availabilities', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(availabilities),
          });
          if (response.ok) {
            const data = await response.json();
            console.log(data); // Optional: Handle the response from the backend
          } else {
            console.error('Request failed:', response.status);
            // Optional: Handle the error
          }
        } catch (error) {
          console.error('Error sending availabilities:', error);
          // Optional: Handle the error
        }
      };
    
      return (
        <div>
          <h3 className='text-xl font-bold my-4'>Set Availabilities</h3>
          <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-6 gap-2 mr-10'>
              <div className='font-semibold'>Time</div>
              <div className='font-semibold'>Monday</div>
              <div className='font-semibold'>Tuesday</div>
              <div className='font-semibold'>Wednesday</div>
              <div className='font-semibold'>Thursday</div>
              <div className='font-semibold'>Friday</div>
              {[...Array(9)].map((_, index) => (
                <React.Fragment key={index}>
                  <div className='font-semibold'>{`${index + 9}:00`}</div>
                  <div
                    className={`border border-gray-400 p-2 text-center ${
                      availabilities.monday[index] ? 'bg-green-300' : 'bg-gray-100'
                    }`}
                    onClick={() => handleAvailabilityToggle('monday', index)}
                  ></div>
                  <div
                    className={`border border-gray-400 p-2 text-center ${
                      availabilities.tuesday[index] ? 'bg-green-300' : 'bg-gray-100'
                    }`}
                    onClick={() => handleAvailabilityToggle('tuesday', index)}
                  ></div>
                  <div
                    className={`border border-gray-400 p-2 text-center ${
                      availabilities.wednesday[index] ? 'bg-green-300' : 'bg-gray-100'
                    }`}
                    onClick={() => handleAvailabilityToggle('wednesday', index)}
                  ></div>
                  <div
                    className={`border border-gray-400 p-2 text-center ${
                      availabilities.thursday[index] ? 'bg-green-300' : 'bg-gray-100'
                    }`}
                    onClick={() => handleAvailabilityToggle('thursday', index)}
                  ></div>
                  <div
                    className={`border border-gray-400 p-2 text-center ${
                      availabilities.friday[index] ? 'bg-green-300' : 'bg-gray-100'
                    }`}
                    onClick={() => handleAvailabilityToggle('friday', index)}
                  ></div>
                </React.Fragment>
              ))}
            </div>
            <button
              type='submit'
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded'
            >
              Save
            </button>
          </form>
        </div>
      );
    }

export default BusinessAvailabilitiesPage;
