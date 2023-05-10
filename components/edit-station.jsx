import React from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material' ;
import { useState } from "react";
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/system';

const Form = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  margin: theme => theme.spacing(2)
});

const Field = styled(TextField)({
  margin: theme => theme.spacing(1),
  width: '250px',
  padding: '8px'
});

export const EditStation = ({ open, onClose, rowData }) =>{
  const [isActive, setIsActive] = useState(rowData.status === "ACTIVE");

  const handleSwitchChange = (event) => {
    setIsActive(event.target.checked);
  };

  const handleClose = () => {
      onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Editar Estación</DialogTitle>
      <DialogContent dividers>
        <Form>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Field
                        required
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nombre"
                        variant="outlined"
                        value={rowData.name}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Field
                        required
                        autoFocus
                        margin="dense"
                        id="protocol"
                        label="Protocolo"
                        variant="outlined"
                        value="X"
                    />
                </Grid>
                <Grid item xs={6}>
                    <Field
                        required
                        autoFocus
                        margin="dense"
                        id="port"
                        label="Puerto"
                        variant="outlined"
                        value="X"
                    />
                </Grid>
                <Grid item xs={6}>
                    <Field
                        required
                        autoFocus
                        margin="dense"
                        id="length"
                        label="Longitud"
                        variant="outlined"
                        value="X"
                    />
                </Grid>
                <Grid item xs={6}>
                    <Field
                        required
                        autoFocus
                        margin="dense"
                        id="latitud"
                        label="Latitud"
                        variant="outlined"
                        value="X"
                    />
                </Grid>
                <Grid item xs={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={isActive}
                        onChange={handleSwitchChange}
                        color="primary"
                      />
                    }
                    label={isActive ? "Activa" : "Inactiva"}
                  />
                </Grid>
            </Grid>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button type="submit" color="primary">
              Guardar
            </Button>
          </DialogActions>
        </Form>
      </DialogContent>
    </Dialog>
  );
};