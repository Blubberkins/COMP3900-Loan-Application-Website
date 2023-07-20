import React from 'react';
import DashboardOverviewChart from './DashboardOverviewChart';


function DashboardOverview() {
  // use placeholders for now
  const loanVolume = 500;
  const loanApprovalRate = 0.85;
  const loanDelinquencyRate = 0.1;
  const averageLoanSize = 2000;

  // sample data for pie charts
  const loanVolumeData = [
    { name: 'Loan Volume', value: loanVolume },
  ];

  const loanApprovalRateData = [
    { name: 'Loan Approval Rate', value: loanApprovalRate },
  ];

  const loanDelinquencyRateData = [
    { name: 'Loan Delinquency Rate', value: loanDelinquencyRate },
  ];

  const averageLoanSizeData = [
    { name: 'Average Loan Size', value: averageLoanSize },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Overview</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-xl font-semibold mb-2">Loan volume</h3>
          <p>{loanVolume}</p>
          <DashboardOverviewChart data={loanVolumeData} />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Loan approval rate</h3>
          <p>{loanApprovalRate}</p>
          <DashboardOverviewChart data={loanApprovalRateData} />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Loan delinquency rate</h3>
          <p>{loanDelinquencyRate}</p>
          <DashboardOverviewChart data={loanDelinquencyRateData} />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Average loan size</h3>
          <p>{averageLoanSize}</p>
          <DashboardOverviewChart data={averageLoanSizeData} />
        </div>
      </div>
    </div>
  );
}

export default DashboardOverview;
