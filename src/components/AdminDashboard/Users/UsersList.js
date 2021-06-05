import React, { useState, useEffect } from 'react'
import { makeStyles, TableBody, TableCell, Table, TableContainer, TableRow, Breadcrumbs, Avatar, Typography, Paper } from '@material-ui/core';
import useTable from '../useTable'
import Button from '../Button'
import userService from '../../../services/user.service';
import FormPopup from '../FormPopup'
import Notification from '../../Notification'
import FormGradUser from '../FormGradUser'
import ConfirmDialog from '../ConfirmDialog';
import UserStatistics from './UserStatistics';
import UserFilters from './UserFilters';

import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import CloseIcon from '@material-ui/icons/Close';


const useStyle = makeStyles(theme => ({
    papper: {
        borderRadius: '16px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.411), 0 1px 10px rgba(0, 0, 0, 0.24)',
        marginBottom: '50px',
        '& .MuiButtonBase-root:focus': {
            border: 'none',
            outline: 'none'
        }
    },
    avatar: {
        width: "60px",
        height: "60px",
        marginRight: '15px'
    },
    table: {
        '& .MuiTableCell-root': {
            borderBottom: '2px solid rgba(0, 0, 0, 0.2)',
            fontSize: '0.875rem',
            letterSpacing: '0',
            '&:first-child': {
                paddingLeft: '30px'
            },
            '& .role': {
                padding: '5px 20px',
                borderRadius: '20px',
                color: '#fff'
            }
        },
        '& .MuiTableCell-head .MuiButtonBase-root': {
            fontSize: '1.1rem',
            color: 'rgb(23,43,77)',
        },
        '& tbody tr:hover': {
            backgroundColor: "#e7ebfc"
        },
        '&:focus': {
            border: 'none',
            outline: 'none'
        },
        '& .MuiTableSortLabel-active': {
            color: "red"
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

    const { TblHead, TblPagination, recordsAfterPagingAndSortingUsers } = useTable(records, headCells, filterFunction);

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
        <div className={props.sideState === true && window.innerWidth > 960 ? "dash-on dash-content" : "dash-content"}>
            <h1 style={{ padding: "10px 0 5px 0px" }} className="title-section">User list</h1>

            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
                <span style={{ color: '#1c2237b0' }}>Dasboard</span>
                <span className="text-primary">Users</span>
            </Breadcrumbs>

            <UserStatistics />

            <Paper className={classes.papper}>
                <UserFilters />

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

