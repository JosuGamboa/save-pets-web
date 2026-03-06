import React from 'react';
import { 
  Typography, Box, Paper, Grid, Card, CardContent, Button, 
  Chip, Avatar, IconButton, TextField, InputAdornment, Divider, List, ListItem, ListItemText, ListItemAvatar
} from '@mui/material';

// Íconos
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import ArticleIcon from '@mui/icons-material/Article';
import CommentIcon from '@mui/icons-material/Comment';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CodeIcon from '@mui/icons-material/Code';
import SmartphoneIcon from '@mui/icons-material/Smartphone';

// Datos de prueba realistas enfocados en el desarrollo de Save Pets
const blogPosts = [
  { 
    id: 1, 
    title: 'Cómo integramos IA para recomendar cortes de mascotas', 
    excerpt: 'Detalles técnicos sobre el uso de modelos de visión artificial para analizar el pelaje y raza desde la cámara del celular.', 
    date: '02 Mar 2026', 
    category: 'Inteligencia Artificial', 
    views: '1.2k', 
    status: 'Publicado' 
  },
  { 
    id: 2, 
    title: 'Migración exitosa: De HTML/CSS a React + Material UI', 
    excerpt: 'El proceso paso a paso de cómo modernizamos el dashboard administrativo de Save Pets utilizando Vite y MUI v6.', 
    date: '28 Feb 2026', 
    category: 'Frontend Web', 
    views: '850', 
    status: 'Publicado' 
  },
  { 
    id: 3, 
    title: 'Arquitectura Freemium en nuestra App de Flutter', 
    excerpt: 'Diseñando la lógica de paywalls y límites de consultas para diferenciar entre los usuarios Free y Premium.', 
    date: '25 Feb 2026', 
    category: 'Mobile Dev', 
    views: '420', 
    status: 'Borrador' 
  },
];

export default function Blog() {
  return (
    <Box sx={{ maxWidth: '100%' }}>
      {/* Encabezado */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" color="primary">
            Blog Técnico y Avances
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Gestiona las publicaciones, actualizaciones del sistema y artículos de desarrollo.
          </Typography>
        </Box>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} sx={{ fontWeight: 'bold' }}>
          Nuevo Artículo
        </Button>
      </Box>

      {/* Tarjetas de Estadísticas del Blog */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card elevation={0} sx={{ border: '1px solid #e2e8f0' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ bgcolor: '#e3f2fd', color: '#1976d2', mr: 2 }}><ArticleIcon /></Avatar>
              <Box>
                <Typography variant="body2" color="text.secondary">Artículos Publicados</Typography>
                <Typography variant="h5" fontWeight="bold">24</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card elevation={0} sx={{ border: '1px solid #e2e8f0' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ bgcolor: '#e8f5e9', color: '#388e3c', mr: 2 }}><TrendingUpIcon /></Avatar>
              <Box>
                <Typography variant="body2" color="text.secondary">Lecturas Totales (Mes)</Typography>
                <Typography variant="h5" fontWeight="bold">12.5k</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card elevation={0} sx={{ border: '1px solid #e2e8f0' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ bgcolor: '#fff3e0', color: '#f57c00', mr: 2 }}><CommentIcon /></Avatar>
              <Box>
                <Typography variant="body2" color="text.secondary">Comentarios Técnicos</Typography>
                <Typography variant="h5" fontWeight="bold">186</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        {/* Columna Principal: Lista de Artículos */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Paper elevation={0} sx={{ border: '1px solid #e2e8f0', p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" fontWeight="bold">Gestor de Contenidos</Typography>
              <TextField 
                size="small" 
                placeholder="Buscar artículo..." 
                InputProps={{
                  startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
                }}
                sx={{ width: '250px' }}
              />
            </Box>

            {/* Iterando sobre los posts */}
            {blogPosts.map((post) => (
              <Box key={post.id} sx={{ mb: 3, pb: 3, borderBottom: '1px solid #e2e8f0', '&:last-child': { borderBottom: 'none', mb: 0, pb: 0 } }}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 8 }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      {post.date} • <VisibilityIcon sx={{ fontSize: 14, verticalAlign: 'middle', mr: 0.5 }}/> {post.views} vistas
                    </Typography>
                    <Typography variant="h6" fontWeight="bold" color="primary" sx={{ mb: 1, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
                      {post.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {post.excerpt}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Chip label={post.category} size="small" icon={post.category === 'Frontend Web' ? <CodeIcon /> : post.category === 'Mobile Dev' ? <SmartphoneIcon /> : undefined} />
                      <Chip label={post.status} size="small" color={post.status === 'Publicado' ? 'success' : 'default'} variant="outlined" />
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
                    <IconButton color="primary" size="small"><EditIcon /></IconButton>
                    <IconButton color="error" size="small"><DeleteIcon /></IconButton>
                  </Grid>
                </Grid>
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* Columna Lateral: Borrador Rápido y Categorías */}
        <Grid size={{ xs: 12, lg: 4 }}>
          {/* Tarjeta de Borrador Rápido */}
          <Paper elevation={0} sx={{ border: '1px solid #e2e8f0', p: 3, mb: 4, bgcolor: 'background.paper' }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Crear Borrador Rápido</Typography>
            <TextField fullWidth size="small" placeholder="Título de la idea..." sx={{ mb: 2 }} />
            <TextField fullWidth multiline rows={4} placeholder="Escribe aquí los apuntes técnicos de tu avance..." sx={{ mb: 2 }} />
            <Button variant="outlined" color="primary" fullWidth>Guardar Borrador</Button>
          </Paper>

          {/* Tarjeta de Comentarios Recientes */}
          <Paper elevation={0} sx={{ border: '1px solid #e2e8f0', p: 3 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Comentarios Recientes</Typography>
            <List disablePadding>
              <ListItem alignItems="flex-start" disableGutters>
                <ListItemAvatar>
                  <Avatar sx={{ width: 32, height: 32, bgcolor: '#ffb74d' }}>JD</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={<Typography variant="subtitle2" fontWeight="bold">Juan Dev</Typography>}
                  secondary={<Typography variant="body2" color="text.secondary">"Me encantó la solución que usaron para el estado en Flutter..."</Typography>}
                />
              </ListItem>
              <Divider component="li" />
              <ListItem alignItems="flex-start" disableGutters sx={{ pt: 1 }}>
                <ListItemAvatar>
                  <Avatar sx={{ width: 32, height: 32, bgcolor: '#4fc3f7' }}>CM</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={<Typography variant="subtitle2" fontWeight="bold">CarlosM</Typography>}
                  secondary={<Typography variant="body2" color="text.secondary">"¿Qué modelo de IA específico recomendaron en el artículo?"</Typography>}
                />
              </ListItem>
            </List>
            <Button size="small" color="primary" sx={{ mt: 1, p: 0 }}>Ver todos los comentarios</Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}