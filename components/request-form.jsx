import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from '@mui/material' ;
import { styled } from '@mui/system';
import Cookies from "universal-cookie";

const Field = styled(TextField)({
  margin: theme => theme.spacing(1),
  width: '250px',
  padding: '8px'
});

export const RequestForm = ({ open, handleClose }) => {
  debugger;
  const cookies = new Cookies();
  const navigate = useNavigate();

  let token = cookies.get("token");
  let id_user = parseInt(cookies.get("id_user"));
  let email = cookies.get("email");

  if (!token) {
      navigate('/');
  }

  const [formData, setFormData] = useState({
    name: '',
    model: '',
    serial_number: '',
    latitude: '',
    brand: '',
    longitude: '',
  });

  const [formError, setFormError] = useState(true);

  const [showRequestDialog, setShowRequestDialog] = useState(open);

  useEffect(() => {
    setShowRequestDialog(open);
  }, [open]);

  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const handleRequest = async () => {
    try {
      debugger;
      if (formError) {
        return;
      }

      const data = {
        name: formData.name,
        model: formData.model,
        serial_number: formData.serial_number,
        latitude: parseInt(formData.latitude),
        brand: formData.brand,
        longitude: parseInt(formData.longitude)
      };
      
      const options = {
        method: 'POST',
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };
  
      const response = await fetch(`http://localhost:8080/api/v1/users/${id_user}/requests`, options);

      if (response.status === 201) {
        setShowSuccessDialog(true);
        setShowRequestDialog(false);
      }
      else {
        handleClose();
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validateForm = () => {  
    if (formData.name === '' || formData.model === '' || formData.serial_number === '' || formData.brand === '' || formData.latitude === '' || formData.longitude === '') {
      setFormError(true);
    } 
    else {
      setFormError(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  
    validateForm();
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      model: '',
      serial_number: '',
      latitude: '',
      brand: '',
      longitude: '',
    });
  };

  const handleAccept = () => {
    setShowSuccessDialog(false);
    handleClose();
    window.location.reload();
  };

  return (
    <>
      <Dialog open={showRequestDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
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
                          onChange={(e) => handleInputChange('name', e.target.value)}
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
                          onChange={(e) => handleInputChange('model', e.target.value)}
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
                          onChange={(e) => handleInputChange('serial_number', e.target.value)}
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
                          onChange={(e) => handleInputChange('latitude', e.target.value)}
                          inputProps={{
                            min: -90,
                            max: 90,
                          }}
                          InputProps={{
                            inputProps: {
                              min: -90,
                              max: 90,
                            },
                          }}
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
                          onChange={(e) => handleInputChange('brand', e.target.value)}
                      />
                  </Grid>
                  <Grid item xs={6}>
                      <Field
                          required
                          margin="dense"
                          id="longitude"
                          label="Longitud"
                          variant="outlined"
                          type="number"
                          value={formData.longitude}
                          onChange={(e) => handleInputChange('longitude', e.target.value)}
                          inputProps={{
                            min: -180,
                            max: 180,
                          }}
                          InputProps={{
                            inputProps: {
                              min: -180,
                              max: 180,
                            },
                          }}
                      />
                  </Grid>
              </Grid>
            <DialogActions>
              <Button onClick={() => { handleCancel(); handleClose(); }} color="primary">
                Cancelar
              </Button>
              <Button onClick={handleRequest} disabled={formError} color="primary">
                Solicitar
              </Button>
            </DialogActions>
        </DialogContent>
        
      </Dialog>

      <Dialog
        open={showSuccessDialog}
        onClose={handleAccept}
        aria-labelledby="success-dialog-title"
        >
        <DialogTitle id="success-dialog-title">Solicitar Estación</DialogTitle>
        <DialogContent dividers>
          <Grid>
            <Typography align="center">
              Se enviara un Email a su casilla {email} cuando su solicitud sea aprobada.
            </Typography>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAccept} color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};