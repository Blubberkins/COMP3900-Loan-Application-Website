import React from 'react';
import { useNavigate } from "react-router-dom";

function BusinessAppointmentPage() {
    const navigate = useNavigate();
    const handleChangeClick = () => {
      navigate("/BusinessAvailability");
    };
    const handleViewClick = () => {
      navigate("/BusinessViewAppointment")
    }
    return (
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="grid gap-20 mb-15 md:grid-cols-2 mt-8">
            <button
              type="submit"
              onClick={handleChangeClick}
              className="transition ease-in-out duration-500 bg-black hover:bg-white w-full text-white hover:text-black font-semibold py-2 px-4 mx-10 mt-4 border border-black rounded"
            >
              Change availability
            </button>
            <button
              type="submit"
              onClick={handleViewClick}
              className="transition ease-in-out duration-500 bg-black hover:bg-white w-full text-white font-semibold hover:text-black py-2 px-4 mr-3 mt-4 border border-black hover:border-black rounded"
            >
              View upcoming appointmenets
            </button>
          </div>
        </div>
      </section>
    );
}

export default BusinessAppointmentPage;
