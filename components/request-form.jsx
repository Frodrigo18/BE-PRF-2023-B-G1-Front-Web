import React from 'react';
import { useState } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material' ;
import { styled } from '@mui/system';

const Field = styled(TextField)({
  margin: theme => theme.spacing(1),
  width: '250px',
  padding: '8px'
});

export const RequestForm = ({ open, handleClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    model: '',
    serial_number: '',
    latitude: '',
    brand: '',
    longitud: '',
  });

  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZXNwaXJBUiIsImlhdCI6MTY4MzE1NjQzMSwiZXhwIjoxNzQ2MjI4NDMxLCJhdWQiOiJ3d3cuZXhhbXBsZS5jb20iLCJzdWIiOiJqcm9ja2V0QGV4YW1wbGUuY29tIiwiaWQiOiIxIiwidXNlcm5hbWUiOiJKb2huRG9lIiwicm9sIjoiYWRtaW4ifQ.4AdK8vzb0ec-m6jjGp8aLFoO4Prn6fFwjJmeqiwBS8s";
    
  const handleRequest = async () => {
    try {
      const userId = 1;

      const data = {
        name: formData.name,
        model: formData.model,
        serial_number: formData.serial_number,
        latitude: parseInt(formData.latitude),
        brand: formData.brand,
        longitud: parseInt(formData.longitud)
      };
      
      const options = {
        method: 'POST',
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };
  
      const response = await fetch(`http://localhost:8080/users/${userId}/requests`, options);
  
      handleClose();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Solicitar Estación</DialogTitle>
      <DialogContent dividers>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Field
                        required
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nombre"
                        variant="outlined"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData((prevFormData) => ({
                            ...prevFormData,
                            name: e.target.value,
                          }))
                        }
                    />
                </Grid>
                <Grid item xs={6}>
                    <Field
                        required
                        margin="dense"
                        id="model"
                        label="Modelo"
                        variant="outlined"
                        value={formData.model}
                        onChange={(e) =>
                          setFormData((prevFormData) => ({
                            ...prevFormData,
                            model: e.target.value,
                          }))
                        }
                    />
                </Grid>
                <Grid item xs={6}>
                    <Field
                        required
                        margin="dense"
                        id="serial_number"
                        label="Nº de Serie"
                        variant="outlined"
                        value={formData.serial_number}
                        onChange={(e) =>
                          setFormData((prevFormData) => ({
                            ...prevFormData,
                            serial_number: e.target.value,
                          }))
                        }
                    />
                </Grid>
                <Grid item xs={6}>
                    <Field
                        required
                        margin="dense"
                        id="latitude"
                        label="Latitud"
                        variant="outlined"
                        type="number"
                        value={formData.latitude}
                        onChange={(e) =>
                          setFormData((prevFormData) => ({
                            ...prevFormData,
                            latitude: e.target.value,
                          }))
                        }
                    />
                </Grid>
                <Grid item xs={6}>
                    <Field
                        required
                        margin="dense"
                        id="brand"
                        label="Marca"
                        variant="outlined"
                        value={formData.brand}
                        onChange={(e) =>
                          setFormData((prevFormData) => ({
                            ...prevFormData,
                            brand: e.target.value,
                          }))
                        }
                    />
                </Grid>
                <Grid item xs={6}>
                    <Field
                        required
                        margin="dense"
                        id="longitud"
                        label="Longitud"
                        variant="outlined"
                        type="number"
                        value={formData.longitud}
                        onChange={(e) =>
                          setFormData((prevFormData) => ({
                            ...prevFormData,
                            longitud: e.target.value,
                          }))
                        }
                    />
                </Grid>
            </Grid>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleRequest} color="primary">
              Solicitar
            </Button>
          </DialogActions>
      </DialogContent>
    </Dialog>
  );
};