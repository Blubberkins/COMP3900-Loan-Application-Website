import React from 'react';
import DashboardOverviewChart from './DashboardOverviewChart';

function DashboardOverview() {
  // use placeholders for now
  const loanApprovalRate = 1.0;
  const loanDelinquencyRate = 0;
  const averageLoanSize = 200000;

  const loanVolumeData = [
    { name: 'Loan Category 1', value: Math.floor(Math.random() * 50) },
    { name: 'Loan Category 2', value: Math.floor(Math.random() * 120) },
    { name: 'Loan Category 3', value: Math.floor(Math.random() * 130) },
    { name: 'Loan Category 4', value: Math.floor(Math.random() * 100) },
    { name: 'Loan Category 5', value: Math.floor(Math.random() * 100) },
    { name: 'Loan Category 6', value: Math.floor(Math.random() * 100) },
    { name: 'Loan Category 7', value: Math.floor(Math.random() * 100) },
    { name: 'Loan Category 8', value: Math.floor(Math.random() * 100) },
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
