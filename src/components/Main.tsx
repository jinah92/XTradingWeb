import React from 'react';
import { Outlet } from 'react-router-dom';

const Main: React.FC = () => {
  return (
    // <div className="flex-1  dark:bg-darkMode">
    <Outlet />
    // </div>
  );
};

export default Main;
