import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DataGrid } from '@mui/x-data-grid';
import * as yup from 'yup';
import { useFormik, Formik, Form } from 'formik';

function Patients(props) {
    const [open, setOpen] = React.useState(false);
    const [data, setData] = useState([]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInsert = (values) => {
        let localData = JSON.parse(localStorage.getItem("Patients"));

        let id = Math.floor(Math.random() * 10000);
        let data = {
            id: id,
            ...values
        }

        if (localData === null) {
            localStorage.setItem("Patients", JSON.stringify([data]));
        } else {
            localData.push(data);
            localStorage.setItem("Patients", JSON.stringify(localData));
        }

        console.log(values, localData);
        handleClose();
        formik.resetForm();
        loadData();
    }

    let schema = yup.object().shape({
        name: yup.string().required("Please Enter Name."),
        message: yup.string().required("Please Any Message."),
        date: yup.date().required("Please Enter date.")
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            message: '',
            date: ''
        },
        validationSchema: schema,
        onSubmit: values => {
            handleInsert(values);
        },
    });

    const { handleBlur, handleSubmit, handleChange, errors, touched } = formik;

    const columns = [
        { field: 'name', headerName: 'Name', width: 100 },
        { field: 'message', headerName: 'Message', width: 170 },
        { field: 'date', headerName: 'Date', width: 170 },
    ];

    const loadData = () => {
        let localData = JSON.parse(localStorage.getItem("Patients"));

        setData(localData);
    }

    useEffect(() => {
        loadData();
    }, [])

    return (
        <div>
            <h1>Patients</h1>
            <div>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Patients data add
                </Button>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={data}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                    />
                </div>
                <Dialog fullWidth open={open} onClose={handleClose}>
                    <DialogTitle>Patients</DialogTitle>
                    <Formik values={formik}>
                        <Form onSubmit={handleSubmit}>
                            <DialogContent>
                                <TextField
                                    margin="dense"
                                    name='name'
                                    label="Patients Name"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.name && touched.name ? <p>{errors.name}</p> : ''}
                                <TextField
                                    margin="dense"
                                    name='message'
                                    label="Message"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.message && touched.message ? <p>{errors.message}</p> : ''}
                                <TextField
                                    margin="dense"
                                    name='date'
                                    type="date"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.date && touched.date ? <p>{errors.date}</p> : ''}
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button type="submit">Submit</Button>
                                </DialogActions>
                            </DialogContent>
                        </Form>
                    </Formik>
                </Dialog>
            </div>
        </div >
    );
}

export default Patients;