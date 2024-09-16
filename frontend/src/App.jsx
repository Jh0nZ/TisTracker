import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Home,
  NotFound,
  UserRegister,
  RegistroGE,
  RegistroPeriodoAcademico,
  ImageUpload,
  Login,
  VerifyEmail,
  Example,
} from "./pages";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, useMediaQuery, IconButton } from "@mui/material";
import { AppProvider } from "./context/AppContext";
import { Sidebar, Planificacion } from "./components";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#a5d6a7", // Verde pastel
    },
    secondary: {
      main: "#ffab91", // Coral pastel
    },
    error: {
      main: "#f48fb1", // Rosa pastel
    },
    warning: {
      main: "#ffe082", // Amarillo pastel
    },
    info: {
      main: "#81d4fa", // Azul pastel
    },
    success: {
      main: "#c5e1a5", // Verde claro pastel
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#80e27e", // Verde pastel claro
    },
    secondary: {
      main: "#ffab91", // Coral pastel
    },
    error: {
      main: "#f48fb1", // Rosa pastel
    },
    warning: {
      main: "#ffe082", // Amarillo pastel
    },
    info: {
      main: "#81d4fa", // Azul pastel
    },
    success: {
      main: "#c5e1a5", // Verde claro pastel
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode === "true";
  });

  const theme = darkMode ? darkTheme : lightTheme;
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);
  const [hideSidebar, setHideSidebar] = useState(false);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppProvider>
          <Sidebar
            open={open}
            setOpen={setOpen}
            hideSidebar={hideSidebar}
            setHideSidebar={setHideSidebar}
          />
          <IconButton
            onClick={toggleDarkMode}
            style={{ position: "fixed", top: 16, right: 16, zIndex: 1200 }}
          >
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <main
            style={{
              padding: "16px",
              marginLeft: hideSidebar ? 0 : isSmallScreen ? 0 : 240,
              transition: "margin-left 0.3s ease",
              position: "relative",
              zIndex: 1,
            }}
          >
            <Routes>
              <Route path="/register" element={<UserRegister />} />
              <Route path="/login" element={<Login />} />
              <Route path="/verify-email/:token" element={<VerifyEmail />} />

              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />

              <Route path="/registroge" element={<RegistroGE />} />
              <Route
                path="/registroperiodoacademico"
                element={<RegistroPeriodoAcademico />}
              />
              <Route path="/registerplan" element={<Planificacion />} />
              <Route path="/upload" element={<ImageUpload />} />

              <Route path="/example" element={<Example />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </main>
        </AppProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
