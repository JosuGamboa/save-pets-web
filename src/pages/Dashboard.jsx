import React from 'react';
import { 
  Typography, Box, Grid, Card, CardContent, Divider, LinearProgress, useTheme 
} from '@mui/material';

// Importamos los gráficos avanzados de MUI
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';

// Íconos
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export default function Dashboard() {
  const theme = useTheme();

  // Datos para el gráfico de líneas principal (Tráfico vs Suscripciones)
  const lineChartDataX = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  const dataConsultasIA = [60, 85, 45, 100, 70, 120, 90];
  const dataEscaneosCamara = [30, 50, 20, 80, 55, 90, 65];

  return (
    <Box sx={{ maxWidth: '100%' }}>
      <Typography variant="h4" fontWeight="bold" color="primary" sx={{ mb: 3 }}>
        Dashboard General
      </Typography>

      {/* FILA 1: LAS 4 TARJETAS SUPERIORES (Basado en tu primera captura) */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        
        {/* Tarjeta 1: Ingresos (Total Sales) */}
        <Grid item xs={12} md={3}>
          <Card elevation={0} sx={{ border: `1px solid ${theme.palette.divider}`, height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">Ingresos Totales</Typography>
                <InfoOutlinedIcon fontSize="small" color="action" />
              </Box>
              <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>Bs 12,560</Typography>
              <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                  WoW <ArrowDropUpIcon color="error" /> <span style={{ color: '#d32f2f' }}>12%</span>
                </Typography>
                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                  DoD <ArrowDropDownIcon color="success" /> <span style={{ color: '#388e3c' }}>5%</span>
                </Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body2" color="text.secondary">Ingresos de hoy: $ 423</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Tarjeta 2: Visitas / Usuarios (Gráfico de Área) */}
        <Grid item xs={12} md={3}>
          <Card elevation={0} sx={{ border: `1px solid ${theme.palette.divider}`, height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">Usuarios Activos</Typography>
                <InfoOutlinedIcon fontSize="small" color="action" />
              </Box>
              <Typography variant="h4" fontWeight="bold">8,846</Typography>
              <Box sx={{ height: 60, mt: 1 }}>
                <SparkLineChart 
                  data={[1, 4, 2, 5, 7, 2, 4, 6, 8, 3, 5]} 
                  area 
                  colors={[theme.palette.primary.main]} 
                  showTooltip
                />
              </Box>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body2" color="text.secondary">Nuevos hoy: 124</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Tarjeta 3: Pagos / Registros (Gráfico de Barras) */}
        <Grid item xs={12} md={3}>
          <Card elevation={0} sx={{ border: `1px solid ${theme.palette.divider}`, height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">Nuevas Mascotas</Typography>
                <InfoOutlinedIcon fontSize="small" color="action" />
              </Box>
              <Typography variant="h4" fontWeight="bold">6,560</Typography>
              <Box sx={{ height: 60, mt: 1 }}>
                <SparkLineChart 
                  plotType="bar"
                  data={[3, 5, 2, 6, 8, 4, 7, 5, 9, 3, 6]} 
                  colors={[theme.palette.secondary.main]} 
                  showTooltip
                />
              </Box>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body2" color="text.secondary">Tasa de conversión: 60%</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Tarjeta 4: Efectividad (Barra de Progreso) */}
        <Grid item xs={12} md={3}>
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
                <Typography variant="body2" color="text.secondary">85%</Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: 'flex', gap: 2, pt: 1 }}>
                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                  WoW <ArrowDropUpIcon color="success" /> <span style={{ color: '#388e3c' }}>12%</span>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

      </Grid>

      {/* FILA 2: PROPORCIÓN DE SERVICIOS (Gráfico de Pastel tipo Dona) */}
      <Card elevation={0} sx={{ border: `1px solid ${theme.palette.divider}`, mb: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
            Proporción de Uso de Servicios (Directorio)
          </Typography>
          <Grid container alignItems="center">
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: 4544, label: 'Peluquerías', color: '#1976d2' },
                      { id: 1, value: 3321, label: 'Guarderías', color: '#00e676' },
                      { id: 2, value: 3113, label: 'Veterinarias', color: '#ff9800' },
                      { id: 3, value: 2341, label: 'Tiendas de Croquetas', color: '#f44336' },
                    ],
                    innerRadius: 80,
                    paddingAngle: 2,
                    cornerRadius: 5,
                  },
                ]}
                width={400}
                height={250}
                slotProps={{ legend: { hidden: true } }} // Ocultamos la leyenda por defecto para hacer la nuestra
              />
            </Grid>
            <Grid item xs={12} md={6}>
              {/* Leyenda Personalizada al estilo de tu imagen */}
              <Box sx={{ bgcolor: theme.palette.background.default, p: 3, borderRadius: 2, border: `1px solid ${theme.palette.divider}` }}>
                <Typography sx={{ mb: 1.5, borderLeft: '4px solid #1976d2', pl: 1 }}>Peluquerías | 4544 | 30.95%</Typography>
                <Typography sx={{ mb: 1.5, borderLeft: '4px solid #00e676', pl: 1 }}>Guarderías | 3321 | 22.62%</Typography>
                <Typography sx={{ mb: 1.5, borderLeft: '4px solid #ff9800', pl: 1 }}>Veterinarias | 3113 | 21.20%</Typography>
                <Typography sx={{ borderLeft: '4px solid #f44336', pl: 1 }}>Tiendas de Croquetas | 2341 | 15.94%</Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* FILA 3: GRÁFICO DE LÍNEAS (Tráfico vs Uso de IA) */}
      <Card elevation={0} sx={{ border: `1px solid ${theme.palette.divider}` }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
            Consultas de Chatbot vs Escaneos con Cámara (IA)
          </Typography>
          <Box sx={{ width: '100%', height: 350 }}>
            <LineChart
              xAxis={[{ scaleType: 'point', data: lineChartDataX }]}
              series={[
                {
                  data: dataConsultasIA,
                  label: 'Consultas Chatbot (Free/Premium)',
                  color: theme.palette.primary.main,
                  curve: 'natural',
                },
                {
                  data: dataEscaneosCamara,
                  label: 'Escaneos de Cámara (Solo Premium)',
                  color: theme.palette.secondary.main,
                  curve: 'natural',
                },
              ]}
              grid={{ vertical: true, horizontal: true }}
              sx={{
                '.MuiLineElement-root': { strokeWidth: 3 },
                '.MuiMarkElement-root': { scale: '1.2', fill: theme.palette.background.paper, strokeWidth: 2 },
              }}
            />
          </Box>
        </CardContent>
      </Card>

    </Box>
  );
}