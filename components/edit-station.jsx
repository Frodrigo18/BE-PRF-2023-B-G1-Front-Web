import { React, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material' ;
import Cookies from "universal-cookie";

export const EditStation = ({ open, onClose, rowData }) =>{
  const cookies = new Cookies();
  const navigate = useNavigate();

  let token = cookies.get("token");
  let id_user = cookies.get("id_user");

  if (!token) {
      navigate('/');
  }

  const handleClose = () => {
      onClose();
  };

  const [formData, setFormData] = useState({
    name: rowData.name
  });

  const handleEdit = async () => {
    try {
      const data = {
        name: formData.name
      };
      
      const options = {
        method: 'PATCH',
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };
  
      await fetch(`http://localhost:8080/users/${id_user}/stations/${rowData.id}/rename`, options);
  
      handleClose();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Editar Estación</DialogTitle>
      <DialogContent dividers>
          <Grid container spacing={2}>
              <Grid item xs={6}>
                  <TextField
                      required
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Nombre"
                      variant="outlined"
                      style = {{width: 250}}
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          name: e.target.value,
                        }))
                      }
                  />
              </Grid>
          </Grid>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleEdit} color="primary">
              Guardar
            </Button>
          </DialogActions>
      </DialogContent>
    </Dialog>
  );
};