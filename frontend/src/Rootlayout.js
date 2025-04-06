// components/Rootlayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';

const Rootlayout = () => {
  return (
    <div>
      {/* You can add a navbar or shared layout here if needed */}
      <Outlet />
    </div>
  );
};

export default Rootlayout;
