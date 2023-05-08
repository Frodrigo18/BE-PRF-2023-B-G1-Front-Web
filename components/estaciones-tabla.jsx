import React from 'react';
import { Grid, Typography, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import ArticleIcon from '@mui/icons-material/Article';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Paper from '@mui/material/Paper';
import { EstacionFormulario } from './estacion-formulario';
import { useState } from 'react';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Nombre', width: 130 },
    { field: 'serial_number', headerName: 'Nº de Serie', width: 130 },
    { field: 'brand', headerName: 'Marca', width: 130 },
    { field: 'model', headerName: 'Modelo', width: 130 },
    { field: 'user', headerName: 'Solicitante', width: 130 },
    { field: 'application_date', headerName: 'Fecha de Solicitud', width: 130 },
    {
        sortable: false,
        width: 150,
        disableColumnMenu: true,
        renderCell: (params) => (
        <>
            <IconButton>
            <ArticleIcon />
            </IconButton>
            <IconButton>
            <EditIcon />
            </IconButton>
            <IconButton>
            <DeleteIcon />
            </IconButton>
        </>
        ),
    },
];

const rows = [
    { id: 1, name: 'X', serial_number: 'X', brand: 'X', model: 'X', user: 'Juan Perez', application_date: '21/04/2023' },
    { id: 2, name: 'X', serial_number: 'X', brand: 'X', model: 'X', user: 'Lucas Fernandez', application_date: '15/04/2023' },
    { id: 3, name: 'X', serial_number: 'X', brand: 'X', model: 'X', user: 'Martin Gómez', application_date: '10/02/2023' },
    { id: 4, name: 'X', serial_number: 'X', brand: 'X', model: 'X', user: 'Nicolas Hernández', application_date: '11/02/2023' },
    { id: 5, name: 'X', serial_number: 'X', brand: 'X', model: 'X', user: 'Francisco Álvarez', application_date: '05/01/2023' }
];

export const EstacionesTabla = () => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const solicitarEstacion = (event) => {
        event.preventDefault();
        // Aquí puedes agregar la lógica para enviar el formulario
        // y mostrar el mensaje de confirmación
        setOpen(false);
    };
  return (
    <Grid container spacing={2} >
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
            <Paper elevation={3} sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '500px',
                backgroundColor: '#D7E1F0',
                margin: '10px'
                }}>
                <Grid item xs={1}></Grid>
                <Grid item xs={10} style={{ width: '100%' }}>
                    <Grid container alignItems="center"> 
                        <Grid item>
                            <Typography variant="h5">Estaciones</Typography>
                        </Grid>
                        <Grid item xs />
                        <Grid item>
                            <Button variant="contained" color="primary" onClick={handleClickOpen}>+ Solicitar Estacion</Button>
                            <EstacionFormulario open={open} handleClose={handleClose} handleSubmit={solicitarEstacion} />
                        </Grid>
                    </Grid>
                    <Grid item sx={{ height: '25px' }}></Grid>
                    <Grid item alignItems="center" justifyContent= "center">
                        <div style={{ height: 380 }}>
                            <DataGrid 
                                rows={rows} 
                                columns={columns} 
                                pageSize={5} 
                                checkboxSelection 
                                style={{ overflowX: 'auto', backgroundColor: '#A9B4C4'}}
                            />
                        </div>
                    </Grid>
                </Grid>
                <Grid item xs={1}></Grid>
            </Paper>
        </Grid>
        <Grid item xs={1}></Grid>
    </Grid>
  );
};