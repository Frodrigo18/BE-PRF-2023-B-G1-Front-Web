import { Grid } from "@mui/material";
import { MenuPrincipal } from "./components/menu-principal";
import { FiltrosSolicitud } from "./components/solicitud-filtros";
import { SolicitudesTabla } from "./components/solicitudes-tabla";
import Paper from '@mui/material/Paper';

export const Solicitudes = () => {
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
                        <FiltrosSolicitud />
                    </Grid>
                    <Grid sx={{ height: '20px' }}>
                        
                    </Grid>
                    <Grid>
                        <SolicitudesTabla />
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}