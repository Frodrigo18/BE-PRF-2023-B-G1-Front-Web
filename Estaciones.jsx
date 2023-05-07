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

import "./styles/estaciones.css";

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Nombre', width: 130 },
  { field: 'serial_number', headerName: 'Nº de Serie', width: 130 },
  { field: 'brand', headerName: 'Marca', width: 130 },
  { field: 'model', headerName: 'Modelo', width: 130 },
  { field: 'user', headerName: 'Solicitante', width: 130 },
  { field: 'application_date', headerName: 'Fecha de Solicitud', width: 130 }
];

const rows = [
  { id: 1, name: 'X', serial_number: 'X', brand: 'X', model: 'X', user: 'Juan Perez', application_date: '21/04/2023' },
  { id: 2, name: 'X', serial_number: 'X', brand: 'X', model: 'X', user: 'Lucas Fernandez', application_date: '15/04/2023' },
  { id: 3, name: 'X', serial_number: 'X', brand: 'X', model: 'X', user: 'Martin Gómez', application_date: '10/02/2023' },
  { id: 4, name: 'X', serial_number: 'X', brand: 'X', model: 'X', user: 'Nicolas Hernández', application_date: '11/02/2023' },
  { id: 5, name: 'X', serial_number: 'X', brand: 'X', model: 'X', user: 'Francisco Álvarez', application_date: '05/01/2023' }
];

export const Estaciones = () => {
  return (
    <div className="estaciones">
      <div className="top-header">
        <div className="top-container">
          <div className="todas">respirAR</div>
          <div className="navegation-right">
            <div className="navegation-menu">
              <div className="estaciones2">Estaciones</div>
              <div className="solicitudes">Solicitudes</div>
              <div className="account-section">
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
      <div className="search-form-section">
        <div className="search-container">
          <div className="search-seaction">
            <div className="search-form">
              <div className="buttons-container">
                <div className="radios-row">
                  <RadioGroup
                    row
                    aria-labelledby="filtros-estados-radio"
                    name="estados-radios-group"
                  >
                    <FormControlLabel value="Todas" control={<Radio />} label="Todas" />
                    <FormControlLabel value="Activas" control={<Radio />} label="Activas" />
                    <FormControlLabel value="Inactivas" control={<Radio />} label="Inactivas" />
                  </RadioGroup>
                </div>
                <div className="buttons-row1">
                  <div className="button-group1">
                    <Button variant="outlined">Limpiar</Button>
                  </div>
                  <div className="button-group2">
                    <Button variant="contained">Buscar</Button>
                  </div>
                </div>
              </div>
              <div className="inputs-row1">
                <div className="input-group">
                  <TextField
                    id="name-input"
                    label="Nombre"
                  />
                </div>
                <div className="input-group">
                  <TextField
                    id="user-input"
                    label="Solicitante"
                  />
                </div>
              </div>
              <div className="inputs-row">
                <div className="input-group">
                  <TextField
                    id="serialNumber-input"
                    label="Nº de Serie"
                  />
                </div>
                <div className="input-group">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                      label="Fecha de Solicitud"
                    />
                  </LocalizationProvider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid-section">
        <div className="grid-container">
          <div className="grid">
            <div className="header-grid">
              <div className="estaciones1">Estaciones</div>
              <div className="buttons-row2">
                <div className="button-group">
                  <Button variant="contained">+ Solicitar Estación</Button>
                </div>
              </div>
            </div>
            <div className="table-container">
              <div style={{ height: 250, width: '100%' }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  checkboxSelection
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};