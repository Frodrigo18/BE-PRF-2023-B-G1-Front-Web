import { Grid } from "@mui/material";
import { MenuPrincipal } from "./components/menu-principal";
import { FiltrosEstacion } from "./components/estacion-filtros";
import { EstacionesTabla } from "./components/estaciones-tabla";
import Paper from '@mui/material/Paper';

export const Estaciones = () => {
    return(
        <Grid container direction="column">
            <Grid>
                <MenuPrincipal />
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
                        <FiltrosEstacion />
                    </Grid>
                    <Grid sx={{ height: '20px' }}>
                        
                    </Grid>
                    <Grid>
                        <EstacionesTabla />
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}