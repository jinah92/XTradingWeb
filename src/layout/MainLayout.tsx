import Main from '@/components/Main';
import Header from '@/components/Header';
import React from 'react';

function MainLayout() {
  return (
    <div className="dark:bg-darkMode h-screen flex flex-col">
      <Header></Header>
      <div className="mt-[72px]">
        <Main></Main>
      </div>
    </div>
  );
}

export default MainLayout;
