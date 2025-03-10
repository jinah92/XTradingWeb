import { Routes, Route } from 'react-router-dom';

/* page */
import { BoardLayout } from '@/layout/BoardLayout';
import MainLayout from '@/layout/MainLayout';
import NewsLayout from '@/layout/NewsLayout';
import Login from '@/pages/auth/Login';
import SignUp from '@/pages/auth/SignUp';
import Home from '@/pages/Home';
import FeedListPage from '@/pages/idea/feed-list-page';
import IdeaListPage from '@/pages/idea/idea-list-page';
import Interest from '@/pages/interest/Interest';
import ChartView from '@/pages/market/ChartView';
import Market from '@/pages/market/Market';
import MyPage from '@/pages/mypage/MyPage';
import News from '@/pages/news/News';
import { AuthProvider } from '@/router/AuthContext';
import PrivateRoute from '@/router/PrivateRoute';

import MarketDetail from '../pages/market/MarketDetail';

function CommonRouter() {
  return (
    <AuthProvider>
      <Routes>
        {/* // <Route>의 element에 레이아웃을 넣어준다. */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/interest" element={<Interest />} />
          <Route path="/market" element={<Market />} />
          <Route path="/market/:marketId" element={<MarketDetail />} />
          <Route path="/chart" element={<ChartView />} />
          <Route element={<BoardLayout />}>
            <Route path="/board/idea" element={<IdeaListPage />} />
            <Route path="/board/feed" element={<FeedListPage />} />
          </Route>
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/mypage" element={<MyPage />} />
        </Route>
        <Route element={<NewsLayout />}>
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<News />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        {/*// TODO: 404 처리 필요*/}
        {/*<Route component={NotFound} />*/}
      </Routes>
    </AuthProvider>
  );
}

export default CommonRouter;
