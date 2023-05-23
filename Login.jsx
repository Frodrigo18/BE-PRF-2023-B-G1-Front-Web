import { useNavigate } from 'react-router-dom';
import { Grid, TextField, Button, Typography, Paper, IconButton } from "@mui/material";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Cookies from "universal-cookie";
import jwt_decode from 'jwt-decode';

export const Login = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  let token = "";

  const handleLoginAdmin = async () => {
    token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZXNwaXJBUiIsImlhdCI6MTY4MzE1NjQzMSwiZXhwIjoxNzQ2MjI4NDMxLCJhdWQiOiJ3d3cuZXhhbXBsZS5jb20iLCJzdWIiOiJqcm9ja2V0QGV4YW1wbGUuY29tIiwiaWQiOiIxIiwidXNlcm5hbWUiOiJKb2huRG9lIiwicm9sIjoiYWRtaW4ifQ.4AdK8vzb0ec-m6jjGp8aLFoO4Prn6fFwjJmeqiwBS8s";
    setData(token);
    navigate('/stations');
  }

  const handleLoginUser = async () => {
    token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2ODQzNjg2NTUsImV4cCI6MTcxNTkwNDY1NSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImlkIjoiMiIsInJvbCI6InVzZXIifQ.4MrjfaEglT5NOHLsf_cldZCcxbUX8vNC62qoLp9XpaY";
    setData(token);
    navigate('/stations');
  }

  const setData = async (token) => {
    const decodedToken = jwt_decode(token);
    const id_user = decodedToken.id;
    const userName = decodedToken.username;
    const email = decodedToken.sub;
    const rol = decodedToken.rol;

    cookies.set("token", JSON.stringify(token));
    cookies.set("id_user", JSON.stringify(id_user));
    cookies.set("userName", JSON.stringify(userName));
    cookies.set("email", JSON.stringify(email));
    cookies.set("rol", JSON.stringify(rol));
  }

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
                <Button onClick={handleLoginAdmin} fullWidth variant="contained" color="primary" style={{ marginBottom: 10 }}>
                  Ingresar como Admin
                </Button>
                <Button onClick={handleLoginUser} fullWidth variant="contained" color="primary">
                  Ingresar como User
                </Button>
              </Grid>
              <Grid item xs={4}></Grid>
            </Grid>
          </form>
        </Paper>
        <Grid item style={{ position: "fixed", bottom: 0, right: 0 }}>
          <IconButton>
            <DarkModeIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
};