import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Button, Container, Box, Grid, Card, 
  CardContent, IconButton, Paper, Avatar, Divider, Chip, useTheme,
  Accordion, AccordionSummary, AccordionDetails, Fab, TextField,
  Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress, Alert // <-- NUEVOS IMPORTADOS
} from '@mui/material';

// Íconos
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PetsIcon from '@mui/icons-material/Pets';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import AppleIcon from '@mui/icons-material/Apple';
import ShopIcon from '@mui/icons-material/Shop';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import MapIcon from '@mui/icons-material/Map';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import StarIcon from '@mui/icons-material/Star';
import { Link } from 'react-router-dom';

// La magia del QR
import { QRCodeCanvas } from 'qrcode.react';

export default function Landing({ toggleTheme, currentMode }) {
  const theme = useTheme();
  // Controla si el chat está abierto o cerrado
  const [openChat, setOpenChat] = useState(false); 

  // --- LÓGICA DE REGISTRO CON EL BACKEND ---
  const [openRegister, setOpenRegister] = useState(false); // Abre/cierra la ventana
  const [loading, setLoading] = useState(false); // Controla el circulito de carga
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' }); // Mensaje de éxito/error
  const [formData, setFormData] = useState({
    nombre_completo: '',
    correo: '',
    nombre_mascota: ''
  });

  // Actualiza los datos mientras el usuario escribe
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Envía los datos a FastAPI
  const handleRegistrar = async () => {
    setLoading(true);
    setMensaje({ tipo: '', texto: '' });

    try {
      const response = await fetch('http://localhost:8000/usuarios/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();

      if (response.ok) {
        setMensaje({ tipo: 'success', texto: '¡Registro exitoso! Bienvenido a Save Pets 🐾' });
        setFormData({ nombre_completo: '', correo: '', nombre_mascota: '' }); // Limpia el formulario
        setTimeout(() => setOpenRegister(false), 2500); // Cierra la ventana tras 2.5 seg
      } else {
        // Muestra el error que mande FastAPI (ej. "El correo ya existe")
        setMensaje({ tipo: 'error', texto: data.detail || 'Hubo un error al registrar.' });
      }
    } catch (error) {
      setMensaje({ tipo: 'error', texto: 'Error de conexión. Asegúrate de que el backend en Python esté encendido.' });
    }
    
    setLoading(false);
  };

  const enlaceDescarga = "https://savepets.com/descargar";

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: 'background.default', transition: 'all 0.3s ease' }}>
      
      {/* 1. BARRA SUPERIOR (Sólida y natural para vista de pestañas) */}
      <AppBar position="static" elevation={0} sx={{ 
        backgroundColor: theme.palette.background.default, // Color sólido igual al fondo
        borderBottom: `1px solid ${theme.palette.divider}`,
        color: theme.palette.text.primary,
        py: 0.5 // Un toque extra de espacio arriba y abajo
      }}>
        <Toolbar>
          <PetsIcon color="secondary" sx={{ mr: 1, fontSize: 30 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', color: theme.palette.primary.main }}>
            Save Pets
          </Typography>
          
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Button color="inherit" component={Link} to="/dashboard" sx={{ fontWeight: 'bold' }}>Dashboard</Button>
            <Button color="inherit" component={Link} to="/soporte" sx={{ fontWeight: 'bold' }}>Soporte</Button>
            <Button color="inherit" component={Link} to="/blog" sx={{ fontWeight: 'bold' }}>Blog</Button>
          </Box>
          
          <IconButton color="inherit" onClick={toggleTheme} sx={{ ml: 1, mr: 2 }}>
            {currentMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>

          <Button variant="contained" color="primary" href="#descargar" sx={{ fontWeight: 'bold', borderRadius: '20px' }}>
            Descargar App
          </Button>
        </Toolbar>
      </AppBar>

      {/* 2. SECCIÓN HERO (Principal) */}
      <Container maxWidth="lg" sx={{ pt: 12, pb: 8, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom fontWeight="900" color="text.primary" sx={{ fontSize: { xs: '3rem', md: '4rem' } }}>
          El cuidado inteligente <br /> para tu mascota 🐾
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph sx={{ mb: 5, maxWidth: '800px', mx: 'auto', lineHeight: 1.6 }}>
          Gestiona su salud, encuentra las mejores peluquerías con nuestro mapa interactivo y utiliza 
          Inteligencia Artificial para obtener recomendaciones únicas.
        </Typography>
        <Box sx={{ '& > button': { m: 1 } }}>
          {/* NUEVO: Botón modificado para abrir la ventana modal */}
          <Button variant="contained" size="large" color="primary" onClick={() => setOpenRegister(true)} sx={{ fontWeight: 'bold', px: 4, py: 1.5, borderRadius: '30px' }}>
            COMENZAR GRATIS
          </Button>
          <Button variant="outlined" size="large" color="primary" href="#planes" sx={{ fontWeight: 'bold', px: 4, py: 1.5, borderRadius: '30px', bgcolor: 'background.paper' }}>
            VER PLANES
          </Button>
        </Box>
      </Container>

      {/* --- NUEVO: BARRA DE ESTADÍSTICAS --- */}
      <Box sx={{ bgcolor: theme.palette.primary.main, color: '#ffffff', py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} textAlign="center">
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="h3" fontWeight="900">+10,000</Typography>
              <Typography variant="subtitle1" sx={{ opacity: 0.8 }}>Mascotas Registradas</Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="h3" fontWeight="900">98%</Typography>
              <Typography variant="subtitle1" sx={{ opacity: 0.8 }}>Precisión de nuestra IA</Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="h3" fontWeight="900">50+</Typography>
              <Typography variant="subtitle1" sx={{ opacity: 0.8 }}>Centros Asociados</Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* 3. SECCIÓN DE CARACTERÍSTICAS */}
      <Box sx={{ bgcolor: currentMode === 'dark' ? '#121212' : '#f8fafc', py: 10, borderTop: `1px solid ${theme.palette.divider}`, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Container maxWidth="lg">
          <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom color="text.primary">
            Todo lo que tu peludo necesita
          </Typography>
          <Typography variant="body1" textAlign="center" color="text.secondary" sx={{ mb: 6 }}>
            Herramientas diseñadas por expertos para alargar la vida y felicidad de tus mascotas.
          </Typography>

          <Grid container spacing={4}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Paper elevation={0} sx={{ p: 4, textAlign: 'center', height: '100%', borderRadius: 4, border: `1px solid ${theme.palette.divider}`, '&:hover': { borderColor: theme.palette.primary.main } }}>
                <Avatar sx={{ bgcolor: '#e3f2fd', color: '#1976d2', width: 60, height: 60, mx: 'auto', mb: 2 }}><CameraAltIcon fontSize="large" /></Avatar>
                <Typography variant="h6" fontWeight="bold" gutterBottom>Escáner IA</Typography>
                <Typography variant="body2" color="text.secondary">Toma una foto de tu mascota y nuestra IA te recomendará estilos de corte según su raza.</Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Paper elevation={0} sx={{ p: 4, textAlign: 'center', height: '100%', borderRadius: 4, border: `1px solid ${theme.palette.divider}`, '&:hover': { borderColor: theme.palette.secondary.main } }}>
                <Avatar sx={{ bgcolor: '#fff3e0', color: '#f57c00', width: 60, height: 60, mx: 'auto', mb: 2 }}><MapIcon fontSize="large" /></Avatar>
                <Typography variant="h6" fontWeight="bold" gutterBottom>Mapa Interactivo</Typography>
                <Typography variant="body2" color="text.secondary">Encuentra guarderías y peluquerías verificadas cerca de ti.</Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Paper elevation={0} sx={{ p: 4, textAlign: 'center', height: '100%', borderRadius: 4, border: `1px solid ${theme.palette.divider}`, '&:hover': { borderColor: '#388e3c' } }}>
                <Avatar sx={{ bgcolor: '#e8f5e9', color: '#388e3c', width: 60, height: 60, mx: 'auto', mb: 2 }}><MedicalServicesIcon fontSize="large" /></Avatar>
                <Typography variant="h6" fontWeight="bold" gutterBottom>Historial Clínico</Typography>
                <Typography variant="body2" color="text.secondary">Lleva el control de vacunas y peso. Exporta todo en PDF para el veterinario.</Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Paper elevation={0} sx={{ p: 4, textAlign: 'center', height: '100%', borderRadius: 4, border: `1px solid ${theme.palette.divider}`, '&:hover': { borderColor: '#8e24aa' } }}>
                <Avatar sx={{ bgcolor: '#f3e5f5', color: '#8e24aa', width: 60, height: 60, mx: 'auto', mb: 2 }}><SmartToyIcon fontSize="large" /></Avatar>
                <Typography variant="h6" fontWeight="bold" gutterBottom>Chatbot 24/7</Typography>
                <Typography variant="body2" color="text.secondary">Resuelve dudas rápidas sobre alimentación o comportamiento con IA.</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* 4. SECCIÓN DE PLANES */}
      <Container id="planes" maxWidth="md" sx={{ py: 10 }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom color="text.primary">
          Elige el plan ideal para ti
        </Typography>
        <Typography variant="body1" textAlign="center" color="text.secondary" sx={{ mb: 6 }}>
          Puedes comenzar totalmente gratis o desbloquear el poder completo de la IA.
        </Typography>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card elevation={0} sx={{ border: `1px solid ${theme.palette.divider}`, bgcolor: 'background.paper', height: '100%', borderRadius: 3 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom color="primary" fontWeight="bold">⭐ Plan Free</Typography>
                <Typography variant="h3" fontWeight="bold" sx={{ my: 2 }}>$0<Typography component="span" variant="subtitle1" color="text.secondary">/mes</Typography></Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mt: 2, minHeight: '80px' }}>
                  Directorio de guarderías con mapa, recordatorios manuales de vacunación y 5 consultas mensuales al chatbot.
                </Typography>
                <Button variant="outlined" fullWidth sx={{ mt: 3, borderRadius: '20px', fontWeight: 'bold' }}>Empezar Gratis</Button>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid size={{ xs: 12, md: 6 }}>
            <Card elevation={0} sx={{ border: `2px solid ${theme.palette.secondary.main}`, bgcolor: 'background.paper', height: '100%', borderRadius: 3, position: 'relative' }}>
              <Chip label="MÁS POPULAR" color="secondary" sx={{ position: 'absolute', top: 16, right: 16, fontWeight: 'bold' }} />
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom color="secondary" fontWeight="bold">👑 Plan Premium</Typography>
                <Typography variant="h3" fontWeight="bold" sx={{ my: 2 }}>$4.99<Typography component="span" variant="subtitle1" color="text.secondary">/mes</Typography></Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mt: 2, minHeight: '80px' }}>
                  Escáner de cortes con IA ilimitado, chatbot avanzado sin límites y exportación de historiales médicos en PDF.
                </Typography>
                <Button variant="contained" color="secondary" fullWidth sx={{ mt: 3, borderRadius: '20px', fontWeight: 'bold' }}>Suscribirse Ahora</Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* 5. TESTIMONIOS */}
      <Box sx={{ bgcolor: currentMode === 'dark' ? '#1a1a1a' : '#fff3e0', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h5" fontWeight="bold" textAlign="center" gutterBottom color="text.primary">
            Lo que dicen las familias 🐶🐱
          </Typography>
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {[
              { nombre: "Andrea S.", mascota: "Dueña de Max", texto: "El escáner de cortes de IA me recomendó un estilo perfecto para el verano. ¡A Max le encantó!" },
              { nombre: "Carlos M.", mascota: "Dueño de Luna", texto: "Llevar el carnet de vacunas en el celular me salvó en mi último viaje. La app es súper fácil de usar." },
              { nombre: "Valeria G.", mascota: "Dueña de Thor", texto: "Encontré una guardería a 5 minutos de mi casa gracias al mapa. Las reseñas me dieron mucha confianza." }
            ].map((testimonio, i) => (
              <Grid size={{ xs: 12, md: 4 }} key={i}>
                <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: `1px solid ${theme.palette.divider}` }}>
                  <Box sx={{ display: 'flex', color: '#FFB74D', mb: 1 }}><StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon /></Box>
                  <Typography variant="body1" sx={{ fontStyle: 'italic', mb: 2 }}>"{testimonio.texto}"</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ bgcolor: theme.palette.primary.main, mr: 2 }}>{testimonio.nombre.charAt(0)}</Avatar>
                    <Box>
                      <Typography variant="subtitle2" fontWeight="bold">{testimonio.nombre}</Typography>
                      <Typography variant="caption" color="text.secondary">{testimonio.mascota}</Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* --- NUEVO: CINTA DE TECNOLOGÍAS (Tech Stack) --- */}
      <Box sx={{ bgcolor: currentMode === 'dark' ? '#111827' : '#f1f5f9', py: 4, borderTop: `1px solid ${theme.palette.divider}`, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Container maxWidth="lg">
          <Typography variant="subtitle2" textAlign="center" color="text.secondary" fontWeight="bold" sx={{ mb: 3, textTransform: 'uppercase', letterSpacing: 2 }}>
            Arquitectura y Tecnología de Vanguardia
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: { xs: 3, md: 6 }, opacity: 0.7 }}>
            <Typography variant="h6" fontWeight="bold">⚛️ React</Typography>
            <Typography variant="h6" fontWeight="bold">🐍 Python FastAPI</Typography>
            <Typography variant="h6" fontWeight="bold">🐘 PostgreSQL</Typography>
            <Typography variant="h6" fontWeight="bold">📱 Flutter</Typography>
            <Typography variant="h6" fontWeight="bold">🧠 Modelos de IA</Typography>
          </Box>
        </Container>
      </Box>

      {/* --- NUEVO: PREGUNTAS FRECUENTES (FAQ) --- */}
      <Container maxWidth="md" sx={{ py: 10 }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom color="text.primary">
          Preguntas Frecuentes
        </Typography>
        <Typography variant="body1" textAlign="center" color="text.secondary" sx={{ mb: 6 }}>
          Todo lo que necesitas saber sobre Save Pets.
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Accordion elevation={0} sx={{ border: `1px solid ${theme.palette.divider}`, borderRadius: '8px !important', '&:before': { display: 'none' } }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ fontWeight: 'bold' }}>
              ¿Cómo funciona el escáner de cortes con Inteligencia Artificial?
            </AccordionSummary>
            <AccordionDetails sx={{ color: 'text.secondary' }}>
              Utilizamos un modelo de visión artificial avanzado. Al subir una foto de tu mascota, la IA analiza sus facciones, raza y tipo de pelaje para cruzar datos con nuestra base de datos de estilos y recomendarte el corte más saludable y estético.
            </AccordionDetails>
          </Accordion>

          <Accordion elevation={0} sx={{ border: `1px solid ${theme.palette.divider}`, borderRadius: '8px !important', '&:before': { display: 'none' } }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ fontWeight: 'bold' }}>
              ¿Puedo registrar más de una mascota en mi cuenta?
            </AccordionSummary>
            <AccordionDetails sx={{ color: 'text.secondary' }}>
              ¡Por supuesto! Tanto en el Plan Free como en el Premium puedes agregar perfiles ilimitados para todos tus perros y gatos, cada uno con su propio historial médico independiente.
            </AccordionDetails>
          </Accordion>

          <Accordion elevation={0} sx={{ border: `1px solid ${theme.palette.divider}`, borderRadius: '8px !important', '&:before': { display: 'none' } }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ fontWeight: 'bold' }}>
              ¿Los centros asociados están verificados?
            </AccordionSummary>
            <AccordionDetails sx={{ color: 'text.secondary' }}>
              Sí. Cada guardería, veterinaria y peluquería que aparece en nuestro mapa interactivo pasa por un proceso de verificación manual de licencias y sanidad para garantizar la seguridad de tu engreído.
            </AccordionDetails>
          </Accordion>
        </Box>
      </Container>

      {/* 6. DESCARGA LA APP */}
      <Container id="descargar" maxWidth="md" sx={{ mt: 10, mb: 10 }}>
        <Paper elevation={currentMode === 'dark' ? 0 : 4} sx={{ p: { xs: 4, md: 6 }, borderRadius: 4, border: currentMode === 'dark' ? '1px solid #333' : 'none', background: currentMode === 'dark' ? '#1e1e1e' : 'linear-gradient(145deg, #ffffff, #f0f4f8)' }}>
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 7 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <QrCodeScannerIcon color="secondary" sx={{ fontSize: 40, mr: 2 }} />
                <Typography variant="h4" fontWeight="bold">Lleva Save Pets contigo</Typography>
              </Box>
              <Typography variant="body1" color="text.secondary" paragraph>
                Escanea el código QR para descargar la aplicación automáticamente, o usa los enlaces a las tiendas.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mt: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
                <Button variant="contained" startIcon={<AppleIcon />} sx={{ bgcolor: currentMode === 'dark' ? '#ffffff' : '#000000', color: currentMode === 'dark' ? '#000000' : '#ffffff', '&:hover': { bgcolor: '#333' } }}>App Store</Button>
                <Button variant="outlined" startIcon={<ShopIcon />} sx={{ borderColor: theme.palette.divider, color: theme.palette.text.primary }}>Google Play</Button>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ bgcolor: '#ffffff', p: 2, display: 'inline-block', borderRadius: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                <QRCodeCanvas value={enlaceDescarga} size={160} bgColor={"#ffffff"} fgColor={"#000000"} level={"H"} includeMargin={false} />
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>

      {/* --- NUEVO: NEWSLETTER (Boletín) --- */}
      <Container maxWidth="md" sx={{ py: 8, mb: 4, textAlign: 'center' }}>
        <Paper elevation={0} sx={{ p: { xs: 4, md: 6 }, borderRadius: 4, bgcolor: currentMode === 'dark' ? '#1e293b' : '#e0f2fe', border: `1px solid ${theme.palette.divider}` }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            ¿Quieres recibir consejos para tu mascota?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Únete a nuestro boletín semanal con tips de salud, nutrición y novedades exclusivas de Save Pets.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', maxWidth: 500, mx: 'auto', flexDirection: { xs: 'column', sm: 'row' } }}>
            <TextField 
              fullWidth 
              placeholder="Tu correo electrónico..." 
              variant="outlined" 
              size="small" 
              sx={{ bgcolor: 'background.paper', borderRadius: 1 }} 
            />
            <Button variant="contained" color="primary" endIcon={<SendIcon />} sx={{ px: 4, fontWeight: 'bold' }}>
              Suscribirme
            </Button>
          </Box>
        </Paper>
      </Container>

      {/* 7. FOOTER */}
      <Box sx={{ bgcolor: currentMode === 'dark' ? '#0a0a0a' : '#1e293b', color: '#ffffff', py: 6, mt: 'auto' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PetsIcon sx={{ color: '#4FC3F7', mr: 1, fontSize: 30 }} />
                <Typography variant="h6" fontWeight="bold">Save Pets</Typography>
              </Box>
              <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                Revolucionando el cuidado animal mediante Inteligencia Artificial y tecnología móvil.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 4, md: 2 }} sx={{ ml: { md: 'auto' } }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Producto</Typography>
              <Typography variant="body2" sx={{ color: '#94a3b8', mb: 1, cursor: 'pointer', '&:hover':{color: '#fff'} }}>Características</Typography>
              <Typography variant="body2" sx={{ color: '#94a3b8', mb: 1, cursor: 'pointer', '&:hover':{color: '#fff'} }}>Planes</Typography>
              <Typography variant="body2" sx={{ color: '#94a3b8', mb: 1, cursor: 'pointer', '&:hover':{color: '#fff'} }}>Centros</Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 4, md: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Compañía</Typography>
              <Typography variant="body2" sx={{ color: '#94a3b8', mb: 1, cursor: 'pointer', '&:hover':{color: '#fff'} }}>Nosotros</Typography>
              <Typography variant="body2" sx={{ color: '#94a3b8', mb: 1, cursor: 'pointer', '&:hover':{color: '#fff'} }}>Blog Técnico</Typography>
              <Typography variant="body2" sx={{ color: '#94a3b8', mb: 1, cursor: 'pointer', '&:hover':{color: '#fff'} }}>Contacto</Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 4, md: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Legal</Typography>
              <Typography variant="body2" sx={{ color: '#94a3b8', mb: 1, cursor: 'pointer', '&:hover':{color: '#fff'} }}>Privacidad</Typography>
              <Typography variant="body2" sx={{ color: '#94a3b8', mb: 1, cursor: 'pointer', '&:hover':{color: '#fff'} }}>Términos</Typography>
            </Grid>
          </Grid>
          <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.1)' }} />
          <Typography variant="body2" align="center" sx={{ color: '#94a3b8' }}>
            &copy; 2026 Save Pets. Todos los derechos reservados.
          </Typography>
        </Container>
      </Box>

      {/* --- VENTANA DE CHAT FLOTANTE (Real) --- */}
      {openChat && (
        <Paper
          elevation={6}
          sx={{
            position: 'fixed',
            bottom: 90,
            right: 24,
            width: 320,
            zIndex: 1000,
            borderRadius: 3,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            border: `1px solid ${theme.palette.divider}`
          }}
        >
          {/* Cabecera del chat */}
          <Box sx={{ bgcolor: 'secondary.main', color: 'white', p: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ width: 30, height: 30, mr: 1, bgcolor: 'white', color: 'secondary.main' }}>
                <PetsIcon fontSize="small" />
              </Avatar>
              <Typography variant="subtitle2" fontWeight="bold">Asistente Save Pets</Typography>
            </Box>
            <IconButton size="small" sx={{ color: 'white' }} onClick={() => setOpenChat(false)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
          
          {/* Cuerpo del chat */}
          <Box sx={{ p: 2, bgcolor: currentMode === 'dark' ? '#1e1e1e' : '#f8fafc', height: 250, overflowY: 'auto' }}>
            <Box sx={{ display: 'flex', mb: 2 }}>
              <Paper elevation={0} sx={{ p: 1.5, bgcolor: currentMode === 'dark' ? '#333' : '#ffffff', borderRadius: '0 12px 12px 12px', maxWidth: '85%', border: `1px solid ${theme.palette.divider}` }}>
                <Typography variant="body2">
                  ¡Hola! 🐾 Soy la Inteligencia Artificial de Save Pets. ¿Quieres que te ayude a encontrar la peluquería más cercana o tienes dudas sobre nuestros planes?
                </Typography>
              </Paper>
            </Box>
          </Box>

          {/* Input para escribir */}
          <Box sx={{ p: 1, bgcolor: 'background.paper', borderTop: `1px solid ${theme.palette.divider}`, display: 'flex', alignItems: 'center' }}>
            <TextField 
              fullWidth 
              placeholder="Escribe tu mensaje..." 
              variant="standard" 
              InputProps={{ disableUnderline: true, sx: { px: 1, fontSize: '0.875rem' } }}
            />
            <IconButton color="secondary" size="small">
              <SendIcon fontSize="small" />
            </IconButton>
          </Box>
        </Paper>
      )}

      {/* --- BOTÓN FLOTANTE (FAB) --- */}
      <Fab 
        color="secondary" 
        aria-label="chat" 
        sx={{ 
          position: 'fixed', 
          bottom: 24, 
          right: 24, 
          zIndex: 1000,
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)' 
        }}
        onClick={() => setOpenChat(!openChat)}
      >
        {openChat ? <CloseIcon /> : <ChatBubbleIcon />}
      </Fab>

      {/* --- NUEVO: VENTANA EMERGENTE DE REGISTRO (DIALOG) --- */}
      <Dialog open={openRegister} onClose={() => !loading && setOpenRegister(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 'bold', color: theme.palette.primary.main, pb: 1 }}>
          Únete a Save Pets
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Crea tu cuenta gratuita y empieza a gestionar la salud de tu mascota hoy mismo con el poder de la Inteligencia Artificial.
          </Typography>

          {/* Mensaje dinámico de éxito o error */}
          {mensaje.texto && (
            <Alert severity={mensaje.tipo} sx={{ mb: 2 }}>{mensaje.texto}</Alert>
          )}

          <TextField fullWidth label="Tu Nombre Completo" name="nombre_completo" value={formData.nombre_completo} onChange={handleChange} margin="normal" variant="outlined" />
          <TextField fullWidth label="Tu Correo Electrónico" name="correo" type="email" value={formData.correo} onChange={handleChange} margin="normal" variant="outlined" />
          <TextField fullWidth label="Nombre de tu Mascota" name="nombre_mascota" value={formData.nombre_mascota} onChange={handleChange} margin="normal" variant="outlined" />
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={() => setOpenRegister(false)} color="inherit" disabled={loading}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleRegistrar} disabled={loading || !formData.correo || !formData.nombre_completo} sx={{ fontWeight: 'bold', px: 3 }}>
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Registrarme'}
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
}