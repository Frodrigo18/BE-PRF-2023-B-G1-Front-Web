import React from 'react';
import { Grid, Accordion, AccordionSummary, AccordionDetails, Box, Typography, TextField, Button, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const FiltrosEstacion = () => {
  const [value, setValue] = React.useState('todas');

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
                            <TextField label="Nombre" fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Solicitante" fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Número de serie" fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Fecha de solicitud" fullWidth type="date" InputLabelProps={{ shrink: true }} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Box sx={{ display: 'flex', alignItems: 'center'}}>
                                <Typography variant="body1">Estado:</Typography>
                                <RadioGroup value={value} onChange={handleChange} row sx={{ ml: 2 }}>
                                    <FormControlLabel value="todas" control={<Radio />} label="Todas" />
                                    <FormControlLabel value="activas" control={<Radio />} label="Activas" />
                                    <FormControlLabel value="inactivas" control={<Radio />} label="Inactivas" />
                                </RadioGroup>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button variant="outlined" sx={{ mr: 1 }} onClick={handleBuscarClick}>
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
