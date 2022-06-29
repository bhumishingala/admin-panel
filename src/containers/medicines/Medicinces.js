import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from 'yup';
import { useFormik, Formik, Form } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';

function Medicinces(props) {
    const [open, setOpen] = React.useState(false);
    const [dopen, setDOpen] = React.useState(false);
    const [did, setDid] = useState(0);
    const [data, setData] = useState([]);

    const handleDClickOpen = () => {
        setDOpen(true);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setDOpen(false);
    };

    const handleEdit = (params) => {
        handleClickOpen();

        formik.setValues(params.row);
    }

    const handleInsert = (values) => {
        let localData = JSON.parse(localStorage.getItem("Medicinces"));

        let id = Math.floor(Math.random() * 1000);
        let data = {
            id: id,
            ...values
        }

        console.log(id);

        if (localData === null) {
            localStorage.setItem("Medicinces", JSON.stringify([data]))
        } else {
            localData.push(data);
            localStorage.setItem("Medicinces", JSON.stringify(localData));
        }

        console.log(values, localData);

        handleClose();
        formik.resetForm();
        LoadData();
    }

    let schema = yup.object().shape({
        name: yup.string().required("Please Enter Name."),
        price: yup.number().required("Please Enter Price."),
        quntity: yup.string().required("Please enter quntity."),
        expiry: yup.string().required("Please enter expiry.")
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

    const { handleBlur, handleSubmit, handleChange, errors, touched, values } = formik;

    const columns = [
        { field: 'name', headerName: 'Name', width: 70 },
        { field: 'price', headerName: 'Price', width: 70 },
        { field: 'quntity', headerName: 'Quntity', width: 70 },
        { field: 'expiry', headerName: 'Expiry', width: 70 },
        {
            field: 'action',
            headerName: 'Action',
            width: 170,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="delete" onClick={() => handleEdit(params)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => { handleDClickOpen(); setDid(params.id) }}>
                        <DeleteIcon />
                    </IconButton>
                </>
            )
        },
    ];

    const handleDelete = (params) => {
        let localData = JSON.parse(localStorage.getItem("Medicinces"));

        let fData = localData.filter((l) => l.id !== did);

        localStorage.setItem("Medicinces", JSON.stringify(fData));

        console.log(params.id, localData);
        handleClose();
        LoadData();
    }

    const LoadData = () => {
        let localData = JSON.parse(localStorage.getItem("Medicinces"));

        setData(localData);
    }

    useEffect(() => {
        LoadData();
    }, [])

    return (
        <div>
            <h1>Medicinces</h1>
            <div>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Add Medicinces
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
                <Dialog
                    open={dopen}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Are you Sure Delete?"}
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={handleClose}>No</Button>
                        <Button onClick={handleDelete} autoFocus>
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog fullWidth open={open} onClose={handleClose}>
                    <DialogTitle>Add Medicince</DialogTitle>
                    <Formik values={formik}>
                        <Form onSubmit={handleSubmit}>
                            <DialogContent>
                                <TextField
                                    value={values.name}
                                    margin="dense"
                                    name='name'
                                    label="Medicine Name"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.name && touched.name ? <p>{errors.name}</p> : ''}
                                <TextField
                                    value={values.price}
                                    margin="dense"
                                    name='price'
                                    label="Medicince Price"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.price && touched.price ? <p>{errors.price}</p> : ''}
                                <TextField
                                    value={values.quntity}
                                    margin="dense"
                                    name='quntity'
                                    label="Medicince Quntity"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.quntity && touched.quntity ? <p>{errors.quntity}</p> : ''}
                                <TextField
                                    value={values.expiry}
                                    margin="dense"
                                    name='expiry'
                                    label="Medicince Expiry"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.expiry && touched.expiry ? <p>{errors.expiry}</p> : ''}
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button type="submit" >Submit</Button>
                                </DialogActions>
                            </DialogContent>
                        </Form>
                    </Formik>
                </Dialog>
            </div>
        </div>
    );
}

export default Medicinces;