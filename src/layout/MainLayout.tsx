import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from '@/components/Header';

function MainLayout() {
  return (
    <div className="dark:bg-darkMode min-h-screen flex flex-col h-screen">
      <Header></Header>
      <div className="mt-[72px] overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
