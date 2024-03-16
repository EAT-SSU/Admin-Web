import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login/Login";
import Manage from "./components/Manage/Manage";
import { ThemeProvider } from "@mui/material/styles";
import GlobalStyle from "./styles/globalStyle";
import { theme } from "./styles/theme";

function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route path="/manage" element={<Manage />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

function Home() {
  const { getLoggedIn } = useAuth();

  return getLoggedIn ? <Navigate to="/manage" /> : <Navigate to="/login" />;
}

export default App;
