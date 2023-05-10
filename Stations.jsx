import { Header } from "./components/header.jsx";
import Paper from '@mui/material/Paper';
import React from 'react';
import { useState , useRef } from 'react';
import { Grid, Accordion, AccordionSummary, AccordionDetails, Box, Typography, TextField, Button, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { RequestForm } from './components/request-form.jsx';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import ArticleIcon from '@mui/icons-material/Article';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { StationDetails } from './components/station-details.jsx';
import { EditStation } from "./components/edit-station.jsx";
import { InactivateStation } from './components/inactivate-station.jsx';

export const Stations = () => {
    const [value, setValue] = React.useState('todas');

    const clearFields = (refs) => {
        refs.forEach((ref) => {
        if (ref.current) {
            ref.current.value = '';
        } else if (ref.clear) {
            ref.current.clear();
        }
        });
    };

    const textNombre = useRef();
    const textSolicitante = useRef();
    const textSerie = useRef();
    const dateSolicitud = useRef();

    const handleClearFields = () => {
        clearFields([textNombre, textSolicitante, textSerie, dateSolicitud]);
    };

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleBuscarClick = () => {
        
    }

    const [openFormRequest, setOpenFormRequest] = useState(false);

    const handleOpenFormRequest = () => {
        setOpenFormRequest(true);
    };

    const handleCloseFormRequest = () => {
        setOpenFormRequest(false);
    };

    const solicitarEstacion = (event) => {
        event.preventDefault();
        setOpen(false);
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Nombre', width: 130 },
        { field: 'serial_number', headerName: 'Nº de Serie', width: 130 },
        { field: 'brand', headerName: 'Marca', width: 130 },
        { field: 'model', headerName: 'Modelo', width: 130 },
        { field: 'user', headerName: 'Solicitante', width: 130 },
        { field: 'application_date', headerName: 'Fecha de Solicitud', width: 130 },
        { field: 'status', headerName: 'Estado', width: 100 },
        {
            sortable: false,
            width: 150,
            disableColumnMenu: true,
            renderCell: (params) => (
            <>
                <IconButton onClick={() => handleOpenDetails(params.row)}>
                    <ArticleIcon />
                </IconButton>
                <IconButton onClick={() => handleOpenEdit(params.row)}>
                    <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleOpenInactivate(params.row)}>
                    <DeleteIcon />
                </IconButton>
            </>
            ),
        },
    ];
    
    const rows = [
        { id: 1, name: 'X', serial_number: 'X', brand: 'X', model: 'X', user: 'Juan Perez', application_date: '21/04/2023', status: 'ACTIVE' },
        { id: 2, name: 'X', serial_number: 'X', brand: 'X', model: 'X', user: 'Lucas Fernandez', application_date: '15/04/2023', status: 'INACTIVE' },
        { id: 3, name: 'X', serial_number: 'X', brand: 'X', model: 'X', user: 'Martin Gómez', application_date: '10/02/2023', status: 'ACTIVE' },
        { id: 4, name: 'X', serial_number: 'X', brand: 'X', model: 'X', user: 'Nicolas Hernández', application_date: '11/02/2023', status: 'ACTIVE' },
        { id: 5, name: 'X', serial_number: 'X', brand: 'X', model: 'X', user: 'Francisco Álvarez', application_date: '05/01/2023', status: 'INACTIVE' },
        { id: 6, name: 'X', serial_number: 'X', brand: 'X', model: 'X', user: 'Facundo Lopez', application_date: '19/12/2022', status: 'ACTIVE' }
    ];

    const [openDetails, setOpenDetails] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    const handleOpenDetails = (row) => {
        setSelectedRow(row);
        setOpenDetails(true);
    };

    const handleCloseDetails = () => {
        setOpenDetails(false);
    };

    const [openEdit, setOpenEdit] = useState(false);

    const handleOpenEdit = (row) => {
        setSelectedRow(row);
        setOpenEdit(true);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    const [openInactivate, setOpenInactivate] = useState(false);

    const handleOpenInactivate = (row) => {
        setSelectedRow(row);
        setOpenInactivate(true);
    };

    const handleCloseInactivate = () => {
        setOpenInactivate(false);
    };

    return(
        <Grid container direction="column">
            <Grid>
                <Header />
            </Grid>
            <Grid sx={{ height: '10px' }}></Grid>
            <Grid container justifyContent="center">
                <Paper elevation={3} sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '850px',
                    height: 'auto',
                    width: '95%',
                    backgroundColor: '#F7FAFF',
                    padding: '15px'
                    }}>
                    <Grid sx={{ height: '20px' }}>
                    
                    </Grid>
                    <Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={2}></Grid>
                            <Grid item xs={8}>
                                <Accordion sx={{width: '100%', bgcolor: '#D7E1F0'}}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="filtros-content" id="filtros-header">
                                        <Typography variant="h6">Filtros</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '80%', margin: 'auto' }}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={6}>
                                                <TextField label="Nombre" inputRef={textNombre} fullWidth />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField label="Solicitante" inputRef={textSolicitante} fullWidth />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField label="Número de serie" inputRef={textSerie} fullWidth />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField label="Fecha de solicitud" inputRef={dateSolicitud} fullWidth type="date" InputLabelProps={{ shrink: true }} />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Box sx={{ display: 'flex', alignItems: 'center'}}>
                                                    <Typography variant="body1">Estado:</Typography>
                                                    <RadioGroup value={value} onChange={handleChange} row sx={{ ml: 2 }}>
                                                        <FormControlLabel value="ALL" control={<Radio />} label="Todas" />
                                                        <FormControlLabel value="ACTIVE" control={<Radio />} label="Activas" />
                                                        <FormControlLabel value="INACTIVE" control={<Radio />} label="Inactivas" />
                                                    </RadioGroup>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                    <Button variant="outlined" sx={{ mr: 1 }} onClick={handleClearFields}>
                                                        Limpiar
                                                    </Button>
                                                    <Button variant="contained" onClick={handleBuscarClick}>
                                                        Buscar
                                                    </Button>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>
                            </Grid>
                            <Grid item xs={2}></Grid>
                        </Grid>
                    </Grid>
                    <Grid sx={{ height: '20px' }}>
                        
                    </Grid>
                    <Grid>
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
                                                <Button variant="contained" color="primary" onClick={handleOpenFormRequest}>+ Solicitar Estacion</Button>
                                                <RequestForm open={openFormRequest} handleClose={handleCloseFormRequest} handleSubmit={solicitarEstacion} />
                                            </Grid>
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
                                                    checkboxSelection={false} 
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
                    </Grid>
                </Paper>
            </Grid>

            {selectedRow && (
                <StationDetails
                    open={openDetails}
                    onClose={handleCloseDetails}
                    rowData={selectedRow}
                />
            )}

            {selectedRow && (
                <EditStation
                    open={openEdit}
                    onClose={handleCloseEdit}
                    rowData={selectedRow}
                />
            )}

            {selectedRow && (
                <InactivateStation
                    open={openInactivate}
                    onClose={handleCloseInactivate}
                    rowData={selectedRow}
                />
            )}
        </Grid>
    )
}