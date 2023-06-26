import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

const AccountType = () => {
  const navigate = useNavigate();
  const handlePersonalClick = () => {
    navigate("/registerC");
  };
  const handleBusinessClick = () => {
    navigate("/registerB")
  }
  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Which Account Type would you like to create
        </h1>

        <div className="grid gap-20 mb-15 md:grid-cols-2 mt-8">
          <button
            type="submit"
            onClick={handlePersonalClick}
            className="transition ease-in-out duration-500 bg-transparent hover:bg-gray-300 w-full text-black font-semibold py-2 px-4 mr-3 mt-4 border border-black rounded"
          >
            Personal
          </button>
          <button
            type="submit"
            onClick={handleBusinessClick}
            className="transition ease-in-out duration-500 bg-transparent hover:bg-[#9b774e] w-full text-black font-semibold hover:text-white py-2 px-4 mr-3 mt-4 border border-black hover:border-transparent rounded"
          >
            Business
          </button>
        </div>
      </div>
    </section>
  );
};

export default AccountType;
