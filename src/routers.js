import { createBrowserRouter } from 'react-router-dom';
import { Moives, Tvs, SingUp, LogIn, Profile, Products } from './pages';
import Detail from './pages/Detail';
import ResetPassword from './pages/ResetPassword';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Moives />,
  },
  {
    path: '/tv',
    element: <Tvs />,
  },
  {
    path: '/signup',
    element: <SingUp />,
  },
  {
    path: '/login',
    element: <LogIn />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
  },
  {
    path: '/:pathname/:detailId', // url의 변수가 들어갈 땐 ':'
    element: <Detail />,
  },
  {
    path: '/product/:category',
    element: <Products />,
  },
]);

// URL 설계 : 소문자, camelCase 작성X, 단어와 단어 사이는 구분

export default router;
