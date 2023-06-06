import { createBrowserRouter } from 'react-router-dom';
// import Moives from './pages/Moives';
// import Tvs from './pages/Tvs';
import { Moives, Tvs, SingUp, LogIn, Profile } from './pages';
import Detail from './pages/Detail';
// import SingUp from './pages/SingUp';
// import LogIn from './pages/LogIn';
// import Profile from './pages/Profile';
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
]);

export default router;
