import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useFormik, Formik, Form } from 'formik';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DataGrid } from '@mui/x-data-grid';

function Doctors(props) {
    const [open, setOpen] = React.useState(false);
    const [data , setData] = useState([]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let schema = yup.object().shape({
        name: yup.string().required("Please Enter Your Name."),
        email: yup.string().email("Please Enter Vaild Email Id.").required("Please Enter Email Id."),
        phone: yup.string().matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Enter a valid phone number').min(10, "too short").required('Phone number is required'),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: ''
        },
        validationSchema: schema,
        onSubmit: values => {
            handleInsert(values);
        },
    });

    const { handleBlur, handleChange, handleSubmit, errors, touched, values } = formik;

    const handleInsert = (values) => {
        let localData = JSON.parse(localStorage.getItem("doctors"));

        let id = Math.floor(Math.random() *10000);

        let data = {
            id : id,
            ...values
        }

        if (localData === null) {
            localStorage.setItem("doctors", JSON.stringify([data]))
        } else {
            localData.push(data);
            localStorage.setItem("doctors", JSON.stringify(localData))
        }
        console.log(data);
        handleClose();
        LoadData();
        formik.resetForm()
    }

    const columns = [
        { field: 'name', headerName: 'name', width: 170 },
        { field: 'email', headerName: 'email', width: 250 },
        { field: 'phone', headerName: 'phone', width: 170 },
        {
            field : "action" , 
            headerName : "Action",
            renderCell: (params) => (
                console.log(params)
            )
        }
    ];

    const LoadData  = () => {
        let localData = JSON.parse(localStorage.getItem("doctors"));

        if(localData !== null){
            setData(localData);
        }
    }

    useEffect(() => {
        LoadData();
    },[])


    return (
        <div>
            <h1>Doctors</h1>
            <div>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Add Doctors List
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
                    <DialogTitle>Add Doctors</DialogTitle>
                    <Formik values={formik}>
                        <Form onSubmit={handleSubmit}>
                            <DialogContent>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    name='name'
                                    id="name"
                                    label="Doctors Name"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.name && touched.name ? <p>{errors.name}</p> : ''}
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    name='email'
                                    id="name"
                                    label="Email Address"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.email && touched.email ? <p>{errors.email}</p> : ''}
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    name='phone'
                                    id="name"
                                    label="Doctors Phone"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.phone && touched.phone ? <p>{errors.phone}</p> : ''}
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button type='submit'>Submit</Button>
                                </DialogActions>
                            </DialogContent>
                        </Form>
                    </Formik>
                </Dialog>
            </div>
        </div>
    );
}

export default Doctors;