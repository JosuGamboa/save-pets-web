import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

// Importamos todas las páginas
import Landing from './pages/Landing';
import Soporte from './pages/Soporte';
import Dashboard from './pages/Dashboard';
import Blog from './pages/Blog';
import PlanFree from './pages/PlanFree';
import PlanPremium from './pages/PlanPremium';
import Negocios from './pages/Negocios';

// Importamos el Layout
import AdminLayout from './layouts/AdminLayout';

export default function App() {
  // 1. Estado para controlar el modo actual
  const [mode, setMode] = useState('light');

  // 2. Función que invierte el modo
  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  // 3. Tema dinámico
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {
                primary: { main: '#4FC3F7', contrastText: '#ffffff' },
                secondary: { main: '#FF9800', contrastText: '#ffffff' },
                background: { default: '#ffffff', paper: '#f8fafc' },
                text: { primary: '#2D3748', secondary: '#718096' },
                divider: '#e2e8f0',
              }
            : {
                primary: { main: '#90caf9', contrastText: '#000000' },
                secondary: { main: '#FFB74D', contrastText: '#000000' },
                background: { default: '#000000', paper: '#141414' },
                text: { primary: '#ffffff', secondary: '#aaaaaa' },
                divider: '#333333',
              }),
        },
        typography: {
          fontFamily: '"Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* EL LAYOUT COMO RUTA PADRE */}
          {/* Esto permite que el menú y las pestañas no se recarguen */}
          <Route path="/" element={<AdminLayout toggleTheme={toggleColorMode} currentMode={mode} />}>
            
            {/* RUTAS HIJAS (Se mostrarán donde pongamos el <Outlet /> en el AdminLayout) */}
            <Route index element={<Landing />} /> {/* "index" significa que carga en la ruta raíz '/' */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="soporte" element={<Soporte />} />
            <Route path="blog" element={<Blog />} />
            <Route path="plan-free" element={<PlanFree />} />
            <Route path="plan-premium" element={<PlanPremium />} />
            <Route path="negocios" element={<Negocios />} /> {/* <-- Añade esta línea */}
            
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}