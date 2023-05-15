import { React, useState , useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Accordion, AccordionSummary, AccordionDetails, Box, Typography, TextField, Button, RadioGroup, FormControlLabel, Radio, Paper, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Header } from "./components/header.jsx";
import { RequestDetails } from './components/request-details.jsx';
import { ApprobeRequest } from './components/approve-request.jsx';
import { RejectRequest } from './components/reject-request.jsx';
import { format } from 'date-fns';
import Cookies from "universal-cookie";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArticleIcon from '@mui/icons-material/Article';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export const Requests = () => {
    const cookies = new Cookies();
    const navigate = useNavigate();

    let token = cookies.get("token");
    let id_user = cookies.get("id_user");
    let rol = cookies.get("rol");
    let url = "";

    if (!token) {
        navigate('/');
    }

    const headers = new Headers();
    headers.append("Authorization", `${token}`);

    const options = {
        method: "GET",
        headers: headers
    };

    if (rol === "admin") {
        url = "http://localhost:8080/requests?pageSize=0&page=0";
    }
    else {
        url = `http://localhost:8080/users/${id_user}/requests`;
    }

    const [radioStatus, setRadioStatus] = useState('ALL');

    const clearFields = (refs) => {
        refs.forEach((ref) => {
        if (ref.current) {
            ref.current.value = '';
        } else if (ref.clear) {
            ref.current.clear();
        }
        });
    };

    const textSolicitante = useRef();
    const textEmail = useRef();
    const textEstacion = useRef();
    const dateSolicitud = useRef();

    const handleClearFields = () => {
        clearFields([textSolicitante, textEmail, textEstacion, dateSolicitud]);
        fetchData();
    };

    const handleChange = (event) => {
        setRadioStatus(event.target.value);
    };

    const handleBuscarClick = () => {
        let created_by = textSolicitante.current.value;
        let created_at = dateSolicitud.current.value;
        let email = textEmail.current.value;
        let name = textEstacion.current.value;
        let status = '';

        if (radioStatus !== 'ALL') {
            status = radioStatus;
        }

        const filteredRows = rows.filter(row => {
          return (
                (created_by === '' || row.created_by === created_by) &&
                (created_at === '' || row.created_at.slice(0, 10).includes(created_at)) &&
                (name === '' || row.name.toUpperCase().includes(name.toUpperCase())) &&
                (email === '' || row.email.toUpperCase().includes(email.toUpperCase())) &&
                (status === '' || row.status === status)
            );
        });

        setRows(filteredRows);
    }

    const getStatusIcon = (status) => {
        if (status === 'APPROVED') {
          return { icon: <CheckCircleOutlineIcon style={{ color: 'green' }} />, label: 'Aprobada' };
        } 
        else if (status === 'PENDING')
        {
          return { icon: <PauseCircleOutlineIcon style={{ color: 'yellow' }} />, label: 'Pendiente' };
        } 
        else {
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

    function formatDate(dateString) {
        const date = new Date(dateString);
        return format(date, 'MM/dd/yyyy');
    }

    const columns = [
        { field: 'id', headerName: 'Id', width: 70 },
        { field: 'created_by', headerName: 'Solicitante', width: 150 },
        { field: 'email', headerName: 'Correo Electrónico', width: 170 },
        { field: 'created_at', headerName: 'Fecha de Solicitud', width: 130, valueFormatter: (params) => formatDate(params.value) },
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
                        {rol === "admin" && (
                            <>
                                <IconButton onClick={() => handleOpenApprove(params.row)} disabled={isInactive}>
                                    <CheckIcon />
                                </IconButton>
                                <IconButton onClick={() => handleOpenReject(params.row)} disabled={isInactive}>
                                    <CloseIcon />
                                </IconButton>
                            </>
                        )}
                    </>
                );
            },
        },
    ];

    const [rows, setRows] = useState([]);

    useEffect(() => {
        fetch(url, options)
        .then(response => response.json())
        .then((data) =>
            setRows(
              data.map((item) => ({
                id: item._id,
                serial_number: item.serial_number,
                name: item.name,
                longitude: item.longitude,
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

    const fetchData = () => {
        fetch(url, options)
        .then((response) => response.json())
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
                    approved_at: item.approved_at,
                }))
            )
        )
        .catch((error) => console.error(error))
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
                                                    <TextField label="Solicitante" inputRef={textSolicitante} fullWidth />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField label="Fecha de Solicitud" inputRef={dateSolicitud} fullWidth type="date" InputLabelProps={{ shrink: true }} />
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
                                                        <RadioGroup value={radioStatus} onChange={handleChange} row sx={{ alignItems: 'center' }}>
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
                    TransitionProps={{ timeout: 100 }}
                />
            )}

            {selectedRow && (
                <RejectRequest
                    open={openReject}
                    onClose={handleCloseReject}
                    rowData={selectedRow}
                    TransitionProps={{ timeout: 100 }}
                />
            )}
        </Grid>
    )
}