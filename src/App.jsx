import './index.css';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Map from '@/views/Map.jsx';
import Login from '@/views/Login.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/utils/firebase-config';
import Logo from '@/icons/SidebarLogo.png';
export default function App() {
  const [_, loading] = useAuthState(auth);
  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <img src={Logo} alt="loading-logo" />
      </div>
    );
  }
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
