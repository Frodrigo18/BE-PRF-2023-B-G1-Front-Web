import React from 'react';
import { Grid, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material' ;
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


export const RequestDetails = ({ open, onClose, rowData }) =>{
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
            <DialogContent dividers>
                <Grid container spacing={2}>
                    <Grid item xs={5}>
                        <Typography>Solicitante</Typography>
                        <Typography variant="h6">{rowData.created_by}</Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography>Correo Electrónico</Typography>
                        <Typography variant="h6">{rowData.email}</Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography>Fecha de Solicitud</Typography>
                        <Typography variant="h6">{rowData.created_at}</Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography>Estado</Typography>
                        <Typography variant="h6">
                            {(() => {
                                switch (rowData.status) {
                                case 'APPROVED':
                                    return 'Aprobada';
                                case 'REJECTED':
                                    return 'Rechazada';
                                case 'PENDING':
                                    return 'Pendiente';
                                default:
                                    return rowData.status;
                                }
                            })()}
                        </Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography>Estación</Typography>
                        <Typography variant="h6">{rowData.name}</Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography>Nº de Serie</Typography>
                        <Typography variant="h6">{rowData.serial_number}</Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography>Marca</Typography>
                        <Typography variant="h6">X</Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography>Modelo</Typography>
                        <Typography variant="h6">X</Typography>
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
                </Grid>
            </DialogContent>
        </Dialog>
    );
}