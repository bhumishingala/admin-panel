import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from 'yup';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Form, Formik, useFormik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, deleteCategory, getCategory, updateCategory } from '../../reduex/action/Category_action';

function Categaory(props) {
    const dispatch = useDispatch();
    const category = useSelector(state => state.category)
    const [open, setOpen] = React.useState(false);
    const [update, setUpdate] = useState(false);
    const [data, setData] = useState([]);
    const [dopen, setDOpen] = React.useState(false);
    const [did, setDid] = useState(0);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleDClickOpen = () => {
        setDOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setDOpen(false);
        setUpdate(false);
        formik.resetForm();
    };

    const columns = [
        { field: "name", headerName: 'Name', width: 170 },
        {
            field: "Prof_img",
            headerName: 'Profile Image',
            width: 170,
            renderCell: (params) => (
                <img src={params.row.Prof_img} width={70} height={50} />
            )
        },
        {
            field: "action",
            headerName: "Action",
            renderCell: (params) => (
                <>
                    <IconButton aria-label="delete" onClick={() => { handleDClickOpen(); setDid(params.row) }}>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => handleEdit(params)}>
                        <EditIcon />
                    </IconButton>
                </>
            )
        }
    ];

    let schema = yup.object().shape({
        name: yup.string().required("Plaese Enter Name"),
        Prof_img: yup.string().required("Please Select Any Profile Image")
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            Prof_img: ''
        },
        validationSchema: schema,
        onSubmit: values => {
            if (update) {
                handleClickUpdate(values);
            } else {
                handleInsert(values);
            }
            console.log(values);
            handleClose()
        },
    });

    const handleEdit = (params) => {
        handleClickOpen();

        setUpdate(true);
        formik.setValues(params.row)
    }

    const handleClickUpdate = (values) => {
        dispatch(updateCategory(values));
        handleClose();
    }

    const handleInsert = (values) => {
        dispatch(addCategory(values));
        console.log(values);

        handleClose();
        formik.resetForm()
    }
    const handleDelete = (params) => {
        dispatch(deleteCategory(did));
        handleClose();
    }

    const { handleSubmit, handleChange, handleBlur, errors,values,touched, setFieldValue } = formik;

    useEffect(() => {
        dispatch(getCategory());
    }, [])

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add category
            </Button>
            <Dialog
                open={dopen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are You Sure Delete?"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={handleDelete} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle>Add category</DialogTitle>
                <Formik values={formik}>
                    <Form onSubmit={handleSubmit}>
                        <DialogContent>
                            <TextField
                                margin="dense"
                                id="name"
                                label="Category Name"
                                type="text"
                                name="name"
                                fullWidth
                                variant="standard"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.name && touched.name ? <p>{errors.name}</p> : ''}
                            <input
                                id="name"
                                type='file'
                                name="Prof_img"
                                onChange={(e) => setFieldValue("Prof_img", e.target.files[0])}
                            />
                            {errors.Prof_img && touched.Prof_img ? <p>{errors.Prof_img}</p> : ''}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit">Submit</Button>
                        </DialogActions>
                    </Form>
                </Formik>
            </Dialog>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={category.category}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </div>
        </div>
    );
}

export default Categaory;