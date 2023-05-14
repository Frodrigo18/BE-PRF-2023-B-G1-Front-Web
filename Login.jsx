import "./styles/login.css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import IconButton from '@mui/material/IconButton';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();

  const goToStations = useCallback(() => {
    navigate('/stations');
  }, [navigate]);

  return (
    <div className="login">
      <div className="login-logo-section">
        <div className="logo1">respirAR</div>
      </div>
      <div className="login-section">
        <div className="login-container">
          <form className="login-form">
            <div className="iniciar-sesion">Iniciar Sesión</div>
            <TextField
              id="email-input"
              label="Correo Electrónico"
              type="email"
              
            />
            <TextField
              id="password-input"
              label="Password"
              type="password"
            />
            <div className="login-button-group">
              <Button variant="contained" type="submit" onClick={goToStations}>Ingresar</Button>
            </div>
          </form>
        </div>
      </div>
      <div className="login-bottom-section">
        <IconButton>
          <DarkModeIcon
            fontSize="large" 
          />
        </IconButton>
      </div>
    </div>
  );
};