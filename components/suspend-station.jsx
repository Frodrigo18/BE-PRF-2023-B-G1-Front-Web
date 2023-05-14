import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material' ;

export const SuspendStation = ({ open, onClose, rowData }) => {
    const handleClose = () => {
        onClose();
    };

    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZXNwaXJBUiIsImlhdCI6MTY4MzE1NjQzMSwiZXhwIjoxNzQ2MjI4NDMxLCJhdWQiOiJ3d3cuZXhhbXBsZS5jb20iLCJzdWIiOiJqcm9ja2V0QGV4YW1wbGUuY29tIiwiaWQiOiIxIiwidXNlcm5hbWUiOiJKb2huRG9lIiwicm9sIjoiYWRtaW4ifQ.4AdK8vzb0ec-m6jjGp8aLFoO4Prn6fFwjJmeqiwBS8s";
    
    const headers = new Headers();
    headers.append("Authorization", `${token}`);

    const options = {
        method: "PATCH",
        headers: headers
    };

    const handleSuspend = async () => {
        try {
           await fetch(`http://localhost:8080/users/${rowData.created_by}/stations/${rowData.id}/suspend`, options);
           handleClose();
           window.location.reload();
        } catch (error) {
          console.log(error);
        }
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle id="form-dialog-title">Inactivar Estación</DialogTitle>
            <DialogContent>
                <DialogContent dividers>
                    <Typography align="center">¿Esta seguro de inactivar la Estacion { rowData.name } con Nº de Serie { rowData.serial_number }?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                    Cancelar
                    </Button>
                    <Button onClick={handleSuspend} color="primary">
                    Inactivar
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
}