import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material' ;
import { format } from 'date-fns';
import Cookies from "universal-cookie";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export const StationDetails = ({ open, onClose, rowData }) =>{
    const cookies = new Cookies();
    const navigate = useNavigate();

    let token = cookies.get("token");
    
    if (!token) {
        navigate('/');
    }

    const handleClose = () => {
        onClose();
    };

    function formatDate(dateString) {
        const date = new Date(dateString);
        return format(date, 'MM/dd/yyyy');
    }

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
                    <Grid item xs={6}>
                        <Typography>Nombre</Typography>
                        <Typography variant="h6">{rowData.name}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>Nº de Serie</Typography>
                        <Typography variant="h6">{rowData.serial_number}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>Estado</Typography>
                        <Typography variant="h6">
                            {(() => {
                                switch (rowData.status) {
                                case 'ACTIVE':
                                    return 'Activa';
                                case 'INACTIVE':
                                    return 'Inactiva';
                                default:
                                    return rowData.status;
                                }
                            })()}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>Marca</Typography>
                        <Typography variant="h6">{rowData.brand}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>Modelo</Typography>
                        <Typography variant="h6">{rowData.model}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>Longitud</Typography>
                        <Typography variant="h6">{rowData.longitude}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>Latitud</Typography>
                        <Typography variant="h6">{rowData.latitude}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>Solicitante</Typography>
                        <Typography variant="h6">{rowData.user_name}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>Correo Electrónico</Typography>
                        <Typography variant="h6">{rowData.mail}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>Fecha de Creación</Typography>
                        <Typography variant="h6">{formatDate(rowData.created_at)}</Typography>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
}