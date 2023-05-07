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

import "./styles/solicitudes.css";

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

export const Solicitudes = () => {
  return (
    <div className="solicitudes1">
      <div className="top-header1">
        <div className="top-container1">
          <div className="aprobadas">respirAR</div>
          <div className="navegation-right1">
            <div className="navegation-menu1">
              <div className="estaciones2">Estaciones</div>
              <div className="solicitudes2">Solicitudes</div>
              <div className="account-section1">
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
      <div className="search-form-section1">
        <div className="search-container1">
          <div className="search-seaction1">
            <div className="search-form1">
              <div className="buttons-container1">
                <div className="radios-row1">
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
                <div className="buttons-row1">
                  <div className="button-group4">
                    <Button variant="outlined">Limpiar</Button>
                  </div>
                  <div className="button-group3">
                    <Button variant="contained">Buscar</Button>
                  </div>
                </div>
              </div>
              <div className="inputs-row3">
                <div className="input-group4">
                <TextField
                    id="name-input"
                    label="Nombre"
                  />
                </div>
                <div className="input-group4">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                      label="Fecha de Solicitud"
                    />
                  </LocalizationProvider>
                </div>
              </div>
              <div className="inputs-row2">
                <div className="input-group4">
                  <TextField
                    id="email-input"
                    label="Correo Electrónico"
                    type="email"
                  />
                </div>
                <div className="input-group4">
                  <TextField
                    id="station-input"
                    label="Estación"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid-section1">
        <div className="grid-container1">
          <div className="grid1">
            <div className="header-grid1">
              <div className="solicitudes3">Solicitudes</div>
            </div>
            <div className="table-container1">
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
