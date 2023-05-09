import React from 'react';
import { Grid, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material' ;
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export const StationDetails = ({ open, onClose, rowData }) =>{
    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                Detalles de la Solicitud
                <IconButton onClick={handleClose} sx={{ ml: 'auto' }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={5}>
                        <Typography>Nombre</Typography>
                        <Typography variant="h6">{rowData.name}</Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography>Nº de Serie</Typography>
                        <Typography variant="h6">{rowData.serial_number}</Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography>Marca</Typography>
                        <Typography variant="h6">{rowData.brand}</Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography>Modelo</Typography>
                        <Typography variant="h6">{rowData.model}</Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography>Longitud</Typography>
                        <Typography variant="h6">X</Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography>Latitud</Typography>
                        <Typography variant="h6">X</Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography>Protocolo</Typography>
                        <Typography variant="h6">X</Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography>Puerto</Typography>
                        <Typography variant="h6">X</Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography>Estado</Typography>
                        <Typography variant="h6">X</Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography>Solicitante</Typography>
                        <Typography variant="h6">{rowData.user}</Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography>Correo Electrónico</Typography>
                        <Typography variant="h6">X</Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography>Fecha de Solicitud</Typography>
                        <Typography variant="h6">{rowData.application_date}</Typography>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
}