import { RouterProvider } from 'react-router-dom';
import Moives from './pages/Moives';
import router from './routers';

export default function App() {
  return <RouterProvider router={router} />;
}
