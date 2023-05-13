import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import MainNavbar from "./pages/MainNavbar";
import NoPage from "./pages/NoPage";
import SuratKeluar from "./pages/SuratKeluar/SuratKeluar";
import { UpdateSuratKeluar } from "./pages/SuratKeluar/UpdateSuratKeluar";
import SuratMasuk from "./pages/SuratMasuk";
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './Transitions.css'; // file CSS untuk animasi

export default function App() {
  const location = useLocation();
  return (

    <Routes location={location}>
      <Route path="/" element={<MainNavbar />}>
        <Route index element={<Dashboard />} />
        <Route path="*" element={<NoPage />} />
        <Route path="/surat/keluar" element={<SuratKeluar />} />
        <Route path="/surat/keluar/:id" element={<UpdateSuratKeluar />} />
        <Route path="/surat/masuk" element={<SuratMasuk />} />
      </Route>
    </Routes>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<BrowserRouter><App /></BrowserRouter>);

