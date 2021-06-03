import React, { useState, useEffect } from 'react'
import { makeStyles, TableBody, TableCell, Table, TableContainer, TextField, Toolbar, InputAdornment, TableRow, Tabs, Tab, Breadcrumbs, Avatar, Typography, Paper } from '@material-ui/core';
import useTable from '../useTable'
import Button from '../Button'
import userService from '../../../services/user.service';
import FormPopup from '../FormPopup'
import Notification from '../../Notification'
import FormGradUser from '../FormGradUser'
import ConfirmDialog from '../ConfirmDialog';
import UserStatistics from './UserStatistics';

import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import CloseIcon from '@material-ui/icons/Close';
import Search from '@material-ui/icons/Search';


const useStyle = makeStyles(theme => ({
    papper: {
        borderRadius: '16px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.411), 0 1px 10px rgba(0, 0, 0, 0.24)',
        marginBottom: '50px',
        '& hr': {
            margin: '-2px 0 0 0 ',
            borderTop: '2px solid rgba(0, 0, 0, 0.2)'
        },
        '& .MuiTab-root': {
            '&:first-child': {
                borderTopLeftRadius: '16px'
            },
            '&:focus': {
                border: 'none',
                outline: 'none'
            }
        },
        '& .MuiButtonBase-root:focus': {
            border: 'none',
            outline: 'none'
        },
        '& .MuiOutlinedInput-root': {
            borderRadius: '20px 20px 20px 20px',
            width: '20rem'
        },
    },
    avatar: {
        width: "60px",
        height: "60px",
        marginRight: '15px'
    },
    table: {
        color: 'rgb(23,43,77)',
        '& .MuiTableCell-root': {
            borderBottom: '2px solid rgba(0, 0, 0, 0.2)',
            fontSize: '0.875rem',
            letterSpacing: '0',
            '&:first-child': {
                paddingLeft: '30px'
            },
            '& .role': {
                padding: '5px 20px',
                borderRadius: '20px 20px 20px 20px',
                color: '#fff'
            }
        },
        '& .MuiTableCell-head .MuiButtonBase-root': {
            fontSize: '1.1rem',
        },
        '& tbody tr:hover': {
            backgroundColor: "#e7ebfc"
        },
        '&:focus': {
            border: 'none',
            outline: 'none'
        },
        '& .MuiTableSortLabel-active': {
            color: "#f1f1f1"
        },
        '& .MuiFormControl-root': {
            backgroundColor: "white",
            color: 'black'
        }
    },
    action: {
        display: 'flex',
        width: '100%'
    },

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

    const [currentTab, setCurrentTab] = useState(0);

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

    const handleChange = (event, newValue) => {
        setCurrentTab(newValue);
    };

    return (
        <div className={props.sideState === true && window.innerWidth > 960 ? "dash-on dash-content" : "dash-content"}>
            <h1 style={{ padding: "10px 0 5px 0px" }} className="title-section">User list</h1>

            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
                <a style={{ color: '#1c2237b0' }}>Dasboard</a>
                <a className="text-primary">Users</a>
            </Breadcrumbs>

            <UserStatistics />

            <Paper className={classes.papper}>
                <Tabs
                    value={currentTab}
                    indicatorColor="primary"
                    onChange={handleChange}
                    textColor="primary"
                >
                    <Tab label="All user" />
                    <Tab label="Admin" />
                    <Tab label="Normal user" />
                </Tabs>
                <hr />

                <Toolbar style={{ margin: '30px 0px 30px 0' }}>
                    <TextField
                        variant="outlined"
                        style={{ marginLeft: '20px' }}
                        label="Search by name"
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                    />
                    <TextField
                        variant="outlined"
                        style={{ marginLeft: '50px' }}
                        label="Search by email"
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                    />
                    <TextField
                        variant="outlined"
                        style={{ marginLeft: '50px' }}
                        label="Search by location"
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
                            {recordsAfterPagingAndSortingUsers().map((item, index) => (
                                <TableRow key={index}>

                                    <TableCell>
                                        <div className="d-flex align-items-center">
                                            {item.img === null ? null : <Avatar src={item.img} alt="" className={classes.avatar} />}
                                            <Typography style={item.img === null ? { marginLeft: '75px' } : null}>{item.full_name}</Typography>
                                        </div>
                                    </TableCell>
                                    <TableCell className={classes.th}>{item.email}</TableCell>
                                    <TableCell>{item.phone}</TableCell>
                                    <TableCell><span style={item.role === 'ROLE_USER' ? { backgroundColor: "#f19e02" } : { backgroundColor: "#4c0097" }} className="role">
                                        {item.role === 'ROLE_USER' ? "User" : "Admin"}</span>
                                    </TableCell>
                                    <TableCell>
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
                title="Change role"
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

