import React from 'react';
import { 
  Typography, Box, Paper, Grid, Card, CardContent, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, Chip, Avatar, Button, IconButton 
} from '@mui/material';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// Datos de prueba Premium
const premiumUsers = [
  { id: 101, name: 'Sofía Reyes', pet: 'Zeus (Husky)', plan: 'Anual', aiScans: 12, pdfExports: 2, status: 'Suscrito' },
  { id: 102, name: 'Javier Silva', pet: 'Kira (Poodle)', plan: 'Mensual', aiScans: 4, pdfExports: 0, status: 'Suscrito' },
  { id: 103, name: 'María Gómez', pet: 'Simba (Persa)', plan: 'Mensual', aiScans: 15, pdfExports: 5, status: 'Cancelando' },
  { id: 104, name: 'Diego Castro', pet: 'Bruno (Pug)', plan: 'Anual', aiScans: 8, pdfExports: 1, status: 'Suscrito' },
];

export default function PlanPremium() {
  return (
    <Box sx={{ maxWidth: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" color="secondary">
          Gestión de Usuarios - Plan Premium 👑
        </Typography>
        <Button variant="contained" color="secondary">Configurar Planes (Stripe)</Button>
      </Box>

      {/* Tarjetas de Métricas Premium (Destacadas con borde naranja) */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card elevation={0} sx={{ border: '2px solid #FFB74D', bgcolor: '#fff8e1' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ bgcolor: '#FF9800', mr: 2 }}><WorkspacePremiumIcon /></Avatar>
              <Box>
                <Typography variant="body2" color="text.secondary">Ingresos Mensuales Recurrentes</Typography>
                <Typography variant="h4" fontWeight="bold" color="#e65100">Bs 4,250</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card elevation={0} sx={{ border: '1px solid #e2e8f0' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ bgcolor: '#e1bee7', color: '#8e24aa', mr: 2 }}><CameraAltIcon /></Avatar>
              <Box>
                <Typography variant="body2" color="text.secondary">Escaneos IA de Cortes (Mes)</Typography>
                <Typography variant="h5" fontWeight="bold">1,840</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card elevation={0} sx={{ border: '1px solid #e2e8f0' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ bgcolor: '#ffcdd2', color: '#c62828', mr: 2 }}><PictureAsPdfIcon /></Avatar>
              <Box>
                <Typography variant="body2" color="text.secondary">Historiales Médicos Exportados</Typography>
                <Typography variant="h5" fontWeight="bold">320</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper elevation={0} sx={{ border: '1px solid #e2e8f0', p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h6" fontWeight="bold">Suscriptores Activos</Typography>
          <Typography variant="body2" color="secondary" sx={{ cursor: 'pointer', fontWeight: 'bold' }}>Ver todos</Typography>
        </Box>
        
        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: '#f8fafc' }}>
              <TableRow>
                <TableCell fontWeight="bold">Cliente VIP</TableCell>
                <TableCell fontWeight="bold">Mascota Evaluada</TableCell>
                <TableCell fontWeight="bold">Tipo de Plan</TableCell>
                <TableCell align="center" fontWeight="bold">Escaneos IA (Cámara)</TableCell>
                <TableCell align="center" fontWeight="bold">Exportaciones PDF</TableCell>
                <TableCell fontWeight="bold">Estado de Suscripción</TableCell>
                <TableCell align="right">Acción</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {premiumUsers.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell sx={{ fontWeight: '500' }}>{row.name}</TableCell>
                  <TableCell>{row.pet}</TableCell>
                  <TableCell>
                    <Chip label={row.plan} size="small" variant="outlined" color="secondary" />
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2" fontWeight="bold">{row.aiScans}</Typography>
                  </TableCell>
                  <TableCell align="center">{row.pdfExports}</TableCell>
                  <TableCell>
                    <Chip 
                      label={row.status} 
                      size="small" 
                      color={row.status === 'Suscrito' ? 'success' : 'warning'} 
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small"><MoreVertIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}