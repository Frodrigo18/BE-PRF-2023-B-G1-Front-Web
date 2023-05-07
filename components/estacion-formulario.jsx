import React from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material' ;
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

export const EstacionFormulario = ({ open, handleClose, handleSubmit }) => {

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Solicitar Estación</DialogTitle>
      <DialogContent>
        <Form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Field
                        required
                        autoFocus
                        margin="dense"
                        id="nombre"
                        label="Nombre de Estación"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={6}>
                    <Field
                        required
                        margin="dense"
                        id="modelo"
                        label="Modelo"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={6}>
                    <Field
                        required
                        margin="dense"
                        id="serie"
                        label="Nº de Serie"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={6}>
                    <Field
                        required
                        margin="dense"
                        id="latitud"
                        label="Latitud"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={6}>
                    <Field
                        required
                        margin="dense"
                        id="marca"
                        label="Marca"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={6}>
                    <Field
                        required
                        margin="dense"
                        id="longitud"
                        label="Longitud"
                        variant="outlined"
                    />
                </Grid>
            </Grid>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button type="submit" color="primary">
              Solicitar
            </Button>
          </DialogActions>
        </Form>
      </DialogContent>
    </Dialog>
  );
};