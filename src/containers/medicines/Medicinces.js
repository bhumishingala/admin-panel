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

function Medicinces(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInsert = (values) => {
        let localData = JSON.parse(localStorage.getItem("Medicinces"));

        if (localData === null) {
            localStorage.setItem("Medicinces", JSON.stringify([values]))
        } else {
            localData.push(values);
            localStorage.setItem("Medicinces", JSON.stringify(localData));
        }

        console.log(values, localData);
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

    const { handleBlur, handleSubmit, handleChange, errors, touched } = formik;

    return (
        <div>
            <h1>Medicinces</h1>
            <div>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Add Medicinces
                </Button>
                <table border="1">
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quntity</th>
                        <th>Price</th>
                        <th>Expiry</th>
                    </tr>
                </table>
                {
                    <Dialog fullWidth open={open} onClose={handleClose}>
                        <DialogTitle>Add Medicince</DialogTitle>
                        <Formik values={formik}>
                            <Form onSubmit={handleSubmit}>
                                <DialogContent>
                                    return ()
                                    <TextField
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
                                        <Button type="submit">Submit</Button>
                                    </DialogActions>
                                </DialogContent>
                            </Form>
                        </Formik>
                    </Dialog>
                }
            </div>
        </div>
    );
}

export default Medicinces;