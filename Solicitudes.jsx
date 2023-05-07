import { TextField } from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { DataGrid } from '@mui/x-data-grid';
import ArticleIcon from '@mui/icons-material/Article';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState , useRef } from 'react';

import "./styles/solicitudes.css";


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

export const Solicitudes = () => {
  const [fields, setFields] = useState({
    nombre: '',
    fechaSolicitud: '',
    email: '',
    estacion: ''
  });

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

  const busquedaSolicitud = (event) => {
    event.preventDefault();
    // código para enviar los datos del formulario
  };

  return (
    <div className="s-solicitudes1">
      <div className="s-top-header1">
        <div className="s-top-container1">
          <div className="s-aprobadas">respirAR</div>
          <div className="s-navegation-right1">
            <div className="s-navegation-menu1">
              <div className="s-estaciones3">
                <a href="/estaciones">Estaciones</a>
              </div>
              <div className="s-solicitudes2">
                <a href="/solicitudes">Solicitudes</a>
              </div>
              <div className="s-account-section1">
                <IconButton >
                  <DarkModeIcon
                    fontSize="medium" />
                </IconButton>
                <IconButton >
                  <NotificationsIcon 
                    fontSize="medium"/>
                </IconButton>
                <IconButton >
                  <AccountCircleIcon 
                    fontSize="large" />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="s-search-form-section1">
        <div className="s-search-container1">
          <div className="s-search-seaction1">
            <div className="s-search-form1">
              <form onSubmit={busquedaSolicitud}>
                <div className="s-inputs-row3">
                  <div className="s-input-group4">
                  <TextField
                      inputRef={textNombre}
                      id="name-input"
                      label="Nombre"
                    />
                  </div>
                  <div className="s-input-group4">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker 
                        inputRef={dateSolicitud}
                        id="fechaSolicitud"
                        label="Fecha de Solicitud"
                      />
                    </LocalizationProvider>
                  </div>
                </div>
                <div className="s-inputs-row2">
                  <div className="s-input-group4">
                    <TextField
                      inputRef={textEmail}
                      id="email-input"
                      label="Correo Electrónico"
                      type="email"
                    />
                  </div>
                  <div className="s-input-group4">
                    <TextField
                      inputRef={textEstacion}
                      id="station-input"
                      label="Estación"
                    />
                  </div>
                </div>
                <div className="s-buttons-container1">
                  <div className="s-radios-row1">
                    <RadioGroup
                        row
                        aria-labelledby="filtros-estados-radio"
                        name="estados-radios-group"
                      >
                      <FormControlLabel value="Todas" control={<Radio />} label="Todas" />
                      <FormControlLabel value="Aprobadas" control={<Radio />} label="Aprobadas" />
                      <FormControlLabel value="Rechazadas" control={<Radio />} label="Rechazadas" />
                      <FormControlLabel value="Pendientes" control={<Radio />} label="Pendientes" />
                    </RadioGroup>
                  </div>
                  <div className="s-buttons-row1">
                    <div className="s-button-group4">
                      <Button variant="outlined" onClick={handleClearFields}>Limpiar</Button>
                    </div>
                    <div className="s-button-group3">
                      <Button variant="contained" type="submit">Buscar</Button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="s-grid-section1">
        <div className="s-grid-container1">
          <div className="s-grid1">
            <div className="s-header-grid1">
              <div className="s-solicitudes3">Solicitudes</div>
            </div>
            <div className="s-table-container1">
              <div style={{ height: 250, width: '100%' }}>
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    
                  >
                  </DataGrid>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};