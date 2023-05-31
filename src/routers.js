import { createBrowserRouter } from 'react-router-dom';
import Moives from './pages/Moives';
import Tvs from './pages/Tvs';
import Detail from './pages/Detail';

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
    path: '/:pathname/:detailId', // url의 변수가 들어갈 땐 ':'
    element: <Detail />,
  },
]);

export default router;
