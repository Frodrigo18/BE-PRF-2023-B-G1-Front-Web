import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material' ;

export const ApprobeRequest = ({ open, onClose, rowData }) => {
    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle id="form-dialog-title">Aprobar Solicitud de Estación</DialogTitle>
            <DialogContent>
                <DialogContent dividers>
                    <Typography align="center">¿Esta seguro de aprobar la Estacion {rowData.station} con Nº de Serie {rowData.serial_number}?<br/>Se enviaria un Email de aviso a la dirección {rowData.email}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                    Cancelar
                    </Button>
                    <Button type="submit" color="primary">
                    Aprobar
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
}