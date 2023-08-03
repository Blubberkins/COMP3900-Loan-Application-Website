import React, { createContext, useState } from 'react';

export const LoanContext = createContext();

export const LoanProvider = (props) => {
  const [loanDetails, setLoanDetails] = useState({
    propertyType: '',
    loanPurpose: '',
    depositAmount: ''
  });

  return (
    <LoanContext.Provider value={{ loanDetails, setLoanDetails }}>
      {props.children}
    </LoanContext.Provider>
  );
};
