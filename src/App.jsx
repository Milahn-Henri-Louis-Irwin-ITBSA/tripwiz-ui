import './index.css';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Map from '@/views/Map.jsx';
import Login from '@/views/Login.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Map />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        pauseOnFocusLoss
        theme="light"
      />
    </div>
  );
}
