import { Grid } from "@mui/material";
import { Header } from "./components/header.jsx";
import { StationFilters } from "./components/station-filters.jsx";
import { StationsTable } from "./components/stations-table.jsx";
import Paper from '@mui/material/Paper';

export const Stations = () => {
    return(
        <Grid container direction="column">
            <Grid>
                <Header />
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
                        <StationFilters />
                    </Grid>
                    <Grid sx={{ height: '20px' }}>
                        
                    </Grid>
                    <Grid>
                        <StationsTable />
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}