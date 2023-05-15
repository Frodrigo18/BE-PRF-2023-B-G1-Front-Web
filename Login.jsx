import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, TextField, Button, Typography, Paper } from "@mui/material";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import IconButton from '@mui/material/IconButton';

export const Login = () => {
  const navigate = useNavigate();

  const goToStations = useCallback(() => {
    navigate('/stations');
  }, [navigate]);

  return (
    <Grid container component="main" alignItems="center" justifyContent="center" >
      <Grid item xs={12} sm={8} md={5} square style={{textAlign: "center"}}>
        <Typography component="h1" variant="h1" style={{ marginBottom: 50 }}>
          respirAR
        </Typography>
        <Paper elevation={3} style={{padding: 20, backgroundColor: '#D7E1F0' }}>
          <Typography component="h1" variant="h5">
            Iniciar Sesión
          </Typography>
          <form noValidate alignItems="center" justifyContent="center" >
            <Grid container spacing={2} style={{textAlign: "center"}}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  style = {{width: 300}}
                  id="email"
                  label="Correo Electrónico"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  style = {{width: 300}}
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={4}></Grid>
              <Grid item xs={4}>
                <Button type="submit" fullWidth variant="contained" color="primary" style={{ marginBottom: 10 }}>
                  Ingresar como Admin
                </Button>
                <Button type="submit" fullWidth variant="contained" color="primary">
                  Ingresar como User
                </Button>
              </Grid>
              <Grid item xs={4}></Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid >
  );
};