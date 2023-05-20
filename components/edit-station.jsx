import { React, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material' ;
import Cookies from "universal-cookie";

export const EditStation = ({ open, onClose, rowData }) =>{
  const cookies = new Cookies();
  const navigate = useNavigate();

  let token = cookies.get("token");

  if (!token) {
      navigate('/');
  }

  const handleClose = () => {
      onClose();
  };

  let [formData, setFormData] = useState({
    name: ""
  });

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      name: rowData.name
    }));
  }, [rowData]);

  const handleEdit = async () => {
    try {
      let data = {
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
  
      await fetch(`http://localhost:8080/api/v1/users/${rowData.created_by}/stations/${rowData.id}/rename`, options);
  
      handleClose();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const isSaveButtonDisabled = formData.name.trim() === '';

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
            <Button onClick={handleEdit} disabled={isSaveButtonDisabled} color="primary">
              Guardar
            </Button>
          </DialogActions>
      </DialogContent>
    </Dialog>
  );
};