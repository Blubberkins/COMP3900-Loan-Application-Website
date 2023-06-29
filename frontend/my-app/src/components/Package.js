import React from 'react';

function Package({ pkg, onOpen }) {
  return (
    <div onClick={() => onOpen(pkg)}>
      <h2>{pkg.title}</h2>
      <p>{pkg.description}</p>
    </div>
  );
}

export default Package;
