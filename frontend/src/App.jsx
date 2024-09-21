import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import AppContext from "./context/AppContext";
import {
  Home,
  NotFound,
  UserRegister,
  RegistroGE,
  RegisterAcademicPeriod,
  ImageUpload,
  Login,
  VerifyEmail,
  Example,
  InvitacionesGE,
  SolicitudesGE,
  EditarListaGE,
  ConformacionGE,
} from "./pages";
import {
  Planificacion,
  AppBarWithMenu,
  AcademicPeriodList,
  EnrollToAcademicPeriod,
  CompanyList
} from "./components";
import { useEffect } from "react";

import VerGE from "./pages/VerGE";
import EditarHito from "./components/EditarHito";

function App({ toggleTheme, isDarkMode }) {
  const { user } = useContext(AppContext);
  const userType = user ? user.user_type : "guest";

  return (
    <>
      <AppBarWithMenu
        darkMode={isDarkMode}
        toggleDarkMode={toggleTheme}
        userType={userType}
      />

      <Routes>
        <Route path="/register" element={<UserRegister />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/enroll-to-ap" element={<EnrollToAcademicPeriod />} />
        <Route path="/vergrupoe/:id" element={<VerGE />} />
        <Route path="/registroge" element={<RegistroGE />} />
        <Route path="/invitacionesge" element={<InvitacionesGE />} />
        <Route path="/conformacionge" element={<ConformacionGE />} />
        <Route path="/editarlistage" element={<EditarListaGE />} />
        <Route path="/academic-periods" element={<AcademicPeriodList />} />
        <Route path="/register-ap" element={<RegisterAcademicPeriod />} />
        <Route path="/registerplan" element={<Planificacion />} />
        
        <Route path="/edithito/:id" element={<EditarHito />} />
        <Route path="/academic-period/:id/companies" element={<CompanyList />} />
        <Route path="/academic-period/:id/pending" element={<SolicitudesGE />} />

        <Route path="/upload" element={<ImageUpload />} />
        <Route path="/example" element={<Example />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
