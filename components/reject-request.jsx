import { React, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Grid, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Cookies from "universal-cookie";

export const RejectRequest = ({ open, onClose, rowData }) => {
    const cookies = new Cookies();
    const navigate = useNavigate();

    let token = cookies.get("token");
    let rol = cookies.get("rol");

    if (!token && rol !== "admin") {
        navigate('/');
    }

    const handleClose = () => {
        onClose();
    };

    const [formData, setFormData] = useState({
        reason: ''
    });
    
    const handleReject = async () => {
        try {
            debugger;

            const data = {
                reason: formData.reason
            };

            const options = {
                method: "PATCH",
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            };

            await fetch(`http://localhost:8080/api/v1/users/${rowData.created_by}/requests/${rowData.id}/reject`, options);
            handleClose();
            window.location.reload();
        } catch (error) {
          console.log(error);
        }
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle id="form-dialog-title">Rechazar Solicitud de Estación</DialogTitle>
            <DialogContent>
                <DialogContent dividers>
                    <Typography align="center">¿Esta seguro de rechazar la Estación {rowData.station} con Nº de Serie {rowData.serial_number}?<br/>Se enviaria un Email de aviso a la dirección {rowData.mail}</Typography>
                    <Grid container alignItems="center" justifyContent="center">
                        <Grid item>
                            <TextField
                                required
                                autoFocus
                                margin="dense"
                                id="reason"
                                label="Razón"
                                variant="outlined"
                                style = {{width: 250}}
                                value={formData.reason}
                                onChange={(e) =>
                                setFormData((prevFormData) => ({
                                    ...prevFormData,
                                    reason: e.target.value,
                                }))
                                }
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                    Cancelar
                    </Button>
                    <Button onClick={handleReject} color="primary">
                    Rechazar
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
}