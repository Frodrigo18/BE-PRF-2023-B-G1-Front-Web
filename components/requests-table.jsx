import React from 'react';
import { Grid, Typography, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import ArticleIcon from '@mui/icons-material/Article';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Paper from '@mui/material/Paper';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Nombre', width: 150 },
    { field: 'email', headerName: 'Correo Electrónico', width: 170 },
    { field: 'application_date', headerName: 'Fecha de Solicitud', width: 130 },
    { field: 'station', headerName: 'Estación', width: 130 },
    { field: 'serial_number', headerName: 'Nº de Serie', width: 130 },
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
            <CheckIcon />
            </IconButton>
            <IconButton>
            <CloseIcon />
            </IconButton>
        </>
        ),
    },
];

const rows = [
  { id: 1, name: 'Juan Perez', email: 'juanperez@gmail.com', application_date: '21/04/2023', station: 'X', serial_number: 'X' },
  { id: 2, name: 'Lucas Fernandez', email: 'lucas_f@outlook.com', application_date: '15/04/2023', station: 'X', serial_number: 'X'  },
  { id: 3, name: 'Martin Gómez', email: 'm-gomez1990@hotmail.com', application_date: '10/02/2023', station: 'X', serial_number: 'X'  },
  { id: 4, name: 'Nicolas Hernández', email: 'nicolas_445@gmail.com', application_date: '11/02/2023', station: 'X', serial_number: 'X'  },
  { id: 5, name: 'Francisco Álvarez', email: 'fran_alvarez@yahoo.com', application_date: '05/01/2023', station: 'X', serial_number: 'X'  },
  { id: 6, name: 'Facundo Lopez', email: 'facundo_0421@hotmail.com', application_date: '19/12/2022', station: 'X', serial_number: 'X'  }
];

export const RequestsTable = () => {
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
                            <Typography variant="h5">Solicitudes</Typography>
                        </Grid>
                        <Grid item xs />
                    </Grid>
                    <Grid item sx={{ height: '25px' }}></Grid>
                    <Grid item alignItems="center" justifyContent= "center">
                        <div style={{ height: 380 }}>
                            <DataGrid 
                                rows={rows} 
                                columns={columns} 
                                pageSize={5} 
                                initialState={{
                                    pagination: { paginationModel: { pageSize: 5 } }
                                }}
                                pageSizeOptions={[5, 10, 25]}
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