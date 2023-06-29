import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// add the handleEdit prop here
function PackageDetail({ pkg, handleEdit }) { 
  const navigate = useNavigate();

  // backend logic for editing package
  const handleEditPackage = handleEdit || (() => {
    // redirect to the EditPackage storyboard with the package id
    navigate(`/edit-package/${pkg.id}`);
  });

  return (
    <div className="grid grid-cols-2 items-start gap-4">
      <div>
        <Button variant="contained" onClick={handleEditPackage}>
          Edit/New Package
        </Button>
        <h2 className="mt-4">{pkg.title}</h2>
      </div>
      <div className="border-l pl-4">
        <p>{pkg.description}</p>
      </div>
    </div>
  );
}

export default PackageDetail;
