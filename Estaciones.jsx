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

import "./styles/estaciones.css";

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

export const Estaciones = () => {
  return (
    <div className="e-estaciones">
      <div className="e-top-header">
        <div className="e-top-container">
          <div className="e-todas">respirAR</div>
          <div className="e-navegation-right">
            <div className="e-navegation-menu">
              <div className="e-estaciones2">
                <a href="/estaciones">Estaciones</a>
              </div>
              <div className="e-solicitudes">
                <a href="/solicitudes">Solicitudes</a>
              </div>
              <div className="e-account-section">
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
      <div className="e-search-form-section">
        <div className="e-search-container">
          <div className="e-search-seaction">
            <div className="e-search-form">
              <div className="e-buttons-container">
                <div className="e-radios-row">
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
                <div className="e-buttons-row1">
                  <div className="e-button-group1">
                    <Button variant="outlined">Limpiar</Button>
                  </div>
                  <div className="e-button-group2">
                    <Button variant="contained">Buscar</Button>
                  </div>
                </div>
              </div>
              <div className="e-inputs-row1">
                <div className="e-input-group">
                  <TextField
                    id="name-input"
                    label="Nombre"
                  />
                </div>
                <div className="e-input-group">
                  <TextField
                    id="user-input"
                    label="Solicitante"
                  />
                </div>
              </div>
              <div className="e-inputs-row">
                <div className="e-input-group">
                  <TextField
                    id="serialNumber-input"
                    label="Nº de Serie"
                  />
                </div>
                <div className="e-input-group">
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
      <div className="e-grid-section">
        <div className="e-grid-container">
          <div className="e-grid">
            <div className="e-header-grid">
              <div className="e-estaciones1">Estaciones</div>
              <div className="e-buttons-row2">
                <div className="e-button-group">
                  <Button variant="contained">+ Solicitar Estación</Button>
                </div>
              </div>
            </div>
            <div className="e-table-container">
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