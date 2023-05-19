import { React } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material' ;
import Cookies from "universal-cookie";

export const ApprobeRequest = ({ open, onClose, rowData }) => {
    const cookies = new Cookies();
    const navigate = useNavigate();

    let token = cookies.get("token");
    let rol = cookies.get("rol");

    if (!token && rol !== "admin") {
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
    
    const handleApprove = async () => {
        try {
           await fetch(`http://localhost:8080/api/v1/users/${rowData.created_by}/requests/${rowData.id}/approve`, options);
           handleClose();
           window.location.reload();
        } catch (error) {
          console.log(error);
        }
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle id="form-dialog-title">Aprobar Solicitud de Estación</DialogTitle>
            <DialogContent>
                <DialogContent dividers>
                    <Typography align="center">¿Esta seguro de aprobar la Estación {rowData.station} con Nº de Serie {rowData.serial_number}?<br/>Se enviaria un Email de aviso a la dirección {rowData.mail}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                    Cancelar
                    </Button>
                    <Button onClick={handleApprove} color="primary">
                    Aprobar
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
}