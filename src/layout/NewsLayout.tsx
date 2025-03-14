import React from 'react';
import { Outlet } from 'react-router-dom';

import TopNavbar from '@/components/navbar/TopNavbar';

const NewsLayout: React.FC = () => {
  return (
    <div className="mx-2">
      <div className="h-fit sticky top-0 py-2 z-10 bg-white w-auto flex justify-center">
        <TopNavbar />
      </div>
      <div className="flex flex-col gap-1 justify-center w-full max-w-screen-xl m-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default NewsLayout;
