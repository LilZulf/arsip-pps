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
import { UpdateSuratMasuk } from "./pages/SuratMasuk/UpdateSuratMasuk";
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './Transitions.css'; // file CSS untuk animasi
import { useEffect } from "react";

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/isLogin`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` // Include the token in the request headers
          }
        });

        // Token is valid, you can choose to handle the response here if needed
        console.log(response); // Example: { user: { id: 2, name: "Ahmad Zulfan Najib", email: ... } }
      } catch (error) {
        // If the API returns an error, the token is either blacklisted or expired
        localStorage.clear();
        navigate('/login');
      }
    };

    if (isLoggedIn && (location.pathname === '/login' || location.pathname === '/register')) {
      // If user is logged in and on the login or register page, redirect to dashboard
      fetchData();
      navigate('/');
    } else if (!isLoggedIn && location.pathname === '/register') {
      // If user is not logged in and on the register page, allow access
      return;
    } else if (!isLoggedIn && location.pathname !== '/login') {
      // If user is not logged in and not on the login page, check token validity
      fetchData();
      navigate('/login');
    }
  }, [isLoggedIn, location, navigate]);



  return (

    <Routes location={location}>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<NoPage />} />
      <Route path="/" element={<MainNavbar />}>
        <Route index element={<Dashboard />} />
        <Route path="*" element={<NoPage />} />
        <Route path="/surat/keluar" element={<SuratKeluar />} />
        <Route path="/surat/keluar/:id" element={<UpdateSuratKeluar />} />
        <Route path="/surat/masuk" element={<SuratMasuk />} />
        <Route path="/surat/masuk/:id" element={<UpdateSuratMasuk />} />
      </Route>
    </Routes>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<BrowserRouter><App /></BrowserRouter>);

