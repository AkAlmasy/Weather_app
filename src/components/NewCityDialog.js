import React, { useState } from 'react';
import { TextField, DialogContentText, DialogTitle, Dialog, Button, DialogContent, DialogActions } from '@material-ui/core';

export default function NewCityDialog(props) {
    const [cityName, setCityName] = useState("");
    return (
    <Dialog open={props.open} onClose={props.cancelAction} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add New City !</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Name the new city you wish to see the weather in.
          </DialogContentText>
        
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="City name"
                type="text"
                fullWidth
                value={cityName}
                onChange={e => setCityName(e.target.value)}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={props.cancelAction} color="primary">
                Cancel
          </Button>
             <Button type="submit" onClick={() => props.okAction(cityName)} color="primary">
                Add
          </Button>
        </DialogActions>
    </Dialog>);
}