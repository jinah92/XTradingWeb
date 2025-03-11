import { Outlet } from 'react-router-dom';

import LeftNavbar from '@/components/navbar/LeftNavbar';
import { BoardFeature } from '@/features';

export const BoardLayout = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-1 justify-center">
      <LeftNavbar className="sticky top-0 h-fit w-auto bg-white" />
      <div className="lg:top-0 h-fit lg:sticky lg:block hidden ml-1 lg:order-last">
        <BoardFeature.IdeaSearchBar />
      </div>
      <div className="flex-1 max-w-screen-md md:w-full px-2 order-last md:order-last lg:order-2 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};
