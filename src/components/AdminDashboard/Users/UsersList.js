import React, { useState, useEffect } from 'react'
import { makeStyles, TableBody, TableCell, TableHead, Table, TableRow, TextField } from '@material-ui/core';
import useTable from '../useTable'
import Button from '../Button'
import userService from '../../../services/user.service';
import CloseIcon from '@material-ui/icons/Close';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import FormPopup from '../FormPopup'
import Notification from '../Notification'
import FormGradUser from '../FormGradUser'
import ConfirmDialog from '../ConfirmDialog';


const useStyle = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: "75%"
    },
    newBtn: {
        margin: theme.spacing(0.5),
        textTransform: 'none',
        position: 'absolute',
        right: '10px'
    },
    img: {
        width: "100px",
        height: "100px",
        borderRadius: '50%',
    },
    action: {
        display: 'flex',
        width: '100%'
    },
    filterHead: {
        backgroundColor: '#f1f1f1'
    },
    table: {
        tableLayout: 'fixed',
        borderCollapse: 'collapse',
        margin: '25px 0',
        fontSize: '0.9em',
        minWidth: '400px',
        overflow: 'hidden',
        borderRadius: '8px 8px 8px 8px',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.15)',
        [theme.breakpoints.down(1447)]: {
            width: '95%',
            display: 'block',
            overflowX: 'auto',
        },
        '& thead': {
            padding: '12px 15px'
        },
        '& thead tr': {
            textAlign: 'left',
            fontWeight: 'bold'
        },
        '& tbody td': {
            fontWeight: '300',
            padding: '12px 15px',
            fontSize: '16px'
        },
        '& tbody tr:nth-of-type(even)': {
            backgroundColor: '#f3f3f3',
        },
        '& tbody tr:last-of-type': {
            borderBottom: '2px solid #009879',
            [theme.breakpoints.down(1340)]: {
                borderBottom: 'none'
            }
        },
        '&:focus': {
            border: 'none',
            outline: 'none'
        },
        '& .MuiTableCell-head': {
            color: '#f1f1f1',
            fontSize: '20px'
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
    { id: 'img', label: 'Image' },
    { id: 'full_name', label: 'Full name' },
    { id: 'email', label: 'Email' },
    { id: 'phone', label: 'Phone' },
    { id: 'role', label: 'Grad' },
    { id: 'actions', label: 'Actions', disableSorting: true }

]

const filterInputs = [
    { id: '', label: '' },
    { id: 'fullName', label: 'Search by name' },
    { id: 'email', label: 'Search by email' },
    { id: 'phone', label: 'Search by phone' },
    { id: 'role', label: 'Search by grad' },
    { id: '', label: '' }
]

export default function UsersList(props) {

    const classes = useStyle();
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [records, setRecords] = useState([]);
    const [filterFunction, setFilterFunction] = useState({ fn: items => { return items } })
    const [openPopup, setOpenPopup] = useState(false);

    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })


    const handleSearchInput = (e) => {
        const { name, value } = e.target;
        setFilterFunction({
            fn: items => {
                if (value === "")
                    return items;
                else if (name === "fullName")
                    return items.filter(x => x.full_name.toLowerCase().includes(value.toLowerCase()))
                else if (name === "email")
                    return items.filter(x => x.email.toLowerCase().includes(value.toLowerCase()))
                else if (name === "phone")
                    return items.filter(x => x.phone.toLowerCase().includes(value.toLowerCase()))
                else if (name === "role")
                    return items.filter(x => x.role.toLowerCase().includes(value.toLowerCase()))
            }
        })
    }

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
        <div className={props.sideState === true && window.innerWidth > 960 ? "dash-on dash-content" : "dash-content"} style={{ background: "#d7dcf893" }}>
            <Table className={classes.table}>
                <TblHead />
                <TableHead className={classes.filterHead}>
                    <TableRow>
                        {
                            filterInputs.map((filterCell, index) => (
                                <TableCell key={index}>
                                    {index === 5 || index === 0 ? null : <TextField
                                        variant="outlined"
                                        name={filterCell.id}
                                        label={filterCell.label}
                                        onChange={handleSearchInput}
                                    />
                                    }
                                </TableCell>
                            ))
                        }
                    </TableRow>
                </TableHead>
                <TableBody >
                    {
                        recordsAfterPagingAndSortingUsers().map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.img === null ? <CloseIcon fontSize="small" style={{ marginLeft: "35px" }} /> : <img src={item.img} className={classes.img} alt="" />}</TableCell>
                                <TableCell>{item.full_name}</TableCell>
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
                            </TableRow>))
                    }
                </TableBody>
            </Table>
            <TblPagination />

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

