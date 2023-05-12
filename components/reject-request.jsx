import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material' ;

export const RejectRequest = ({ open, onClose, rowData }) => {
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
    
    const handleApprove = async () => {
        try {
           await fetch(`http://localhost:8080/users/${rowData.created_by}/requests/${rowData.id}/reject`, options);
           handleClose();
           window.location.reload();
        } catch (error) {
          console.log(error);
        }
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle id="form-dialog-title">Rechazar Solicitud de Estación</DialogTitle>
            <DialogContent>
                <DialogContent dividers>
                    <Typography align="center">¿Esta seguro de rechazar la Estación {rowData.station} con Nº de Serie {rowData.serial_number}?<br/>Se enviaria un Email de aviso a la dirección {rowData.email}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                    Cancelar
                    </Button>
                    <Button onClick={handleApprove} color="primary">
                    Rechazar
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
}