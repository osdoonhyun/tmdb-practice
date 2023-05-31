import { RouterProvider } from 'react-router-dom';
import router from './routers';
import Header from './components/Header';

export default function App() {
  return (
    <>
      <Header />
      <RouterProvider router={router} />
    </>
  );
}
