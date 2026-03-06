import React from 'react';
import { 
  Typography, Box, Paper, Grid, Card, CardContent, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, Chip, Avatar, LinearProgress, Divider, Button 
} from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import MapIcon from '@mui/icons-material/Map';

// Datos de prueba realistas
const freeUsers = [
  { id: 1, name: 'Carlos Mendoza', pet: 'Max (Golden)', joinDate: '2026-03-01', chatbotUsage: 80, status: 'Activo' },
  { id: 2, name: 'Lucía Fernández', pet: 'Luna (Gato)', joinDate: '2026-02-28', chatbotUsage: 100, status: 'Límite Alcanzado' },
  { id: 3, name: 'Roberto Gómez', pet: 'Rocky (Bulldog)', joinDate: '2026-02-25', chatbotUsage: 30, status: 'Activo' },
  { id: 4, name: 'Ana Torres', pet: 'Milo (Beagle)', joinDate: '2026-02-20', chatbotUsage: 0, status: 'Inactivo' },
];

export default function PlanFree() {
  return (
    <Box sx={{ maxWidth: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" color="primary">
          Gestión de Usuarios - Plan Free ⭐
        </Typography>
        <Button variant="outlined" color="primary">Exportar Datos CSV</Button>
      </Box>

      {/* Tarjetas de Métricas Rápidas */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card elevation={0} sx={{ border: '1px solid #e2e8f0' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ bgcolor: '#e3f2fd', color: '#1976d2', mr: 2 }}><PetsIcon /></Avatar>
              <Box>
                <Typography variant="body2" color="text.secondary">Total Usuarios Free</Typography>
                <Typography variant="h5" fontWeight="bold">1,245</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card elevation={0} sx={{ border: '1px solid #e2e8f0' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ bgcolor: '#fff3e0', color: '#f57c00', mr: 2 }}><ChatBubbleOutlineIcon /></Avatar>
              <Box>
                <Typography variant="body2" color="text.secondary">Consultas IA (Hoy)</Typography>
                <Typography variant="h5" fontWeight="bold">3,890 / 5,000</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card elevation={0} sx={{ border: '1px solid #e2e8f0' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ bgcolor: '#e8f5e9', color: '#388e3c', mr: 2 }}><MapIcon /></Avatar>
              <Box>
                <Typography variant="body2" color="text.secondary">Búsquedas en Mapa</Typography>
                <Typography variant="h5" fontWeight="bold">854</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        {/* Tabla de Usuarios Recientes */}
        <Grid item xs={12} lg={8}>
          <Paper elevation={0} sx={{ border: '1px solid #e2e8f0', p: 2 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Usuarios Registrados Recientemente</Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell fontWeight="bold">Usuario</TableCell>
                    <TableCell fontWeight="bold">Mascota</TableCell>
                    <TableCell fontWeight="bold">Uso Chatbot (Mensual)</TableCell>
                    <TableCell fontWeight="bold">Estado</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {freeUsers.map((row) => (
                    <TableRow key={row.id} hover>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.pet}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ width: '100%', mr: 1 }}>
                            <LinearProgress 
                              variant="determinate" 
                              value={row.chatbotUsage} 
                              color={row.chatbotUsage > 90 ? "error" : "primary"}
                            />
                          </Box>
                          <Typography variant="body2" color="text.secondary">{row.chatbotUsage}%</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={row.status} 
                          size="small" 
                          color={row.status === 'Activo' ? 'success' : row.status === 'Inactivo' ? 'default' : 'error'} 
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Panel lateral de uso de módulos */}
        <Grid item xs={12} lg={4}>
          <Paper elevation={0} sx={{ border: '1px solid #e2e8f0', p: 3, height: '100%' }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>Uso de Módulos (Free)</Typography>
            
            <Typography variant="body2" fontWeight="bold">Directorio (Guarderías/Peluquerías)</Typography>
            <LinearProgress variant="determinate" value={75} sx={{ mb: 2, height: 8, borderRadius: 5 }} />
            
            <Typography variant="body2" fontWeight="bold">Salud Preventiva (Recordatorios Manuales)</Typography>
            <LinearProgress variant="determinate" value={45} color="secondary" sx={{ mb: 2, height: 8, borderRadius: 5 }} />
            
            <Typography variant="body2" fontWeight="bold">Bienestar Emocional (Artículos y Audio)</Typography>
            <LinearProgress variant="determinate" value={30} color="success" sx={{ mb: 2, height: 8, borderRadius: 5 }} />
            
            <Divider sx={{ my: 3 }} />
            <Typography variant="body2" color="text.secondary" align="center">
              El 12% de los usuarios Free están listos para un upgrade a Premium debido al uso intensivo del Chatbot.
            </Typography>
            <Button variant="contained" fullWidth sx={{ mt: 2 }}>Lanzar Campaña de Upgrade</Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}