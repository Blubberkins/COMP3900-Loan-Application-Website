import React from 'react';
import { useParams } from 'react-router-dom';

function AvailableAppointments() {
  const { year, month, day } = useParams();

  return (
    <div>
      <h2>Available Appointments</h2>
      <p>Selected Date: {year}-{month}-{day}</p>
      {/* Add your content and components for the Available Appointments page */}
    </div>
  );
}

export default AvailableAppointments;