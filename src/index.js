import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import MainNavbar from "./pages/MainNavbar";
import NoPage from "./pages/NoPage";
import SuratKeluar from "./pages/SuratKeluar/SuratKeluar";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import { UpdateSuratKeluar } from "./pages/SuratKeluar/UpdateSuratKeluar";
import SuratMasuk from "./pages/SuratMasuk/SuratMasuk";
import {UpdateSuratMasuk} from "./pages/SuratMasuk/UpdateSuratMasuk";
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './Transitions.css'; // file CSS untuk animasi
import { useEffect } from "react";

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  useEffect(() => {
    if (isLoggedIn && (location.pathname === '/login' || location.pathname === '/register')) {
      // If user is logged in and on the login or register page, redirect to dashboard
      navigate('/');
    } else if (!isLoggedIn && location.pathname === '/register') {
      // If user is not logged in and on the register page, allow access
      return;
    } else if (!isLoggedIn && location.pathname !== '/login') {
      // If user is not logged in and not on the login page, redirect to login
      navigate('/login');
    }
  }, [isLoggedIn, location, navigate]);


  return (

    <Routes location={location}>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<MainNavbar />}>
        <Route index element={<Dashboard />} />
        <Route path="*" element={<NoPage />} />
        <Route path="/surat/keluar" element={<SuratKeluar />} />
        <Route path="/surat/keluar/:id" element={<UpdateSuratKeluar />} />
        <Route path="/surat/masuk" element={<SuratMasuk />} />
        <Route path="/surat/masuk" element={<UpdateSuratMasuk />} />
      </Route>
    </Routes>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<BrowserRouter><App /></BrowserRouter>);

