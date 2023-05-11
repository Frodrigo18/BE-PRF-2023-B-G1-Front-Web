import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material' ;

export const RejectRequest = ({ open, onClose, rowData }) => {
    const handleClose = () => {
        onClose();
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
                    <Button type="submit" color="primary">
                    Rechazar
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
}