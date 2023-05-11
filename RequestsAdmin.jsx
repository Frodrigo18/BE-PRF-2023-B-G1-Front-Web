import React from 'react';
import { Grid } from "@mui/material";
import { Header } from "./components/header.jsx";
import { useState , useRef, useEffect } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Box, Typography, TextField, Button, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import ArticleIcon from '@mui/icons-material/Article';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { RequestDetails } from './components/request-details.jsx';
import { ApprobeRequest } from './components/approve-request.jsx';
import { RejectRequest } from './components/reject-request.jsx';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';



export const RequestsAdmin = () => {
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
    const textEmail = useRef();
    const textEstacion = useRef();
    const dateSolicitud = useRef();

    const handleClearFields = () => {
        clearFields([textNombre, textEmail, textEstacion, dateSolicitud]);
    };

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleBuscarClick = () => {
       
    }

    const getStatusIcon = (status) => {
        if (status === 'APPROVED') {
          return { icon: <CheckCircleOutlineIcon style={{ color: 'green' }} />, label: 'Aprobada' };
        } else if (status === 'PENDING')
        {
          return { icon: <PauseCircleOutlineIcon style={{ color: 'yellow' }} />, label: 'Pendiente' };
        } else {
          return { icon: <HighlightOffIcon style={{ color: 'red' }} />, label: 'Rechazada' };
        }
    };

    const [openDetails, setOpenDetails] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    const handleOpenDetails = (row) => {
        setSelectedRow(row);
        setOpenDetails(true);
    };

    const handleCloseDetails = () => {
        setOpenDetails(false);
    };

    const [openApprove, setOpenApprove] = useState(false);

    const handleOpenApprove = (row) => {
        setSelectedRow(row);
        setOpenApprove(true);
    };

    const handleCloseApprove = () => {
        setOpenApprove(false);
    };

    const [openReject, setOpenReject] = useState(false);

    const handleOpenReject = (row) => {
        setSelectedRow(row);
        setOpenReject(true);
    };

    const handleCloseReject = () => {
        setOpenReject(false);
    };

    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZXNwaXJBUiIsImlhdCI6MTY4MzE1NjQzMSwiZXhwIjoxNzQ2MjI4NDMxLCJhdWQiOiJ3d3cuZXhhbXBsZS5jb20iLCJzdWIiOiJqcm9ja2V0QGV4YW1wbGUuY29tIiwiaWQiOiIxIiwidXNlcm5hbWUiOiJKb2huRG9lIiwicm9sIjoiYWRtaW4ifQ.4AdK8vzb0ec-m6jjGp8aLFoO4Prn6fFwjJmeqiwBS8s";
    
    const headers = new Headers();
    headers.append("Authorization", `${token}`);

    const options = {
        method: "GET",
        headers: headers
    };

    const columns = [
        { field: 'id', headerName: 'Id', width: 70 },
        { field: 'created_by', headerName: 'Solicitante', width: 150 },
        { field: 'email', headerName: 'Correo Electrónico', width: 170 },
        { field: 'created_at', headerName: 'Fecha de Solicitud', width: 130 },
        { field: 'name', headerName: 'Estación', width: 130 },
        { field: 'serial_number', headerName: 'Nº de Serie', width: 130 },
        {
            field: 'status',
            headerName: 'Estado',
            width: 120,
            renderCell: (params) => {
              const { icon, label } = getStatusIcon(params.value);
              return (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {icon}
                  <span style={{ marginLeft: '0.5rem' }}>{label}</span>
                </div>
              );
            },
        },
        {
            sortable: false,
            width: 150,
            disableColumnMenu: true,
            renderCell: (params) => {
                const isInactive = params.row.status === 'APPROVED' || params.row.status === 'REJECTED';

                return (
                    <>
                        <IconButton onClick={() => handleOpenDetails(params.row)}>
                            <ArticleIcon />
                        </IconButton>
                        <IconButton onClick={() => handleOpenApprove(params.row)} disabled={isInactive}>
                            <CheckIcon />
                        </IconButton>
                        <IconButton onClick={() => handleOpenReject(params.row)} disabled={isInactive}>
                            <CloseIcon />
                        </IconButton>
                    </>
                );
            },
        },
    ];

    const [rows, setRows] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/requests?pageSize=0&page=0", options)
        .then(response => response.json())
        .then((data) =>
            setRows(
              data.map((item) => ({
                id: item._id,
                serial_number: item.serial_number,
                name: item.name,
                longitud: item.longitud,
                latitude: item.latitude,
                brand: item.brand,
                model: item.model,
                status: item.status,
                created_by: item.created_by,
                created_at: item.created_at,
                approved_by: item.approved_by,
                approved_at: item.approved_at
              }))
            )
        )
        .catch(error => console.error(error));
    }, []);

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
                                                    <TextField label="Fecha de solicitud" inputRef={dateSolicitud} fullWidth type="date" InputLabelProps={{ shrink: true }} />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField label="Correo Electrónico" inputRef={textEmail} fullWidth type="email"/>
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField label="Estación" inputRef={textEstacion} fullWidth />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                                                    <Typography variant="body1" sx={{ mr: 1 }} >Estado:</Typography>
                                                    <RadioGroup value={value} onChange={handleChange} row sx={{ alignItems: 'center' }}>
                                                        <FormControlLabel value="ALL" control={<Radio />} label="Todas" />
                                                        <FormControlLabel value="APPROVED" control={<Radio />} label="Aprobadas" />
                                                        <FormControlLabel value="REJECTED" control={<Radio />} label="Rechazadas" />
                                                        <FormControlLabel value="PENDING" control={<Radio />} label="Pendientes" />
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
                                                    checkboxSelection={false}
                                                    disableColumnFilter
                                                    columnVisibilityModel={{
                                                        id: false,
                                                    }}
                                                    disableColumnSelector 
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
                <RequestDetails
                    open={openDetails}
                    onClose={handleCloseDetails}
                    rowData={selectedRow}
                />
            )}

            {selectedRow && (
                <ApprobeRequest
                    open={openApprove}
                    onClose={handleCloseApprove}
                    rowData={selectedRow}
                />
            )}

            {selectedRow && (
                <RejectRequest
                    open={openReject}
                    onClose={handleCloseReject}
                    rowData={selectedRow}
                />
            )}
        </Grid>
    )
}