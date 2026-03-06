import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom'; // Importantes para navegar
import { 
  Box, AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, 
  ListItemButton, ListItemIcon, ListItemText, Tabs, Tab, Collapse, useTheme
} from '@mui/material';

// Íconos
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import CloseIcon from '@mui/icons-material/Close';
import PetsIcon from '@mui/icons-material/Pets';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import HomeIcon from '@mui/icons-material/Home';
import StorefrontIcon from '@mui/icons-material/Storefront';

const drawerWidth = 240;

export default function AdminLayout({ toggleTheme, currentMode }) {
  const theme = useTheme(); 
  const navigate = useNavigate();
  const location = useLocation(); // Nos dice en qué URL estamos

  const [openSidebar, setOpenSidebar] = useState(true);
  const [openUsersMenu, setOpenUsersMenu] = useState(false);
  
  // Estado inicial de las pestañas
  const [tabs, setTabs] = useState([
    { path: '/', label: 'Inicio' }
  ]);

  // EFECTO MAGICO: Cada vez que la URL cambia, revisamos si hay que abrir una nueva pestaña
  useEffect(() => {
    const currentPath = location.pathname;
    const tabExists = tabs.find(t => t.path === currentPath);

    if (!tabExists) {
      // Le asignamos un nombre a la pestaña según la URL
      let label = 'Nueva Pestaña';
      if (currentPath === '/dashboard') label = 'Dashboard';
      if (currentPath === '/plan-free') label = 'Plan Free';
      if (currentPath === '/plan-premium') label = 'Plan Premium';

      setTabs(prev => [...prev, { path: currentPath, label }]);
    }
  }, [location.pathname]); // Se ejecuta cuando cambia la URL

  // Funciones de navegación
  const handleUsersClick = () => setOpenSidebar(true) || setOpenUsersMenu(!openUsersMenu);
  
  // Cuando haces clic en una pestaña de arriba
  const handleTabChange = (event, newPath) => {
    navigate(newPath);
  };

  // Cuando cierras una pestaña
  const handleCloseTab = (e, tabPathToClose) => {
    e.stopPropagation();
    const newTabs = tabs.filter(t => t.path !== tabPathToClose);
    
    // Al menos dejar la pestaña de inicio abierta
    if (newTabs.length === 0) {
      newTabs.push({ path: '/', label: 'Inicio' });
    }
    
    setTabs(newTabs);

    // Si cerramos la pestaña que estábamos viendo, saltar a la última pestaña abierta
    if (location.pathname === tabPathToClose) {
      navigate(newTabs[newTabs.length - 1].path);
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      
      {/* BARRA LATERAL (SIDEBAR) */}
      <Drawer
        variant="persistent"
        open={openSidebar}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': { 
            width: drawerWidth, boxSizing: 'border-box',
            backgroundColor: theme.palette.background.paper, 
            borderRight: `1px solid ${theme.palette.divider}`,
          },
        }}
      >
        <Toolbar sx={{ justifyContent: 'center', py: 2 }}>
          <PetsIcon color="secondary" sx={{ mr: 1, fontSize: 30 }} />
          <Typography variant="h6" fontWeight="bold" color="primary">Save Pets</Typography>
        </Toolbar>
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {/* BOTÓN INICIO */}
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate('/')} selected={location.pathname === '/'}>
                <ListItemIcon><HomeIcon color="primary" /></ListItemIcon>
                <ListItemText primary="Inicio" />
              </ListItemButton>
            </ListItem>

            {/* BOTÓN DASHBOARD */}
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate('/dashboard')} selected={location.pathname === '/dashboard'}>
                <ListItemIcon><DashboardIcon color="primary" /></ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
            
            {/* MENÚ USUARIOS DESPLEGABLE */}
            <ListItem disablePadding>
              <ListItemButton onClick={handleUsersClick}>
                <ListItemIcon><PeopleIcon color="primary" /></ListItemIcon>
                <ListItemText primary="Usuarios" />
                {openUsersMenu ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={openUsersMenu} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {/* BOTÓN PLAN FREE */}
                <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/plan-free')} selected={location.pathname === '/plan-free'}>
                  <ListItemText primary="Plan Free" />
                </ListItemButton>
                {/* BOTÓN PLAN PREMIUM */}
                <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/plan-premium')} selected={location.pathname === '/plan-premium'}>
                  <ListItemText primary="Plan Premium" />
                </ListItemButton>
              </List>
            </Collapse>
            {/* BOTÓN CENTROS ASOCIADOS */}
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate('/negocios')} selected={location.pathname === '/negocios'}>
                <ListItemIcon><StorefrontIcon color="primary" /></ListItemIcon>
                <ListItemText primary="Centros Asociados" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* CONTENIDO PRINCIPAL */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* BARRA SUPERIOR */}
        <AppBar position="static" elevation={0} sx={{ 
          backgroundColor: theme.palette.background.paper, 
          borderBottom: `1px solid ${theme.palette.divider}`, color: theme.palette.text.primary 
        }}>
          <Toolbar variant="dense">
            <IconButton edge="start" color="inherit" onClick={() => setOpenSidebar(!openSidebar)} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Box sx={{ flexGrow: 1 }} />
            <IconButton color="inherit" onClick={toggleTheme}>
              {currentMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* BARRA DE PESTAÑAS DINÁMICAS */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: theme.palette.background.default, display: 'flex', px: 1 }}>
          <Tabs 
            value={location.pathname} // La pestaña activa es la URL actual
            onChange={handleTabChange} 
            variant="scrollable"
            scrollButtons="auto"
            TabIndicatorProps={{ style: { backgroundColor: theme.palette.primary.main } }} 
            sx={{ minHeight: '40px' }}
          >
            {tabs.map((tab) => (
              <Tab 
                key={tab.path} 
                value={tab.path} // El valor de la pestaña es su ruta
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {tab.label}
                    <IconButton size="small" component="span" onClick={(e) => handleCloseTab(e, tab.path)} sx={{ ml: 1, p: 0.5 }}>
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                }
                sx={{ 
                  minHeight: '40px', py: 0, px: 2, textTransform: 'none', fontWeight: 'bold',
                  borderRight: `1px solid ${theme.palette.divider}`,
                  backgroundColor: location.pathname === tab.path ? theme.palette.background.paper : 'transparent',
                  color: location.pathname === tab.path ? theme.palette.primary.main : theme.palette.text.secondary,
                  '&.Mui-selected': { color: theme.palette.primary.main }
                }}
              />
            ))}
          </Tabs>
        </Box>

        {/* AQUÍ SE RENDERIZA EL CONTENIDO DE LA PÁGINA (Outlet en lugar de children) */}
        <Box component="main" sx={{ flexGrow: 1, p: 4, backgroundColor: theme.palette.background.default, overflow: 'auto' }}>
          <Outlet /> 
        </Box>

      </Box>
    </Box>
  );
}