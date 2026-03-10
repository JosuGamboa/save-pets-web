import React, { useState } from 'react';
import { 
  Typography, Box, Grid, Card, CardContent, Divider, LinearProgress, useTheme,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Chip, Avatar, Button, Stack, IconButton, Snackbar, Alert,
  List, ListItem, ListItemIcon, ListItemText, Checkbox
} from '@mui/material';

// Gráficos avanzados de MUI
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart'; // NUEVO GRÁFICO

// Íconos
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DownloadIcon from '@mui/icons-material/Download';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import StorageIcon from '@mui/icons-material/Storage';
import DnsIcon from '@mui/icons-material/Dns';
import CodeIcon from '@mui/icons-material/Code';

export default function Dashboard() {
  const theme = useTheme();

  // --- ESTADOS INTERACTIVOS ---
  const [alertOpen, setAlertOpen] = useState(false);
  const [tareas, setTareas] = useState([
    { id: 1, texto: 'Verificar licencia de "Peluquería Doggy"', completada: false },
    { id: 2, texto: 'Aprobar registro de "Guardería Happy Pet"', completada: false },
    { id: 3, texto: 'Revisar reporte de error en mapa', completada: false },
  ]);

  // Funciones interactivas
  const handleExportar = () => setAlertOpen(true);
  
  const handleToggleTarea = (id) => {
    setTareas(tareas.map(t => t.id === id ? { ...t, completada: !t.completada } : t));
  };

  // --- DATOS PARA GRÁFICOS ---
  const lineChartDataX = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  const dataConsultasIA = [60, 85, 45, 100, 70, 120, 90];
  const dataEscaneosCamara = [30, 50, 20, 80, 55, 90, 65];

  // Datos para el nuevo gráfico de barras (Perros vs Gatos)
  const barChartData = [
    { mes: 'Ene', perros: 400, gatos: 250 },
    { mes: 'Feb', perros: 600, gatos: 350 },
    { mes: 'Mar', perros: 800, gatos: 450 },
    { mes: 'Abr', perros: 1200, gatos: 700 },
  ];

  const actividadReciente = [
    { id: 'TRX-901', usuario: 'María López', accion: 'Suscripción Premium', monto: '$4.99', estado: 'Completado', tiempo: 'Hace 5 min' },
    { id: 'TRX-902', usuario: 'Carlos Mendoza', accion: 'Registro Mascota', monto: '$0.00', estado: 'Gratis', tiempo: 'Hace 12 min' },
    { id: 'TRX-903', usuario: 'Peluquería Canina', accion: 'Suscripción Negocio', monto: '$29.99', estado: 'Pendiente', tiempo: 'Hace 1 hora' },
    { id: 'TRX-904', usuario: 'Ana Torres', accion: 'Suscripción Premium', monto: '$4.99', estado: 'Completado', tiempo: 'Hace 2 horas' },
  ];

  return (
    <Box sx={{ maxWidth: '100%', pb: 4 }}>
      
      {/* NOTIFICACIÓN EMERGENTE (SNACKBAR) */}
      <Snackbar open={alertOpen} autoHideDuration={3000} onClose={() => setAlertOpen(false)} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={() => setAlertOpen(false)} severity="success" sx={{ width: '100%', fontWeight: 'bold' }}>
          ¡Reporte financiero generado y descargando en PDF!
        </Alert>
      </Snackbar>

      {/* CABECERA */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
        <Typography variant="h4" fontWeight="bold" color="primary">
          Centro de Comando 🚀
        </Typography>
        <Button variant="contained" startIcon={<DownloadIcon />} onClick={handleExportar} sx={{ fontWeight: 'bold', borderRadius: 2 }}>
          Exportar Reporte
        </Button>
      </Box>

      {/* --- FILA 1: TARJETAS SUPERIORES --- */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card elevation={0} sx={{ border: `1px solid ${theme.palette.divider}`, height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">Ingresos Totales</Typography>
                <InfoOutlinedIcon fontSize="small" color="action" />
              </Box>
              <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>Bs 12,560</Typography>
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <Typography variant="body2">WoW <ArrowDropUpIcon color="error" sx={{ verticalAlign: 'middle' }}/> <span style={{ color: '#d32f2f' }}>12%</span></Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body2" color="text.secondary">Ingresos de hoy: Bs 423</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card elevation={0} sx={{ border: `1px solid ${theme.palette.divider}`, height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">Usuarios Activos</Typography>
                <InfoOutlinedIcon fontSize="small" color="action" />
              </Box>
              <Typography variant="h4" fontWeight="bold">8,846</Typography>
              <Box sx={{ height: 60, mt: 1 }}>
                <SparkLineChart data={[1, 4, 2, 5, 7, 2, 4, 6, 8, 3, 5]} area colors={[theme.palette.primary.main]} showTooltip />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card elevation={0} sx={{ border: `1px solid ${theme.palette.divider}`, height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">Nuevas Mascotas</Typography>
                <InfoOutlinedIcon fontSize="small" color="action" />
              </Box>
              <Typography variant="h4" fontWeight="bold">6,560</Typography>
              <Box sx={{ height: 60, mt: 1 }}>
                <SparkLineChart plotType="bar" data={[3, 5, 2, 6, 8, 4, 7, 5, 9, 3, 6]} colors={[theme.palette.secondary.main]} showTooltip />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card elevation={0} sx={{ border: `1px solid ${theme.palette.divider}`, height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">Efectividad de IA Gemini</Typography>
                <InfoOutlinedIcon fontSize="small" color="action" />
              </Box>
              <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>85%</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{ width: '100%', mr: 1 }}>
                  <LinearProgress variant="determinate" value={85} color="success" sx={{ height: 8, borderRadius: 5 }} />
                </Box>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body2" color="text.secondary">Basado en feedback de usuarios</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* --- FILA 2: GRÁFICOS PRINCIPALES --- */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {/* Gráfico de LÍNEAS */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card elevation={0} sx={{ border: `1px solid ${theme.palette.divider}`, height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>Uso de Módulos de IA</Typography>
              <Box sx={{ width: '100%', height: 350 }}>
                <LineChart
                  xAxis={[{ scaleType: 'point', data: lineChartDataX }]}
                  series={[
                    { data: dataConsultasIA, label: 'Chatbot', color: theme.palette.primary.main, curve: 'natural' },
                    { data: dataEscaneosCamara, label: 'Cámara IA', color: theme.palette.secondary.main, curve: 'natural' },
                  ]}
                  grid={{ vertical: true, horizontal: true }}
                  sx={{ '.MuiLineElement-root': { strokeWidth: 3 } }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Gráfico de PASTEL (Sin Veterinarias) */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card elevation={0} sx={{ border: `1px solid ${theme.palette.divider}`, height: '100%' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Proporción de Negocios</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <PieChart
                  series={[{
                    data: [
                      { id: 0, value: 4500, label: 'Peluquerías', color: '#1976d2' },
                      { id: 1, value: 3500, label: 'Guarderías', color: '#00e676' },
                      { id: 2, value: 2000, label: 'Croquetas', color: '#ff9800' },
                    ],
                    innerRadius: 60, paddingAngle: 2, cornerRadius: 5,
                  }]}
                  width={250} height={250} slotProps={{ legend: { hidden: true } }}
                />
              </Box>
              <Box sx={{ bgcolor: theme.palette.background.default, p: 2, borderRadius: 2, border: `1px solid ${theme.palette.divider}`, mt: 'auto' }}>
                <Typography variant="body2" sx={{ mb: 1, borderLeft: '3px solid #1976d2', pl: 1 }}>Peluquerías (45%)</Typography>
                <Typography variant="body2" sx={{ mb: 1, borderLeft: '3px solid #00e676', pl: 1 }}>Guarderías (35%)</Typography>
                <Typography variant="body2" sx={{ borderLeft: '3px solid #ff9800', pl: 1 }}>Tiendas de Croquetas (20%)</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* --- FILA 3: NUEVOS GRÁFICOS Y TAREAS --- */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {/* Gráfico de Barras (Demografía) */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Card elevation={0} sx={{ border: `1px solid ${theme.palette.divider}`, height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Registro: Perros vs Gatos</Typography>
              <Box sx={{ height: 300, width: '100%' }}>
                <BarChart
                  dataset={barChartData}
                  xAxis={[{ scaleType: 'band', dataKey: 'mes' }]}
                  series={[
                    { dataKey: 'perros', label: 'Perros 🐶', color: '#1976d2' },
                    { dataKey: 'gatos', label: 'Gatos 🐱', color: '#ff9800' }
                  ]}
                  grid={{ horizontal: true }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Lista Interactiva de Tareas */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Card elevation={0} sx={{ border: `1px solid ${theme.palette.divider}`, height: '100%', bgcolor: theme.palette.background.default }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" fontWeight="bold">Tareas del Administrador</Typography>
                <Chip label={`${tareas.filter(t => !t.completada).length} pendientes`} color="error" size="small" />
              </Box>
              <List sx={{ bgcolor: 'background.paper', borderRadius: 2, border: `1px solid ${theme.palette.divider}` }}>
                {tareas.map((tarea) => (
                  <ListItem key={tarea.id} disablePadding divider>
                    <Button fullWidth onClick={() => handleToggleTarea(tarea.id)} sx={{ textTransform: 'none', color: 'text.primary', justifyContent: 'flex-start', py: 1.5 }}>
                      <ListItemIcon>
                        <Checkbox edge="start" checked={tarea.completada} tabIndex={-1} disableRipple color="success" />
                      </ListItemIcon>
                      <ListItemText 
                        primary={tarea.texto} 
                        sx={{ textDecoration: tarea.completada ? 'line-through' : 'none', opacity: tarea.completada ? 0.5 : 1 }} 
                      />
                    </Button>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* --- FILA 4: TABLA Y ESTADO DE SERVIDOR --- */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card elevation={0} sx={{ border: `1px solid ${theme.palette.divider}`, height: '100%' }}>
            <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
              <Typography variant="h6" fontWeight="bold">Transacciones en Vivo</Typography>
            </Box>
            <TableContainer>
              <Table size="medium">
                <TableHead sx={{ bgcolor: theme.palette.background.default }}>
                  <TableRow>
                    <TableCell fontWeight="bold">Usuario</TableCell>
                    <TableCell fontWeight="bold">Acción</TableCell>
                    <TableCell fontWeight="bold">Monto</TableCell>
                    <TableCell fontWeight="bold">Estado</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {actividadReciente.map((row) => (
                    <TableRow key={row.id} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar sx={{ width: 32, height: 32, mr: 1.5, bgcolor: theme.palette.primary.light }}>{row.usuario.charAt(0)}</Avatar>
                          <Typography variant="body2" fontWeight="bold">{row.usuario}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{row.accion}</TableCell>
                      <TableCell fontWeight="bold">{row.monto}</TableCell>
                      <TableCell>
                        <Chip label={row.estado} size="small" color={row.estado === 'Completado' ? 'success' : row.estado === 'Pendiente' ? 'warning' : 'default'} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <Stack spacing={3}>
            <Card elevation={0} sx={{ border: `1px solid ${theme.palette.divider}` }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Estado del Sistema</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}><CodeIcon sx={{ color: '#1976d2', mr: 1 }} /><Typography variant="body2" fontWeight="bold">API (FastAPI)</Typography></Box>
                  <Chip label="Online" size="small" color="success" variant="outlined" />
                </Box>
                <Divider sx={{ mb: 2 }} />
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}><StorageIcon sx={{ color: '#ff9800', mr: 1 }} /><Typography variant="body2" fontWeight="bold">PostgreSQL</Typography></Box>
                  <Chip label="Estable" size="small" color="success" variant="outlined" />
                </Box>
                <Divider sx={{ mb: 2 }} />
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}><DnsIcon sx={{ color: '#9c27b0', mr: 1 }} /><Typography variant="body2" fontWeight="bold">Modelo de IA (Gemini)</Typography></Box>
                  <Typography variant="body2" color="success.main" fontWeight="bold">42ms ping</Typography>
                </Box>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
      
    </Box>
  );
}