import { Grid } from "@mui/material";
import { Header } from "./components/header";
import { RequestFilters } from "./components/request-filters";
import { RequestsTable } from "./components/requests-table";
import Paper from '@mui/material/Paper';

export const Requests = () => {
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
                        <RequestFilters />
                    </Grid>
                    <Grid sx={{ height: '20px' }}>
                        
                    </Grid>
                    <Grid>
                        <RequestsTable />
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}