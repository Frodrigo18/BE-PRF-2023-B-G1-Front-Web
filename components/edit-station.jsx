import React from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material' ;
import { useState } from "react";
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
  const handleClose = () => {
      onClose();
  };

  const [formData, setFormData] = useState({
    name: rowData.name
  });

  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZXNwaXJBUiIsImlhdCI6MTY4MzE1NjQzMSwiZXhwIjoxNzQ2MjI4NDMxLCJhdWQiOiJ3d3cuZXhhbXBsZS5jb20iLCJzdWIiOiJqcm9ja2V0QGV4YW1wbGUuY29tIiwiaWQiOiIxIiwidXNlcm5hbWUiOiJKb2huRG9lIiwicm9sIjoiYWRtaW4ifQ.4AdK8vzb0ec-m6jjGp8aLFoO4Prn6fFwjJmeqiwBS8s";

  const handleEdit = async () => {
    try {
      const userId = 1;

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
  
      const response = await fetch(`http://localhost:8080/users/${userId}/stations/${rowData.id}/rename`, options);
  
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
        </Form>
      </DialogContent>
    </Dialog>
  );
};