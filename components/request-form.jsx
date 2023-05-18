import { React , useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material' ;
import { styled } from '@mui/system';
import Cookies from "universal-cookie";

const Field = styled(TextField)({
  margin: theme => theme.spacing(1),
  width: '250px',
  padding: '8px'
});

export const RequestForm = ({ open, handleClose }) => {
  const cookies = new Cookies();
  const navigate = useNavigate();

  let token = cookies.get("token");
  let id_user = parseInt(cookies.get("id_user"));

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
    
  const handleRequest = async () => {
    try {
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
  
      await fetch(`http://localhost:8080/api/v1/users/${id_user}/requests`, options);
  
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
                        id="longitude"
                        label="Longitud"
                        variant="outlined"
                        type="number"
                        value={formData.longitude}
                        onChange={(e) =>
                          setFormData((prevFormData) => ({
                            ...prevFormData,
                            longitude: e.target.value,
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