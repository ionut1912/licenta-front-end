import React, { useState, useEffect } from 'react'
import { makeStyles, TableBody, TableCell, Table, TableContainer, TextField, Toolbar, InputAdornment, TableRow, Tabs, Tab, Breadcrumbs, Avatar, Typography, Paper } from '@material-ui/core';
import useTable from '../useTable'
import Button from '../Button'
import * as IoIcons from 'react-icons/io';
import userService from '../../../services/user.service';
import CloseIcon from '@material-ui/icons/Close';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import FormPopup from '../FormPopup'
import Notification from '../../Notification'
import FormGradUser from '../FormGradUser'
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import ConfirmDialog from '../ConfirmDialog';
import Search from '@material-ui/icons/Search';


const useStyle = makeStyles(theme => ({
    papper: {
        borderRadius: '16px'
    },
    avatar: {
        width: "50px",
        height: "50px",
        marginRight: '10px'
    },
    tyName: {
        fontSize: '0.875rem'
    },
    action: {
        display: 'flex',
        width: '100%'
    },
    table: {
        '& thead tr': {
            textAlign: 'left',
            fontWeight: 'bold'
        },
        '& tbody tr:hover': {
            backgroundColor: "#f1f1f1"
        },
        '&:focus': {
            border: 'none',
            outline: 'none'
        },
        '& .MuiTableCell-head': {
            fontSize: '17px'
        },
        '& .MuiTableSortLabel-active': {
            color: "#f1f1f1"
        },
        '& .MuiFormControl-root': {
            backgroundColor: "white",
            color: 'black'
        }
    }

}))

const headCells = [
    { id: 'full_name', label: 'Full name' },
    { id: 'email', label: 'Email' },
    { id: 'phone', label: 'Phone' },
    { id: 'role', label: 'Grad' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]


export default function UsersList(props) {

    const classes = useStyle();
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [records, setRecords] = useState([]);
    const [filterFunction, setFilterFunction] = useState({ fn: items => { return items } })
    const [openPopup, setOpenPopup] = useState(false);

    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    const {
        TblHead,
        TblPagination,
        recordsAfterPagingAndSortingUsers
    } = useTable(records, headCells, filterFunction);

    function getData() {
        userService.getAllUsers().then(
            response =>
                setRecords(response.data)
        )
    }

    useEffect(() => {
        getData();
    }, [])

    const editGrad = (user, resetForm) => {
        userService.updateUserInformation(user);
        getData();
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)

        setNotify({
            isOpen: true,
            message: 'Submitted Successfull!',
            type: 'success'
        })
    }

    const openInPopup = item => {
        setRecordForEdit(item);
        setOpenPopup(true);
    }

    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        userService.deleteUser(id);
        getData();

        setNotify({
            isOpen: true,
            message: 'Deleted Successfull!',
            type: 'error'
        })
    }

    return (
        <div className={props.sideState === true && window.innerWidth > 960 ? "dash-on dash-content" : "dash-content"} style={{ backgroundColor: '#f1f1f1' }}>
            <h1 style={{ padding: "10px 0 10px 0px" }} className="title-section">User list</h1>
            <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb">
                <a style={{ color: 'black' }}>Material-U</a>
                <a style={{ color: 'black' }}>Core</a>
                <Typography style={{ color: '#1c2237b0' }}>Breadcrumb</Typography>
            </Breadcrumbs>

            <div className="card mb-3" style={{ width: "18rem" }}>
                <div className="card-body">
                    <h3 className="card-title">Numarul de utilizatori</h3>
                    <div className="activity">
                        <IoIcons.IoIosPaper className="activity-icon text-primary" />
                        <div className="activity-body">
                            <p className="card-text">5</p>
                        </div>
                    </div>


                </div>
            </div>
            <Paper className={classes.papper}>
                <Tabs
                    value={0}
                    indicatorColor="primary"
                    textColor="primary"
                >
                    <Tab label="Item One" />
                    <Tab label="Item Two" />
                    <Tab label="Item Three" />
                </Tabs>

                <Toolbar style={{margin:'20px'}}>
                    <TextField
                        variant="outlined"
                        className={classes.searchInput}
                        label="Search Employees"
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}

                    />
                </Toolbar>

                <TableContainer style={{ marginTop: '25px' }}>
                    <Table className={classes.table}>
                        <TblHead />
                        <TableBody >
                            {
                                recordsAfterPagingAndSortingUsers().map((item, index) => (
                                    <TableRow key={index}>

                                        <TableCell>
                                            <div className="d-flex align-items-center">
                                                {item.img === null ? null : <Avatar src={item.img} alt="" className={classes.avatar} />}
                                                <Typography className={classes.tyName}>{item.full_name}</Typography>
                                            </div>
                                        </TableCell>
                                        <TableCell className={classes.th}>{item.email}</TableCell>
                                        <TableCell>{item.phone}</TableCell>
                                        <TableCell>{item.role}</TableCell>
                                        <TableCell  >
                                            <div className={classes.action}>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    text={<EditOutlinedIcon fontSize="small" />}
                                                    onClick={() => { openInPopup(item) }} />
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    text={<CloseIcon fontSize="small" />}
                                                    onClick={() => {
                                                        setConfirmDialog({
                                                            isOpen: true,
                                                            title: 'Are you sure to delete this record?',
                                                            subTitle: "You can't undo this operation",
                                                            onConfirm: () => { onDelete(item.id) }
                                                        })

                                                    }}
                                                    style={{ marginLeft: "10px" }}
                                                />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TblPagination />
            </Paper>

            <FormPopup
                title="Grad form"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}>
                <FormGradUser recordForEdit={recordForEdit} editGrad={editGrad} />
            </FormPopup>

            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </div>
    )
}

