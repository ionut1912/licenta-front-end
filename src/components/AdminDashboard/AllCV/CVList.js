import React, { useState, useEffect } from 'react'
import { makeStyles, TableHead, TableBody, TableCell, TableRow, Table, TextField, Toolbar } from '@material-ui/core';
import useTable from '../useTable'
import cvService from '../../../services/cv-service';
import AddIcon from '@material-ui/icons/Add';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CloseIcon from '@material-ui/icons/Close';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import ViewPopup from '../../ViewPopup'
import PDF from '../../CV/PDF'
import Notification from '../../Notification'
import Button from '../Button'
import ConfirmDialog from '../ConfirmDialog';


const useStyle = makeStyles(theme => ({
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
    },
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
    action: {
        display: 'flex',
        width: '100%'
    },
    filterHead: {
        backgroundColor: '#f1f1f1'
    }
}))

const headCells = [
    { id: 'first_name', label: 'First name' },
    { id: 'last_name', label: 'Last name' },
    { id: 'email', label: 'Email' },
    { id: 'phone', label: 'Phone' },
    { id: 'city', label: 'City' },
    { id: 'date_of_birth', label: 'Date of birth' },
    { id: 'linkedin ', label: 'Linkedin' },
    { id: 'actions', label: 'Actions', disableSorting: true }

]

const filterInputs = [
    { id: 'first_name', label: 'Search by first name' },
    { id: 'last_name', label: 'Search by last name' },
    { id: 'email', label: 'Search by email' },
    { id: 'phone', label: 'Search by phone' },
    { id: 'city', label: 'Search by city' },
    { id: 'date_of_birth', label: 'Search by date of birth' },
    { id: 'linkedin', label: 'Search by linkedin' },
    { id: '', label: '' }
]

function format(date) {
    return new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    }).format(new Date(date));
}


function CVList(props) {

    const classes = useStyle();
    const [records, setRecords] = useState([]);
    const [openPopupView, setOpenPopupView] = useState(false);
    const [recordForView, setRecordForView] = useState("");
    const [filterFunction, setFilterFunction] = useState({ fn: items => { return items } })
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    const {
        TblHead,
        TblPagination,
        recordsAfterPagingAndSortingCVs
    } = useTable(records, headCells, filterFunction);


    const handleSearchInput = (e) => {
        const { name, value } = e.target;
        setFilterFunction({
            fn: items => {
                if (value === "")
                    return items;
                else if (name === "first_name")
                    return items.filter(x => x.first_name.toLowerCase().includes(value.toLowerCase()))
                else if (name === "last_name")
                    return items.filter(x => x.last_name.toLowerCase().includes(value.toLowerCase()))
                else if (name === "email")
                    return items.filter(x => x.email.toLowerCase().includes(value.toLowerCase()))
                else if (name === "phone")
                    return items.filter(x => x.phone.toLowerCase().includes(value.toLowerCase()))
                else if (name === "city")
                    return items.filter(x => x.city.toLowerCase().includes(value.toLowerCase()))
                else if (name === "date_of_birth")
                    return items.filter(x => x.date_of_birth.toLowerCase().includes(value))
                else if (name === "linkedin")
                    return items.filter(x => x.linkedin.toLowerCase().includes(value.toLowerCase()))




            }
        })
    }

    const getData = () => {
        cvService.getCvs().then(
            response => setRecords(response.data)
        )
    }

    useEffect(() => {
        getData();

        return function cleanup() {
            setRecords([]);
        }
    }, [])


    const openInPopupView = item => {
        setRecordForView(item);
        setOpenPopupView(true);
    }

    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        cvService.deleteCv(id).then(
            response => setNotify({
                isOpen: true,
                message: 'Deleted Successfull!',
                type: 'error'
            }),
            error =>
                setNotify({
                    isOpen: true,
                    message: 'Deleted Successfull!',
                    type: 'error'
                })
        );
        getData();


    }
    return (
        <div className={props.sideState === true && window.innerWidth > 960 ? "dash-on dash-content" : "dash-content"}>
            <Toolbar>
                <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    className={classes.newBtn}
                    onClick={() => { props.setState(7); props.setItemForEdit("") }}
                    text="Add new cv"
                />
            </Toolbar>
            <Table className={classes.table}>
                <TblHead />
                <TableHead className={classes.filterHead}>
                    <TableRow>
                        {
                            filterInputs.map((filterCell, index) => (
                                <TableCell key={index}>
                                    {index === 7 ? null : <TextField
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
                <TableBody>
                    {
                        recordsAfterPagingAndSortingCVs().map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.first_name}</TableCell>
                                <TableCell>{item.last_name}</TableCell>
                                <TableCell>{item.email}</TableCell>
                                <TableCell>{item.phone}</TableCell>
                                <TableCell>{item.city}</TableCell>
                                <TableCell>{item.dateOfBirth !== null ? format(item.dateOfBirth) : null}</TableCell>
                                <TableCell>{item.linkedin}</TableCell>
                                <TableCell>
                                    <div className={classes.action}>
                                        <Button
                                            color="default"
                                            style={{ color: '#1769aa' }}
                                            text={<VisibilityIcon fontSize="small" />}
                                            onClick={() => { openInPopupView(item) }}
                                        />
                                        <Button
                                            onClick={() => { props.setState(7); props.setItemForEdit(item); }}
                                            text={<EditOutlinedIcon fontSize="small" />}
                                            style={{ marginLeft: "10px" }}
                                        />
                                        <Button
                                            color="secondary"
                                            onClick={() => {
                                                setConfirmDialog({
                                                    isOpen: true,
                                                    title: 'Are you sure to delete this record?',
                                                    subTitle: "You can't undo this operation",
                                                    onConfirm: () => { onDelete(item.id);  }
                                                })

                                            }}
                                            style={{ marginLeft: "10px" }}
                                            text={<CloseIcon fontSize="small" />}
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>))
                    }
                </TableBody>
            </Table>
            <TblPagination />

            <ViewPopup
                cvMode={true}
                openPopup={openPopupView}
                setOpenPopup={setOpenPopupView}>
                <PDF cv={recordForView} viewCv={true} showButton={false} />
            </ViewPopup>

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

export default CVList
