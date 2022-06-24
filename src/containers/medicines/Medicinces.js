import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from 'yup';

function Medicinces(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let schema = yup.object().shape({
        name: yup.string().required(),
        price: yup.number().required(),
        quntity: yup.string().email(),
        website: yup.string().url(),
        createdOn: yup.date().default(function () {
          return new Date();
        }),
      });

    return (
        <div>
            <h1>Medicinces</h1>
            <div>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Add Medicinces
                </Button>
                <Dialog fullWidth open={open} onClose={handleClose}>
                    <DialogTitle>Add Medicince</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="name"
                            name='name'
                            label="Email Address"
                            type="email"
                            fullWidth
                            variant="standard"
                        />
                         <TextField
                            margin="dense"
                            id="name"
                            name='price'
                            label="Email Address"
                            type="email"
                            fullWidth
                            variant="standard"
                        />
                         <TextField
                            margin="dense"
                            id="name"
                            name='quntity'
                            label="Email Address"
                            type="email"
                            fullWidth
                            variant="standard"
                        />
                         <TextField
                            margin="dense"
                            id="name"
                            name='expiry'
                            label="Email Address"
                            type="email"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleClose}>Subscribe</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
}

export default Medicinces;