import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from 'yup';
import { useFormik, Formik, Form } from 'formik';

function Patients(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInsert = (values) => {
        let localData = localStorage.getItem("Patients");
        console.log(values ,localData);
    }

    let schema = yup.object().shape({
        name: yup.string().required("Please Enter Name."),
        fees: yup.number().required("Please Enter Price."),
        date:yup.date().required("Please Enter date.")
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            price: '',
            quntity: '',
            expiry: ''
        },
        validationSchema: schema,
        onSubmit: values => {
            handleInsert(values);
        },
    });

    return (
        <div>
            <h1>Patients</h1>
            <div>
                <Button variant="outlined" onClick={handleClickOpen}>
                Patients data add
                </Button>
                <Formik values={formik}>
                    <Form>
                        <Dialog open={open} onClose={handleClose}>
                            <DialogTitle>Patients</DialogTitle>
                            <DialogContent>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    name="name"
                                    label="Patients Name"
                                    type="email"
                                    fullWidth
                                    variant="standard"
                                />
                                 <TextField
                                    autoFocus
                                    margin="dense"
                                    name="price"
                                    label="Patients fees"
                                    type="email"
                                    fullWidth
                                    variant="standard"
                                />
                                 <TextField
                                    autoFocus
                                    margin="dense"
                                    name="date"
                                    label="Appoinment date"
                                    type="email"
                                    fullWidth
                                    variant="standard"
                                />
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button onClick={handleClose}>Subscribe</Button>
                                </DialogActions>
                            </DialogContent>
                        </Dialog>
                    </Form>
                </Formik>
            </div>
        </div>
    );
}

export default Patients;