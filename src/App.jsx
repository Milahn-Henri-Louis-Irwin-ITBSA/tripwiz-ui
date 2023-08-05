import './index.css';
import './App.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Map from '@/views/Map.jsx';
import Login from '@/views/Login.jsx';

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Map />} />,
      <Route path='/login' element={<Login />} />,
    ),
  );
  return (
    <RouterProvider router={router} />
  );
}
