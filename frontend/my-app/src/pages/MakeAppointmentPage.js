import React from 'react';
import Calendar from '../components/DatePicker';
import Navbar from '../components/Navbar';

function MakeAppointmentPage() {
  return (
    <section className="bg-gray-50">
      <Navbar/>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className='font-bold my-10 text-2xl'>
                Please Select a Day for your appointment
            </div>
            <div>
                <Calendar></Calendar>
            </div>
        </div>
      </section>
  );
}

export default MakeAppointmentPage;
