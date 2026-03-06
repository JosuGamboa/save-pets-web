import React from 'react';
import { 
  Typography, Box, Paper, Grid, Card, CardContent, Button, Avatar, 
  Accordion, AccordionSummary, AccordionDetails, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, Chip, List, ListItem, 
  ListItemText, ListItemAvatar, Divider
} from '@mui/material';

// Íconos
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EmailIcon from '@mui/icons-material/Email';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import BugReportIcon from '@mui/icons-material/BugReport';
import PaymentIcon from '@mui/icons-material/Payment';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

// Datos de prueba para Tickets
const supportTickets = [
  { id: '#1042', user: 'Carlos Mendoza', issue: 'Problema al exportar PDF médico', status: 'Abierto', priority: 'Alta', type: 'Bug' },
  { id: '#1043', user: 'Lucía Fernández', issue: 'Duda sobre el cobro de la suscripción', status: 'En Progreso', priority: 'Media', type: 'Facturación' },
  { id: '#1044', user: 'Roberto Gómez', issue: '¿Cómo agregar una segunda mascota?', status: 'Resuelto', priority: 'Baja', type: 'Duda' },
];

export default function Soporte() {
  return (
    <Box sx={{ maxWidth: '100%' }}>
      {/* Encabezado */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" color="primary">
            Centro de Soporte y Ayuda
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Gestiona las consultas de los usuarios, actualiza las FAQ y revisa las guías rápidas.
          </Typography>
        </Box>
        <Button variant="contained" color="primary" startIcon={<EmailIcon />} sx={{ fontWeight: 'bold' }}>
          Redactar Mensaje
        </Button>
      </Box>

      {/* Tarjetas de Estadísticas de Soporte */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card elevation={0} sx={{ border: '1px solid #e2e8f0' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ bgcolor: '#ffebee', color: '#d32f2f', mr: 2 }}><SupportAgentIcon /></Avatar>
              <Box>
                <Typography variant="body2" color="text.secondary">Tickets Abiertos</Typography>
                <Typography variant="h5" fontWeight="bold">14</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card elevation={0} sx={{ border: '1px solid #e2e8f0' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ bgcolor: '#e8f5e9', color: '#388e3c', mr: 2 }}><CheckCircleOutlineIcon /></Avatar>
              <Box>
                <Typography variant="body2" color="text.secondary">Resueltos (Hoy)</Typography>
                <Typography variant="h5" fontWeight="bold">28</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card elevation={0} sx={{ border: '1px solid #e2e8f0' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ bgcolor: '#fff3e0', color: '#f57c00', mr: 2 }}><AccessTimeIcon /></Avatar>
              <Box>
                <Typography variant="body2" color="text.secondary">Tiempo de Respuesta</Typography>
                <Typography variant="h5" fontWeight="bold">2.4 hrs</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        {/* Columna Izquierda: Tickets y FAQ */}
        <Grid size={{ xs: 12, lg: 8 }}>
          
          {/* Bandeja de Tickets Recientes */}
          <Paper elevation={0} sx={{ border: '1px solid #e2e8f0', p: 3, mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6" fontWeight="bold">Tickets Recientes de Usuarios</Typography>
              <Button size="small">Ver todos</Button>
            </Box>
            <TableContainer>
              <Table size="small">
                <TableHead sx={{ bgcolor: '#f8fafc' }}>
                  <TableRow>
                    <TableCell fontWeight="bold">ID</TableCell>
                    <TableCell fontWeight="bold">Usuario</TableCell>
                    <TableCell fontWeight="bold">Asunto</TableCell>
                    <TableCell fontWeight="bold">Estado</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {supportTickets.map((ticket) => (
                    <TableRow key={ticket.id} hover>
                      <TableCell sx={{ color: 'text.secondary' }}>{ticket.id}</TableCell>
                      <TableCell fontWeight="500">{ticket.user}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {ticket.type === 'Bug' && <BugReportIcon fontSize="small" color="error" sx={{ mr: 1 }} />}
                          {ticket.type === 'Facturación' && <PaymentIcon fontSize="small" color="secondary" sx={{ mr: 1 }} />}
                          {ticket.type === 'Duda' && <HelpOutlineIcon fontSize="small" color="info" sx={{ mr: 1 }} />}
                          {ticket.issue}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={ticket.status} 
                          size="small" 
                          color={ticket.status === 'Resuelto' ? 'success' : ticket.status === 'Abierto' ? 'error' : 'warning'} 
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          {/* Sección de Preguntas Frecuentes (Acordeones) */}
          <Paper elevation={0} sx={{ border: '1px solid #e2e8f0', p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6" fontWeight="bold">Preguntas Frecuentes (FAQ) Públicas</Typography>
              <Button variant="outlined" size="small">Editar FAQ</Button>
            </Box>
            
            <Accordion elevation={0} sx={{ border: '1px solid #e2e8f0', '&:before': { display: 'none' } }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight="bold">¿Cuál es la diferencia entre el Plan Free y Premium?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography color="text.secondary">
                  El Plan Free incluye acceso al directorio, recordatorios manuales y uso limitado del chatbot de IA. El Plan Premium ofrece escaneos ilimitados con cámara, IA avanzada para recomendaciones de cortes, y exportación de historial médico a PDF.
                </Typography>
              </AccordionDetails>
            </Accordion>
            
            <Accordion elevation={0} sx={{ border: '1px solid #e2e8f0', borderTop: 'none', '&:before': { display: 'none' } }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight="bold">¿Cómo funciona el escáner de cortes de pelo con IA?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography color="text.secondary">
                  Nuestra Inteligencia Artificial analiza la foto de tu mascota, detecta su raza y tipo de pelaje, y la compara con nuestra base de datos para sugerirte los estilos de corte más saludables y estéticos. Es una función exclusiva del Plan Premium.
                </Typography>
              </AccordionDetails>
            </Accordion>
            
            <Accordion elevation={0} sx={{ border: '1px solid #e2e8f0', borderTop: 'none', '&:before': { display: 'none' } }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight="bold">¿Puedo registrar más de una mascota?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography color="text.secondary">
                  Sí, tanto los usuarios Free como Premium pueden registrar múltiples mascotas en su perfil y llevar un control individualizado de sus vacunas, peso y alimentación.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Paper>
        </Grid>

        {/* Columna Derecha: Guías Rápidas y Contacto */}
        <Grid size={{ xs: 12, lg: 4 }}>
          {/* Guías Rápidas del Administrador */}
          <Paper elevation={0} sx={{ border: '1px solid #e2e8f0', p: 3, mb: 4, bgcolor: 'background.paper' }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Guías Rápidas (Admin)</Typography>
            <List disablePadding>
              <ListItem button disableGutters sx={{ borderBottom: '1px solid #e2e8f0', py: 1.5 }}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: '#e3f2fd', color: '#1976d2' }}><MenuBookIcon /></Avatar>
                </ListItemAvatar>
                <ListItemText primary="Configuración de IA Gemini" secondary="Cómo actualizar los prompts del modelo." />
              </ListItem>
              <ListItem button disableGutters sx={{ borderBottom: '1px solid #e2e8f0', py: 1.5 }}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: '#e3f2fd', color: '#1976d2' }}><MenuBookIcon /></Avatar>
                </ListItemAvatar>
                <ListItemText primary="Pasarela de Pagos Stripe" secondary="Guía para gestionar reembolsos." />
              </ListItem>
              <ListItem button disableGutters sx={{ py: 1.5 }}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: '#e3f2fd', color: '#1976d2' }}><MenuBookIcon /></Avatar>
                </ListItemAvatar>
                <ListItemText primary="Exportación de Logs" secondary="Respaldar datos de usuarios mensual." />
              </ListItem>
            </List>
          </Paper>

          {/* Información de Contacto / Servidores */}
          <Paper elevation={0} sx={{ border: '1px solid #e2e8f0', p: 3 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Estado del Sistema</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">Servidor Frontend (React)</Typography>
              <Typography variant="body2" fontWeight="bold" color="success.main">Operativo</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">API de Pagos</Typography>
              <Typography variant="body2" fontWeight="bold" color="success.main">Operativa</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="body2" color="text.secondary">API de IA (Chatbot)</Typography>
              <Typography variant="body2" fontWeight="bold" color="success.main">Operativa</Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body2" color="text.secondary" align="center">
              ¿Problemas con los servidores? Contacta a tu proveedor de hosting o revisa los logs en la terminal.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}