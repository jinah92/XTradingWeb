import { Routes, Route } from 'react-router-dom';

/* page */
import MainLayout from '@/layout/MainLayout';
import NewsLayout from '@/layout/NewsLayout';
import Login from '@/pages/auth/Login';
import SignUp from '@/pages/auth/SignUp';
import Home from '@/pages/Home';
import Idea from '@/pages/idea/Idea';
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
          <Route path="/" element={<Home />}></Route>
          <Route path="/interest" element={<Interest />}></Route>
          <Route path="/market" element={<Market />}></Route>
          <Route path="/market/:marketId" element={<MarketDetail />} />
          <Route path="/chart" element={<ChartView />}></Route>
          <Route path="/idea" element={<Idea />}></Route>
          <Route path="/idea/:id" element={<Idea />}></Route>
          <Route path="/idea/:id/:item" element={<Idea />}></Route>
          <Route path="/mypage" element={<PrivateRoute element={<MyPage />} />}></Route>
        </Route>
        <Route element={<NewsLayout />}>
          <Route path="/news" element={<News />}></Route>
          <Route path="/news/:id" element={<News />}></Route>
        </Route>

        <Route path="/login" element={<Login />}></Route>
        <Route path="/signUp" element={<SignUp />}></Route>
        {/*// TODO: 404 처리 필요*/}
        {/*<Route component={NotFound} />*/}
      </Routes>
    </AuthProvider>
  );
}

export default CommonRouter;
