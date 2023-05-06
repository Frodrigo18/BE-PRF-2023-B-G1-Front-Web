import "./styles/login.css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import IconButton from '@mui/material/IconButton';

export const Login = () => {
  return (
    <div className="login">
      <div className="login-logo-section">
        <div className="logo1">respirAR</div>
      </div>
      <div className="login-section">
        <div className="login-container">
          <div className="login-form">
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
              <Button variant="contained">Ingresar</Button>
            </div>
          </div>
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