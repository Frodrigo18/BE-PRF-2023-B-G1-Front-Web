import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material' ;

export const InactivateStation = ({ open, onClose, rowData }) => {
    const handleClose = () => {
        onClose();
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
                    <Button type="submit" color="primary">
                    Inactivar
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
}