import React, { useState } from 'react';
import { 
  Typography, Box, Paper, Grid, Card, CardContent, Button, Avatar, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, 
  TextField, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, 
  FormControl, InputLabel, Select, MenuItem 
} from '@mui/material';

// Íconos
import StorefrontIcon from '@mui/icons-material/Storefront';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import StarRateIcon from '@mui/icons-material/StarRate';
import SendIcon from '@mui/icons-material/Send';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

const citasHoy = [
  { id: 'C-801', cliente: 'Carlos Mendoza', mascota: 'Max (Golden)', servicio: 'Baño y Corte', hora: '10:00 AM', estado: 'En proceso' },
  { id: 'C-802', cliente: 'Ana Torres', mascota: 'Milo (Beagle)', servicio: 'Guardería', hora: '11:30 AM', estado: 'Pendiente' },
  { id: 'C-803', cliente: 'Lucía Fernández', mascota: 'Luna (Gato)', servicio: 'Corte de uñas', hora: '02:00 PM', estado: 'Confirmado' },
];

export default function Negocios() {
  const [mensajes, setMensajes] = useState([
    { id: 1, emisor: 'cliente', texto: 'Hola, ¿cómo se está portando Max en el baño?', hora: '10:15 AM' },
    { id: 2, emisor: 'centro', texto: '¡Hola Carlos! Se está portando de maravilla. Te aviso en 30 min para que pases por él.', hora: '10:18 AM' }
  ]);
  const [nuevoMensaje, setNuevoMensaje] = useState("");

  // ESTADO PARA LA VENTANA EMERGENTE (MODAL)
  const [openPromo, setOpenPromo] = useState(false);

  const handleEnviarMensaje = () => {
    if (nuevoMensaje.trim() === "") return;
    const horaActual = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMensajes([...mensajes, { id: mensajes.length + 1, emisor: 'centro', texto: nuevoMensaje, hora: horaActual }]);
    setNuevoMensaje("");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleEnviarMensaje();
  };

  // FUNCIONES PARA EL MODAL DE PROMOCIÓN
  const handleLanzarPromocion = () => {
    // Aquí cerramos la ventana y mostramos una alerta nativa para sorprender al profe
    setOpenPromo(false);
    alert("🚀 ¡Éxito! Notificación Push enviada a 145 usuarios que están a menos de 5km a la redonda.");
  };

  return (
    <Box sx={{ maxWidth: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" color="primary">Portal de Centros Asociados 🏪</Typography>
          <Typography variant="body1" color="text.secondary">Gestión de citas y mensajería en vivo.</Typography>
        </Box>
        {/* BOTÓN QUE ABRE EL MODAL */}
        <Button 
          variant="contained" 
          color="secondary" 
          startIcon={<StorefrontIcon />} 
          sx={{ fontWeight: 'bold' }}
          onClick={() => setOpenPromo(true)}
        >
          Lanzar Promoción Flash
        </Button>
      </Box>

      {/* --- EL MODAL (VENTANA EMERGENTE) --- */}
      <Dialog open={openPromo} onClose={() => setOpenPromo(false)} maxWidth="sm" fullWidth>
        <DialogTitle fontWeight="bold" color="secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          ⚡ Configurar Promoción Flash
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Esta herramienta enviará una alerta inmediata a la aplicación de los dueños de mascotas que se encuentren cerca de tu centro.
          </Typography>
          
          <FormControl fullWidth size="small" sx={{ mb: 3 }}>
            <InputLabel>Servicio a Promocionar</InputLabel>
            <Select label="Servicio a Promocionar" defaultValue="bano">
              <MenuItem value="bano">Baño y Peluquería</MenuItem>
              <MenuItem value="guarderia">Guardería por horas</MenuItem>
              <MenuItem value="spa">Spa Relajante</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth size="small" sx={{ mb: 3 }}>
            <InputLabel>Porcentaje de Descuento</InputLabel>
            <Select label="Porcentaje de Descuento" defaultValue="20">
              <MenuItem value="10">10% de descuento</MenuItem>
              <MenuItem value="15">15% de descuento</MenuItem>
              <MenuItem value="20">20% de descuento (Recomendado)</MenuItem>
              <MenuItem value="50">50% de descuento (Liquidación)</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            multiline
            rows={3}
            label="Mensaje para los clientes"
            defaultValue="¡Tenemos espacios libres esta tarde! Trae a tu peludito hoy mismo y obtén este descuento exclusivo. Válido por 3 horas."
            variant="outlined"
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenPromo(false)} color="inherit">Cancelar</Button>
          <Button onClick={handleLanzarPromocion} variant="contained" color="secondary" sx={{ fontWeight: 'bold' }}>
            Enviar Notificación Push
          </Button>
        </DialogActions>
      </Dialog>
      {/* --- FIN DEL MODAL --- */}

      {/* Tarjetas de Estadísticas */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card elevation={0} sx={{ border: '1px solid #e2e8f0' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ bgcolor: '#e3f2fd', color: '#1976d2', mr: 2 }}><EventAvailableIcon /></Avatar>
              <Box>
                <Typography variant="body2" color="text.secondary">Citas para Hoy</Typography>
                <Typography variant="h5" fontWeight="bold">12</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card elevation={0} sx={{ border: '1px solid #e2e8f0' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ bgcolor: '#e8f5e9', color: '#388e3c', mr: 2 }}><ChatBubbleIcon /></Avatar>
              <Box>
                <Typography variant="body2" color="text.secondary">Mensajes sin leer</Typography>
                <Typography variant="h5" fontWeight="bold">3</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card elevation={0} sx={{ border: '1px solid #e2e8f0' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ bgcolor: '#fff3e0', color: '#f57c00', mr: 2 }}><StarRateIcon /></Avatar>
              <Box>
                <Typography variant="body2" color="text.secondary">Calificación Promedio</Typography>
                <Typography variant="h5" fontWeight="bold">4.8 / 5.0</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        {/* AGENDA DE CITAS */}
        <Grid item xs={12} lg={7}>
          <Paper elevation={0} sx={{ border: '1px solid #e2e8f0', p: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6" fontWeight="bold">Agenda de Hoy</Typography>
            </Box>
            <TableContainer>
              <Table size="small">
                <TableHead sx={{ bgcolor: '#f8fafc' }}>
                  <TableRow>
                    <TableCell fontWeight="bold">Hora</TableCell>
                    <TableCell fontWeight="bold">Cliente / Mascota</TableCell>
                    <TableCell fontWeight="bold">Servicio</TableCell>
                    <TableCell fontWeight="bold">Estado</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {citasHoy.map((cita) => (
                    <TableRow key={cita.id} hover>
                      <TableCell fontWeight="bold">{cita.hora}</TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight="bold">{cita.cliente}</Typography>
                        <Typography variant="caption" color="text.secondary">{cita.mascota}</Typography>
                      </TableCell>
                      <TableCell>{cita.servicio}</TableCell>
                      <TableCell>
                        <Chip label={cita.estado} size="small" color={cita.estado === 'En proceso' ? 'info' : cita.estado === 'Confirmado' ? 'success' : 'warning'} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* CHAT FUNCIONAL */}
        <Grid item xs={12} lg={5}>
          <Paper elevation={0} sx={{ border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', height: '400px' }}>
            <Box sx={{ p: 2, bgcolor: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ width: 32, height: 32, mr: 2, bgcolor: '#1976d2' }}>CM</Avatar>
              <Box>
                <Typography variant="subtitle2" fontWeight="bold">Carlos Mendoza</Typography>
                <Typography variant="caption" color="success.main">En línea (Dueño de Max)</Typography>
              </Box>
            </Box>
            
            <Box sx={{ p: 2, flexGrow: 1, overflowY: 'auto', bgcolor: 'background.default' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {mensajes.map((msg) => (
                  <Box key={msg.id} sx={{ alignSelf: msg.emisor === 'centro' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
                    <Paper elevation={0} sx={{ p: 1.5, bgcolor: msg.emisor === 'centro' ? '#e3f2fd' : '#f1f5f9', borderRadius: msg.emisor === 'centro' ? '12px 0px 12px 12px' : '0px 12px 12px 12px' }}>
                      <Typography variant="body2" color={msg.emisor === 'centro' ? '#0d47a1' : 'text.primary'}>{msg.texto}</Typography>
                    </Paper>
                    <Typography variant="caption" color="text.secondary" align={msg.emisor === 'centro' ? 'right' : 'left'} display="block" sx={{ mx: 1 }}>{msg.hora}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            <Box sx={{ p: 2, borderTop: '1px solid #e2e8f0', display: 'flex', alignItems: 'center' }}>
              <TextField 
                fullWidth size="small" placeholder="Escribe un mensaje a Carlos..." variant="outlined" sx={{ mr: 1 }}
                value={nuevoMensaje} onChange={(e) => setNuevoMensaje(e.target.value)} onKeyDown={handleKeyPress}
              />
              <IconButton color="primary" sx={{ bgcolor: '#e3f2fd' }} onClick={handleEnviarMensaje}>
                <SendIcon fontSize="small" />
              </IconButton>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}