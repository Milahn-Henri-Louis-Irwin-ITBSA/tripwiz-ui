import './index.css';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Map from '@/views/Map.jsx';
import Login from '@/views/Login.jsx';

export default function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Map />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  );
}
