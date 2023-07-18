import React from 'react';
import Calendar from '../components/DatePicker';

function MakeAppointmentPage() {
  return (
    <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className='font-bold my-10 front-2xl'>
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
