import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Paper, Tabs, Tab, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, IconButton, Chip, Button, Avatar, Grid, Card, CardContent, CircularProgress, Tooltip
} from '@mui/material';

// Íconos
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import PetsIcon from '@mui/icons-material/Pets';
import CategoryIcon from '@mui/icons-material/Category';
import RefreshIcon from '@mui/icons-material/Refresh';

// --- DATOS DE PRUEBA PARA PEDIDOS (Aún no tenemos tabla de ventas en BD) ---
const pedidosIniciales = [
  { id: 'ORD-001', cliente: 'Carlos Mendoza', items: '1x Camiseta Rayas Azul', total: 85.00, estado: 'Nuevo', fecha: 'Hace 10 min' },
  { id: 'ORD-002', cliente: 'Ana Torres', items: '2x Collar de Cuero', total: 90.00, estado: 'Preparando', fecha: 'Hace 1 hora' },
];

export default function Inventario() {
  const [tabIndex, setTabIndex] = useState(0);

  // Estados de datos reales
  const [productos, setProductos] = useState([]);
  const [pedidos, setPedidos] = useState(pedidosIniciales);
  const [loading, setLoading] = useState(true);

  // 🔥 NUEVO: Función para traer los productos reales de PostgreSQL
  const fetchProductos = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/productos");
      if (response.ok) {
        const data = await response.json();
        setProductos(data);
      } else {
        console.error("Error al obtener los productos");
      }
    } catch (error) {
      console.error("Error de red al conectar con FastAPI:", error);
    } finally {
      setLoading(false);
    }
  };

  // Ejecutar fetch al cargar el componente
  useEffect(() => {
    fetchProductos();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleDeleteProducto = (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este producto del catálogo? (Falta conectar ruta DELETE en backend)")) {
      setProductos(productos.filter(p => p.id !== id));
    }
  };

  const handleAvanzarPedido = (id, estadoActual) => {
    let nuevoEstado = '';
    if (estadoActual === 'Nuevo') nuevoEstado = 'Preparando';
    else if (estadoActual === 'Preparando') nuevoEstado = 'Entregado';

    if (nuevoEstado) {
      setPedidos(pedidos.map(p => p.id === id ? { ...p, estado: nuevoEstado } : p));
    }
  };

  // Helper para mostrar un icono según la categoría
  const renderCategoriaIcon = (categoria) => {
    if (categoria === 'Ropa') return <CheckroomIcon fontSize="small" />;
    if (categoria === 'Accesorios') return <PetsIcon fontSize="small" />;
    return <CategoryIcon fontSize="small" />;
  };

  return (
    <Box sx={{ maxWidth: '100%' }}>
      {/* CABECERA */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" color="primary">Gestión de Tienda 🛍️</Typography>
          <Typography variant="body1" color="text.secondary">
            Administra tu catálogo real y atiende los pedidos de la app.
          </Typography>
        </Box>
        <Button 
          variant="outlined" 
          color="primary" 
          startIcon={<RefreshIcon />}
          onClick={fetchProductos}
          sx={{ borderRadius: '10px', textTransform: 'none', fontWeight: 'bold' }}
        >
          Sincronizar Catálogo
        </Button>
      </Box>

      <Paper elevation={0} sx={{ border: '1px solid #e2e8f0', borderRadius: '16px', overflow: 'hidden' }}>
        {/* PESTAÑAS INTERNAS */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: '#f8fafc' }}>
          <Tabs value={tabIndex} onChange={handleTabChange} indicatorColor="primary" textColor="primary" sx={{ px: 2 }}>
            <Tab label={`Catálogo (${productos.length})`} sx={{ fontWeight: 'bold', textTransform: 'none', fontSize: 16 }} />
            <Tab 
              label={`Órdenes Activas (${pedidos.filter(p => p.estado !== 'Entregado').length})`} 
              sx={{ fontWeight: 'bold', textTransform: 'none', fontSize: 16 }} 
            />
          </Tabs>
        </Box>

        {/* CONTENIDO PESTAÑA 0: CATÁLOGO DE POSTGRESQL */}
        {tabIndex === 0 && (
          <Box sx={{ p: 0 }}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
                <CircularProgress color="primary" />
              </Box>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead sx={{ bgcolor: '#f1f5f9' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>ID</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Producto</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Categoría</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Precio</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Vendedor</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }} align="center">Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {productos.map((prod) => (
                      <TableRow key={prod.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell><Typography color="text.secondary" variant="body2">#{prod.id}</Typography></TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar sx={{ bgcolor: 'primary.light', color: 'white', width: 36, height: 36 }}>
                              {renderCategoriaIcon(prod.categoria)}
                            </Avatar>
                            <Typography fontWeight="bold" color="text.primary">{prod.nombre}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip label={prod.categoria} size="small" sx={{ bgcolor: 'rgba(79, 195, 247, 0.1)', color: 'primary.main', fontWeight: 'bold' }} />
                        </TableCell>
                        <TableCell sx={{ color: '#2e7d32', fontWeight: 'bold' }}>Bs. {prod.precio.toFixed(2)}</TableCell>
                        <TableCell><Typography variant="body2">{prod.nombre_local}</Typography></TableCell>
                        <TableCell align="center">
                          <Tooltip title="Editar (Próximamente)">
                            <IconButton color="primary" size="small"><EditIcon fontSize="small" /></IconButton>
                          </Tooltip>
                          <Tooltip title="Eliminar">
                            <IconButton color="error" size="small" onClick={() => handleDeleteProducto(prod.id)}><DeleteOutlineIcon fontSize="small" /></IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                    {productos.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                          <Typography variant="body1" color="text.secondary" gutterBottom>No hay productos en el catálogo.</Typography>
                          <Typography variant="body2" color="text.disabled">Agrega uno desde la pantalla de "Centros Asociados".</Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        )}

        {/* CONTENIDO PESTAÑA 1: PEDIDOS (KANBAN STYLE) */}
        {tabIndex === 1 && (
          <Box sx={{ p: 3, bgcolor: '#f8fafc', minHeight: '400px' }}>
            <Grid container spacing={3}>
              {pedidos.map((pedido) => (
                <Grid item xs={12} md={6} key={pedido.id}>
                  <Card elevation={0} sx={{ border: '1px solid', borderColor: pedido.estado === 'Entregado' ? '#c8e6c9' : '#e2e8f0', borderRadius: '16px', transition: 'all 0.2s', '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.05)' } }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="subtitle2" color="text.secondary">{pedido.id} • {pedido.fecha}</Typography>
                        <Chip 
                          label={pedido.estado} 
                          size="small" 
                          color={pedido.estado === 'Nuevo' ? 'error' : pedido.estado === 'Preparando' ? 'warning' : 'success'} 
                          sx={{ fontWeight: 'bold' }}
                        />
                      </Box>
                      
                      <Typography variant="h6" fontWeight="bold" gutterBottom color="text.primary">{pedido.cliente}</Typography>
                      <Typography variant="body2" sx={{ mb: 2, p: 1.5, bgcolor: '#f1f5f9', borderRadius: '8px', color: 'text.secondary' }}>
                        📦 <strong>Items:</strong> {pedido.items}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3, pt: 2, borderTop: '1px dashed #e2e8f0' }}>
                        <Typography variant="h6" color="#2e7d32" fontWeight="bold">Bs. {pedido.total.toFixed(2)}</Typography>
                        
                        {/* Botón de acción dinámica según el estado */}
                        {pedido.estado === 'Nuevo' && (
                          <Button variant="contained" color="warning" size="small" disableElevation sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 'bold' }} startIcon={<LocalShippingIcon />} onClick={() => handleAvanzarPedido(pedido.id, pedido.estado)}>
                            Empacar Pedido
                          </Button>
                        )}
                        {pedido.estado === 'Preparando' && (
                          <Button variant="contained" color="success" size="small" disableElevation sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 'bold' }} startIcon={<CheckCircleIcon />} onClick={() => handleAvanzarPedido(pedido.id, pedido.estado)}>
                            Marcar Entregado
                          </Button>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
              {pedidos.length === 0 && (
                <Grid item xs={12}>
                  <Typography align="center" color="text.secondary" sx={{ mt: 4 }}>No hay pedidos activos en este momento.</Typography>
                </Grid>
              )}
            </Grid>
          </Box>
        )}
      </Paper>
    </Box>
  );
}