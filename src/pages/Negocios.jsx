import React, { useState } from 'react';
import { 
  Typography, Box, Paper, Grid, Card, CardContent, Button, Avatar, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, 
  TextField, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, 
  FormControl, InputLabel, Select, MenuItem, CircularProgress, InputAdornment
} from '@mui/material';

// Íconos
import StorefrontIcon from '@mui/icons-material/Storefront';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import StarRateIcon from '@mui/icons-material/StarRate';
import SendIcon from '@mui/icons-material/Send';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import CategoryIcon from '@mui/icons-material/Category';

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

  // ESTADOS PARA LAS VENTANAS EMERGENTES
  const [openPromo, setOpenPromo] = useState(false);
  const [openProductModal, setOpenProductModal] = useState(false);
  
  // ESTADO DE CARGA PARA EL BOTÓN
  const [loading, setLoading] = useState(false);

  // ESTADO PARA EL FORMULARIO DEL PRODUCTO
  const [productData, setProductData] = useState({ nombre: '', precio: '', categoria: 'Ropa' });
  const categorias = ['Ropa', 'Accesorios', 'Juguetes', 'Alimentos'];

  // Función para cerrar modal y limpiar formulario (Mejora de UX)
  const closeProductModal = () => {
    setProductData({ nombre: '', precio: '', categoria: 'Ropa' });
    setOpenProductModal(false);
  };

  // Lógica del Chat
  const handleEnviarMensaje = () => {
    if (nuevoMensaje.trim() === "") return;
    const horaActual = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMensajes([...mensajes, { id: mensajes.length + 1, emisor: 'centro', texto: nuevoMensaje, hora: horaActual }]);
    setNuevoMensaje("");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleEnviarMensaje();
  };

  // Lógica Modal Promoción
  const handleLanzarPromocion = () => {
    setOpenPromo(false);
    alert("🚀 ¡Éxito! Notificación Push enviada a 145 usuarios.");
  };

  // ==========================================
  // 🔥 CONEXIÓN AL BACKEND (FASTAPI + WEBSOCKETS)
  // ==========================================
  const handleSaveProduct = async () => {
    // 1. Validación estricta del formulario
    if (!productData.nombre.trim() || !productData.precio) {
      alert("⚠️ Por favor, ingresa el nombre y el precio del producto.");
      return;
    }

    setLoading(true); // Iniciamos la animación de carga

    try {
      // 2. Envío de datos por Fetch nativo hacia FastAPI
      const response = await fetch("http://localhost:8000/api/productos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: productData.nombre.trim(),
          precio: parseFloat(productData.precio),
          categoria: productData.categoria,
          imagen_icono: "CheckroomIcon", // Para el MVP
          nombre_local: "Fundación Unifranz" // Para el MVP
        }),
      });

      // 3. Procesamiento de la respuesta del servidor
      if (response.ok) {
        const result = await response.json();
        console.log("✅ Éxito al guardar en BD:", result);
        
        alert(`¡Producto "${result.nombre}" guardado y emitido por WebSockets a los celulares!`);
        
        // Limpiamos el formulario y cerramos el modal usando la función limpia
        closeProductModal();
      } else {
        const errorData = await response.json();
        alert(`❌ Error al guardar: ${errorData.detail || 'Verifica los datos enviados.'}`);
      }
    } catch (error) {
      console.error("Fallo grave de red:", error);
      alert("❌ Error de conexión. ¿Verificaste que FastAPI esté corriendo en el puerto 8000?");
    } finally {
      setLoading(false); // Detenemos la animación sin importar el resultado
    }
  };

  return (
    <Box sx={{ maxWidth: '100%' }}>
      
      {/* CABECERA Y BOTONES */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" color="primary">Portal de Centros Asociados 🏪</Typography>
          <Typography variant="body1" color="text.secondary">Gestión de citas, mensajería e inventario en vivo.</Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            variant="outlined" 
            color="primary" 
            startIcon={<AddCircleOutlineIcon />} 
            sx={{ fontWeight: 'bold', bgcolor: 'background.paper', borderRadius: '10px', textTransform: 'none' }}
            onClick={() => setOpenProductModal(true)}
          >
            Añadir Producto
          </Button>

          <Button 
            variant="contained" 
            color="secondary" 
            startIcon={<StorefrontIcon />} 
            sx={{ fontWeight: 'bold', borderRadius: '10px', textTransform: 'none' }}
            onClick={() => setOpenPromo(true)}
          >
            Promoción Flash
          </Button>
        </Box>
      </Box>

      {/* MODAL 1: PROMOCIÓN FLASH */}
      <Dialog open={openPromo} onClose={() => setOpenPromo(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: '16px' } }}>
        <DialogTitle fontWeight="bold" color="secondary">⚡ Configurar Promoción Flash</DialogTitle>
        <DialogContent dividers>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Envía una alerta inmediata a dueños de mascotas cercanos.
          </Typography>
          <FormControl fullWidth size="small" sx={{ mb: 3 }}>
            <InputLabel>Servicio</InputLabel>
            <Select label="Servicio" defaultValue="bano">
              <MenuItem value="bano">Baño y Peluquería</MenuItem>
              <MenuItem value="guarderia">Guardería por horas</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth multiline rows={2} label="Mensaje"
            defaultValue="¡Espacios libres esta tarde! 20% de descuento."
            variant="outlined"
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenPromo(false)} sx={{ textTransform: 'none' }}>Cancelar</Button>
          <Button onClick={handleLanzarPromocion} variant="contained" color="secondary" sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 'bold' }}>Enviar Push</Button>
        </DialogActions>
      </Dialog>

      {/* MODAL 2: AÑADIR PRODUCTO (DISEÑO ESTÉTICO MEJORADO) */}
      <Dialog 
        open={openProductModal} 
        onClose={closeProductModal} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          sx: { borderRadius: '20px', boxShadow: '0px 10px 30px rgba(0,0,0,0.08)' }
        }}
      >
        <DialogTitle sx={{ fontWeight: 'bold', fontSize: '1.4rem', color: 'primary.main', pb: 1, pt: 3 }}>
          🛍️ Añadir Nuevo Producto al Catálogo
        </DialogTitle>
        <DialogContent dividers sx={{ borderColor: 'divider', py: 3 }}>
          <Grid container spacing={4}>
            {/* Sección Izquierda: Subida de Fotografía Estilizada */}
            <Grid item xs={12} sm={5}>
              <Typography variant="subtitle2" fontWeight="bold" color="text.primary" sx={{ mb: 1.5, letterSpacing: '0.3px' }}>
                Fotografía del Producto
              </Typography>
              <Box 
                sx={{ 
                  height: 200, 
                  border: '2px dashed', 
                  borderColor: 'primary.light', 
                  borderRadius: '16px', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  bgcolor: 'background.paper',
                  transition: 'all 0.3s ease-in-out',
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: 'rgba(79, 195, 247, 0.04)',
                    borderColor: 'primary.main',
                    transform: 'scale(1.01)'
                  }
                }}
              >
                <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1.5, opacity: 0.8 }} />
                <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ px: 2, mb: 1.5, fontSize: '0.8rem' }}>
                  Suelte su imagen aquí o busque en su dispositivo
                </Typography>
                <Button 
                  variant="contained" 
                  size="small" 
                  component="label"
                  disableElevation
                  sx={{ 
                    bgcolor: 'primary.main', 
                    borderRadius: '8px', 
                    textTransform: 'none', 
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    '&:hover': { bgcolor: 'primary.dark' }
                  }}
                >
                  Seleccionar Archivo 
                  <input hidden accept="image/*" type="file" />
                </Button>
              </Box>
            </Grid>

            {/* Sección Derecha: Campos de Texto Pulidos */}
            <Grid item xs={12} sm={7}>
              <Typography variant="subtitle2" fontWeight="bold" color="text.primary" sx={{ mb: 2, letterSpacing: '0.3px' }}>
                Detalles Comerciales
              </Typography>
              
              <TextField 
                fullWidth 
                size="medium" 
                label="Nombre del Artículo" 
                variant="outlined" 
                placeholder="Ej. Sudadera abrigada para invierno"
                sx={{ mb: 3.5, '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocalOfferIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
                value={productData.nombre} 
                onChange={(e) => setProductData({...productData, nombre: e.target.value})}
              />

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField 
                    fullWidth 
                    size="medium" 
                    label="Precio de Venta" 
                    type="number" 
                    variant="outlined"
                    placeholder="0.00"
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><Typography fontWeight="bold" color="text.secondary" sx={{ fontSize: '0.9rem' }}>Bs.</Typography></InputAdornment>,
                    }}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                    value={productData.precio} 
                    onChange={(e) => setProductData({...productData, precio: e.target.value})}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth size="medium" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}>
                    <InputLabel id="select-categoria-label">Categoría</InputLabel>
                    <Select 
                      labelId="select-categoria-label"
                      value={productData.categoria} 
                      label="Categoría"
                      startAdornment={
                        <InputAdornment position="start" sx={{ mr: 1 }}>
                          <CategoryIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                        </InputAdornment>
                      }
                      onChange={(e) => setProductData({...productData, categoria: e.target.value})}
                    >
                      {categorias.map(cat => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        
        <DialogActions sx={{ p: 2.5, px: 3, bgcolor: 'background.paper', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px' }}>
          <Button 
            onClick={closeProductModal} 
            color="inherit" 
            disabled={loading}
            sx={{ textTransform: 'none', fontWeight: 'bold', color: 'text.secondary' }}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleSaveProduct} 
            variant="contained" 
            color="primary" 
            disableElevation
            disabled={loading}
            startIcon={loading ? <CircularProgress size={18} color="inherit" /> : null}
            sx={{ 
              fontWeight: 'bold', 
              borderRadius: '12px', 
              px: 3, 
              py: 1,
              textTransform: 'none',
              boxShadow: loading ? 'none' : '0px 4px 12px rgba(79, 195, 247, 0.2)',
              '&:hover': { bgcolor: 'primary.dark' }
            }}
          >
            {loading ? 'Sincronizando...' : 'Publicar en la App'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* RESTO DE TU UI (Tarjetas, Agenda, Chat) */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card elevation={0} sx={{ border: '1px solid #e2e8f0', borderRadius: '16px' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ bgcolor: '#e3f2fd', color: '#1976d2', mr: 2 }}><EventAvailableIcon /></Avatar>
              <Box><Typography variant="body2" color="text.secondary">Citas</Typography><Typography variant="h5" fontWeight="bold">12</Typography></Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card elevation={0} sx={{ border: '1px solid #e2e8f0', borderRadius: '16px' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ bgcolor: '#e8f5e9', color: '#388e3c', mr: 2 }}><ChatBubbleIcon /></Avatar>
              <Box><Typography variant="body2" color="text.secondary">Mensajes</Typography><Typography variant="h5" fontWeight="bold">3</Typography></Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card elevation={0} sx={{ border: '1px solid #e2e8f0', borderRadius: '16px' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ bgcolor: '#fff3e0', color: '#f57c00', mr: 2 }}><StarRateIcon /></Avatar>
              <Box><Typography variant="body2" color="text.secondary">Calificación</Typography><Typography variant="h5" fontWeight="bold">4.8</Typography></Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        <Grid item xs={12} lg={7}>
          <Paper elevation={0} sx={{ border: '1px solid #e2e8f0', p: 3, borderRadius: '16px' }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Agenda de Hoy</Typography>
            <TableContainer>
              <Table size="small">
                <TableHead sx={{ bgcolor: '#f8fafc' }}>
                  <TableRow>
                    <TableCell>Hora</TableCell>
                    <TableCell>Cliente</TableCell>
                    <TableCell>Estado</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {citasHoy.map((cita) => (
                    <TableRow key={cita.id}>
                      <TableCell fontWeight="bold">{cita.hora}</TableCell>
                      <TableCell>{cita.cliente}</TableCell>
                      <TableCell><Chip label={cita.estado} size="small" color="info" /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={5}>
          <Paper elevation={0} sx={{ border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', height: '400px', borderRadius: '16px', overflow: 'hidden' }}>
            <Box sx={{ p: 2, bgcolor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
              <Typography variant="subtitle2" fontWeight="bold">Chat con Clientes</Typography>
            </Box>
            <Box sx={{ p: 2, flexGrow: 1, overflowY: 'auto' }}>
              {mensajes.map((msg) => (
                <Box key={msg.id} sx={{ alignSelf: msg.emisor === 'centro' ? 'flex-end' : 'flex-start', mb: 2 }}>
                  <Paper sx={{ p: 1, bgcolor: msg.emisor === 'centro' ? '#e3f2fd' : '#f1f5f9', borderRadius: '10px' }}>
                    <Typography variant="body2">{msg.texto}</Typography>
                  </Paper>
                </Box>
              ))}
            </Box>
            <Box sx={{ p: 2, display: 'flex', borderTop: '1px solid #e2e8f0' }}>
              <TextField fullWidth size="small" value={nuevoMensaje} onChange={(e) => setNuevoMensaje(e.target.value)} onKeyDown={handleKeyPress} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }} />
              <IconButton color="primary" onClick={handleEnviarMensaje} sx={{ ml: 1 }}><SendIcon /></IconButton>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}