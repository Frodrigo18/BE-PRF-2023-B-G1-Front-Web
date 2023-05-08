import React from 'react';
import { useState , useRef } from 'react';
import { Grid, Accordion, AccordionSummary, AccordionDetails, Box, Typography, TextField, Button, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const FiltrosSolicitud = () => {
  const [value, setValue] = React.useState('todas');

  const [fields, setFields] = useState({
    nombre: '',
    fechaSolicitud: '',
    email: '',
    estacion: ''
  });

  const clearFields = (refs) => {
    refs.forEach((ref) => {
      if (ref.current) {
        ref.current.value = '';
      } else if (ref.clear) {
        ref.current.clear();
      }
    });
  };

  const textNombre = useRef();
  const textEmail = useRef();
  const textEstacion = useRef();
  const dateSolicitud = useRef();

  const handleClearFields = () => {
    clearFields([textNombre, textEmail, textEstacion, dateSolicitud]);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleBuscarClick = () => {
    // Aquí podrías implementar la lógica para buscar según los filtros seleccionados
  }

  return (
    <Grid container spacing={2}>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
            <Accordion sx={{width: '100%', bgcolor: '#D7E1F0'}}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="filtros-content" id="filtros-header">
                    <Typography variant="h6">Filtros</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '80%', margin: 'auto' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Nombre" inputRef={textNombre} fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Fecha de solicitud" inputRef={dateSolicitud} fullWidth type="date" InputLabelProps={{ shrink: true }} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Correo Electrónico" inputRef={textEmail} fullWidth type="email"/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Estación" inputRef={textEstacion} fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Box sx={{ display: 'flex', alignItems: 'center'}}>
                                <Typography variant="body1">Estado:</Typography>
                                <RadioGroup value={value} onChange={handleChange} row sx={{ ml: 3 }}>
                                    <FormControlLabel value="todas" control={<Radio />} label="Todas" />
                                    <FormControlLabel value="aprobadas" control={<Radio />} label="Activas" />
                                    <FormControlLabel value="rechazadas" control={<Radio />} label="Rechazadas" />
                                    <FormControlLabel value="pendientes" control={<Radio />} label="Pendientes" />
                                </RadioGroup>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button variant="outlined" sx={{ mr: 1 }} onClick={handleClearFields}>
                                    Limpiar
                                </Button>
                                <Button variant="contained" onClick={handleBuscarClick}>
                                    Buscar
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </Grid>
        <Grid item xs={2}></Grid>
    </Grid>
    
  );
};
