import React from 'react';
import { Calculator } from '../components/Calculator';
import Navbar from '../components/Navbar';

const CalculatorPage = () => {
  return (
    <div>
      <Navbar />
      <div className='mt-10'>
        <Calculator />
      </div>
    </div>
  );
};

export default CalculatorPage;
