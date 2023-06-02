import { React } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material' ;
import Cookies from "universal-cookie";

export const SuspendStation = ({ open, onClose, rowData }) => {
    const cookies = new Cookies();
    const navigate = useNavigate();

    let token = cookies.get("token");

    if (!token) {
        navigate('/');
    }

    const headers = new Headers();
    headers.append("Authorization", `${token}`);

    const options = {
        method: "PATCH",
        headers: headers
    };
    
    const handleClose = () => {
        onClose();
    };
    
    const handleSuspend = async () => {
        try {
           await fetch(`http://localhost:8080/api/v1/users/${rowData.created_by}/stations/${rowData.id}/suspend`, options);
           handleClose();
           window.location.reload();
        } catch (error) {
          console.log(error);
        }
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle id="form-dialog-title">Inactivar Estación</DialogTitle>
            <DialogContent>
                <DialogContent dividers>
                    <Typography align="center">¿Esta seguro de inactivar la Estacion { rowData.name } con Nº de Serie { rowData.serial_number }?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                    Cancelar
                    </Button>
                    <Button onClick={handleSuspend} color="primary">
                    Inactivar
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
}