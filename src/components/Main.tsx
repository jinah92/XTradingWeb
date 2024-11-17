import React from "react";
import { Outlet } from "react-router-dom";

const Main: React.FC = () => {
  return (
    <div className="flex-1 md:p-4 dark:bg-darkMode">
      <Outlet />
    </div>
  );
};

export default Main;
