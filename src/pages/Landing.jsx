import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  IconButton,
  useTheme
} from '@mui/material';

// Íconos
import PetsIcon from '@mui/icons-material/Pets';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Link } from 'react-router-dom';

export default function Landing({ toggleTheme, currentMode }) {
  const theme = useTheme();

  return (
    // bgcolor="background.default" sincroniza el fondo con el tema global
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: 'background.default', transition: 'all 0.3s ease' }}>
      
      {/* BARRA SUPERIOR (Mismo estilo oscuro/claro que el Dashboard) */}
      <AppBar position="static" elevation={0} sx={{ 
        backgroundColor: theme.palette.background.paper, 
        borderBottom: `1px solid ${theme.palette.divider}`,
        color: theme.palette.text.primary 
      }}>
        <Toolbar>
          <PetsIcon color="secondary" sx={{ mr: 1, fontSize: 30 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', color: theme.palette.primary.main }}>
            Save Pets
          </Typography>
          
          {/* Botones de navegación (como en tu imagen) */}
          <Button color="inherit" component={Link} to="/dashboard" sx={{ fontWeight: 'bold' }}>Dashboard</Button>
          <Button color="inherit" component={Link} to="/soporte" sx={{ fontWeight: 'bold' }}>Soporte</Button>
          <Button color="inherit" component={Link} to="/blog" sx={{ fontWeight: 'bold' }}>Blog</Button>
          
          {/* 🌙 BOTÓN PARA CAMBIAR TEMA ☀️ */}
          <IconButton color="inherit" onClick={toggleTheme} sx={{ ml: 1, mr: 2 }}>
            {currentMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>

          <Button variant="outlined" color="primary" sx={{ fontWeight: 'bold', borderRadius: '20px' }}>
            Descargar App
          </Button>
        </Toolbar>
      </AppBar>

      {/* SECCIÓN PRINCIPAL (Con el contenido y tu idea del proyecto) */}
      <Container maxWidth="lg" sx={{ mt: 10, mb: 8, textAlign: 'center' }}>
        {/* Usamos text.primary para que cambie de color según el tema y no se vuelva invisible */}
        <Typography variant="h2" component="h1" gutterBottom fontWeight="900" color="text.primary">
          El cuidado inteligente para tu mascota
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph sx={{ mb: 5, maxWidth: '800px', mx: 'auto' }}>
          Descubre Save Pets. Gestiona su salud, encuentra los mejores servicios, peluquerías con mapas interactivos y utiliza nuestra Inteligencia Artificial para recomendaciones personalizadas.
        </Typography>
        <Box sx={{ '& > button': { m: 1 } }}>
          {/* Botones con el estilo principal */}
          <Button variant="contained" size="large" color="primary" sx={{ fontWeight: 'bold', px: 4, py: 1.5, borderRadius: '30px' }}>
            COMENZAR GRATIS
          </Button>
          <Button variant="outlined" size="large" color="primary" sx={{ fontWeight: 'bold', px: 4, py: 1.5, borderRadius: '30px' }}>
            CONOCE EL PLAN PREMIUM
          </Button>
        </Box>
      </Container>

      {/* SECCIÓN DE PLANES (Las tarjetas oscuras/claras) */}
      <Container maxWidth="md">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            {/* Tarjeta Free */}
            <Card elevation={0} sx={{ border: `1px solid ${theme.palette.divider}`, bgcolor: 'background.paper', height: '100%', borderRadius: 3 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom color="primary" fontWeight="bold">
                  ⭐ Plan Free
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                  Accede a nuestro directorio de guarderías con mapa interactivo, reseñas de usuarios, recordatorios manuales de vacunación y consultas limitadas a nuestro chatbot de IA.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid size={{ xs: 12, md: 6 }}>
            {/* Tarjeta Premium */}
            <Card elevation={0} sx={{ border: `2px solid ${theme.palette.primary.main}`, bgcolor: 'background.paper', height: '100%', borderRadius: 3 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom color="primary" fontWeight="bold">
                  👑 Plan Premium
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                  Utiliza tu cámara para escanear a tu mascota y recibir recomendaciones de cortes con IA, obtén consultas ilimitadas con el chatbot avanzado y exporta historiales médicos completos.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}