import React from 'react';
import Main from '@/components/Main';
import Header from '@/components/Header';
import TopNavbar from '@/components/navbar/TopNavbar';

const NewsLayout: React.FC = () => {
  return (
    <div className="dark:bg-darkMode min-h-screen flex flex-col">
      <Header />
      <div className="flex justify-evenly flex-auto mt-[72px]">
        <main className="flex flex-col container w-screen md:w-10/12">
          <TopNavbar />
          <Main />
        </main>
      </div>
    </div>
  );
};

export default NewsLayout;
