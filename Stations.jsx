import { React, useState , useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Accordion, AccordionSummary, AccordionDetails, Box, Typography, TextField, Button, RadioGroup, FormControlLabel, Radio, Paper, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Header } from './components/header.jsx';
import { RequestForm } from './components/request-form.jsx';
import { StationDetails } from './components/station-details.jsx';
import { EditStation } from './components/edit-station.jsx';
import { SuspendStation } from './components/suspend-station.jsx';
import { format } from 'date-fns';
import Cookies from "universal-cookie";
import ArticleIcon from '@mui/icons-material/Article';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export const Stations = () => {
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
        url = "http://localhost:8080/api/v1/stations";
    }
    else {
        url = `http://localhost:8080/api/v1/users/${id_user}/stations`;
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

    const textEstacion = useRef();
    const textSolicitante = useRef();
    const textSerie = useRef();
    const textMarca = useRef();
    const textModelo = useRef();
    const fechaCreacion = useRef();

    const handleClearFields = () => {
        clearFields([textEstacion, textSolicitante, textSerie, textMarca, textModelo, fechaCreacion]);
        setRadioStatus('ALL');
        fetchData();
    };

    const handleChange = (event) => {
        setRadioStatus(event.target.value);
    };

    const handleBuscarClick = () => {
        let name = textEstacion.current.value;
        let serial_number = textSerie.current.value;
        let created_by = '';
        let created_at = '';
        let brand = '';
        let model = '';
        let status = '';

        if (rol === "admin") {
            created_by = textSolicitante.current.value;
            created_at = fechaCreacion.current.value;
        }
        else {
            brand = textMarca.current.value;
            model = textModelo.current.value;
        }

        if (radioStatus !== 'ALL') {
            status = radioStatus;
        }

        const filteredRows = originalRows.filter(row => {
          return (
                (name === '' || row.name.toUpperCase().includes(name.toUpperCase())) &&
                (serial_number === '' || row.serial_number.toUpperCase().includes(serial_number.toUpperCase())) &&
                (created_by === '' || row.created_by === created_by) &&
                (created_at === '' || row.created_at.slice(0, 10).includes(created_at)) &&
                (brand === '' || row.brand.toUpperCase().includes(brand.toUpperCase())) &&
                (model === '' || row.model.toUpperCase().includes(model.toUpperCase())) &&
                (status === '' || row.status === status)
            );
        });

        setRows(filteredRows);
    }

    const [openFormRequest, setOpenFormRequest] = useState(false);

    const handleOpenFormRequest = () => {

        debugger;
        setOpenFormRequest(true);
    };

    const handleCloseFormRequest = () => {
        debugger;
        setOpenFormRequest(false);
    };

    const getStatusIcon = (status) => {
        if (status === 'ACTIVE') {
          return { icon: <CheckCircleOutlineIcon style={{ color: 'green' }} />, label: 'Activa' };
        } else {
          return { icon: <HighlightOffIcon style={{ color: 'red' }} />, label: 'Inactiva' };
        }
    };

    function formatDate(dateString) {
        const date = new Date(dateString);
        return format(date, 'MM/dd/yyyy');
    }

    const columns = [
        { field: 'id', headerName: 'Id', width: 70 },
        { field: 'name', headerName: 'Estación', width: 130 },
        { field: 'serial_number', headerName: 'Nº de Serie', width: 130 },
        { field: 'brand', headerName: 'Marca', width: 130 },
        { field: 'model', headerName: 'Modelo', width: 130 },
        { field: 'user_name', headerName: 'Solicitante', width: 130 },
        { field: 'created_at', headerName: 'Fecha de Creación', width: 130, valueFormatter: (params) => formatDate(params.value) },
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
                const isInactive = params.row.status === 'INACTIVE';
                return (
                    <>
                        <IconButton onClick={() => handleOpenDetails(params.row)}>
                            <ArticleIcon />
                        </IconButton>
                        <IconButton onClick={() => handleOpenEdit(params.row)} disabled={isInactive}>
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleOpenSuspend(params.row)} disabled={isInactive}>
                            <DeleteIcon />
                        </IconButton>
                    </>
                );
            },
        },
    ];
    
    const [originalRows, setOriginalRows] = useState([]);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        fetch(url, options)
        .then(response => response.json())
        .then((data) => {
            const formattedData = data.map(item => ({
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
                user_name: item.user.user_name,
                mail: item.user.mail
            }));

            setRows(formattedData);
            setOriginalRows(formattedData);
        })
        .catch(error => console.error(error));
    }, []);

    const fetchData = () => {
         fetch(url, options)
        .then(response => response.json())
        .then((data) => {
            const formattedData = data.map(item => ({
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
                user_name: item.user.user_name,
                mail: item.user.mail
            }));
            setRows(formattedData);
            setOriginalRows(formattedData);
        })
        .catch(error => console.error(error));
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

    const [openEdit, setOpenEdit] = useState(false);

    const handleOpenEdit = (row) => {
        setSelectedRow(row);
        setOpenEdit(true);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    const [openSuspend, setOpenSuspend] = useState(false);

    const handleOpenSuspend = (row) => {
        setSelectedRow(row);
        setOpenSuspend(true);
    };

    const handleCloseSuspend = () => {
        setOpenSuspend(false);
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
                                                <TextField label="Estación" inputRef={textEstacion} fullWidth />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField label="Número de Serie" inputRef={textSerie} fullWidth />
                                            </Grid>

                                            {
                                                rol === "admin" && (
                                                    <>
                                                        <Grid item xs={12} sm={6}>
                                                            <TextField label="Solicitante" inputRef={textSolicitante} fullWidth />
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <TextField label="Fecha de Creación" inputRef={fechaCreacion} fullWidth type="date" InputLabelProps={{ shrink: true }} />
                                                        </Grid>
                                                    </>
                                                )
                                            }
                                            {
                                                rol === "user" && (
                                                    <>
                                                        <Grid item xs={12} sm={6}>
                                                            <TextField label="Marca" inputRef={textMarca} fullWidth />
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <TextField label="Modelo" inputRef={textModelo} fullWidth />
                                                        </Grid>
                                                    </>
                                                )
                                            }
                                            <Grid item xs={12} sm={6}>
                                                <Box sx={{ display: 'flex', alignItems: 'center'}}>
                                                    <Typography variant="body1">Estado:</Typography>
                                                    <RadioGroup value={radioStatus} onChange={handleChange} row sx={{ ml: 2 }}>
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

            <RequestForm open={openFormRequest} handleClose={handleCloseFormRequest} TransitionProps={{ timeout: 100 }} />

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
                    TransitionProps={{ timeout: 100 }}
                />
            )}

            {selectedRow && (
                <SuspendStation
                    open={openSuspend}
                    onClose={handleCloseSuspend}
                    rowData={selectedRow}
                    TransitionProps={{ timeout: 100 }}
                />
            )}
        </Grid>
    )
}