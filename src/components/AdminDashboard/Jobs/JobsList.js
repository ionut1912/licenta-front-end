import React, { useState, useEffect } from 'react'
import { makeStyles, TableHead, TableBody, TableCell, TableRow, Table, TextField, Toolbar } from '@material-ui/core';
import useTable from '../useTable'
import jobService from '../../../services/job.service';
import AddIcon from '@material-ui/icons/Add';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CloseIcon from '@material-ui/icons/Close';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import ViewPopup from '../../ViewPopup'
import JobView from '../../Joburi/JobView'
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
    { id: 'numeJob', label: 'Name job' },
    { id: 'locatie', label: 'Location' },
    { id: 'last_date', label: 'Last date' },
    { id: 'actions', label: 'Actions', disableSorting: true }

]

const filterInputs = [
    { id: 'numeJob', label: 'Search by name' },
    { id: 'location', label: 'Search by location' },
    { id: 'last_date', label: 'Search by last date' },
    { id: '', label: '' }
]

function JobsList(props) {

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
        recordsAfterPagingAndSortingJobs
    } = useTable(records, headCells, filterFunction);


    const handleSearchInput = (e) => {
        const { name, value } = e.target;
        setFilterFunction({
            fn: items => {
                if (value === "")
                    return items;
                else if (name === "numeJob")
                    return items.filter(x => x.numeJob.toLowerCase().includes(value.toLowerCase()))
                else if (name === "location")
                    return items.filter(x => x.locatie.toLowerCase().includes(value.toLowerCase()))
                else if (name === "last_date")
                    return items.filter(x => x.last_date.toLowerCase().includes(value.toLowerCase()))

            }
        })
    }

    const getData = () => {
        jobService.getJobs().then(
            response => setRecords(response.data)
        )
    }

    useEffect(() => {
        getData();
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
        jobService.deleteJob(id);
        getData();
        setNotify({
            isOpen: true,
            message: 'Deleted Successfull!',
            type: 'error'
        })


    }

    return (
        <div className={props.sideState === true && window.innerWidth > 960 ? "dash-on dash-content" : "dash-content"} style={{ background: "#f1f1f1" }}>
            <Toolbar>
                <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    className={classes.newBtn}
                    onClick={() => { props.setState(4); props.setItemForEdit("") }}
                    text="Add new job"
                />
            </Toolbar>
            <Table className={classes.table}>
                <TblHead />
                <TableHead className={classes.filterHead}>
                    <TableRow>
                        {
                            filterInputs.map((filterCell, index) => (
                                <TableCell key={index}>
                                    {index === 3 ? null : <TextField
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
                        recordsAfterPagingAndSortingJobs().map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.numeJob}</TableCell>
                                <TableCell>{item.locatie}</TableCell>
                                <TableCell>24/03/2021 17:00</TableCell>
                                <TableCell>
                                    <div className={classes.action}>
                                        <Button
                                            color="default"
                                            style={{ color: '#1769aa' }}
                                            text={<VisibilityIcon fontSize="small" />}
                                            onClick={() => { openInPopupView(item) }}
                                        />
                                        <Button
                                            onClick={() => { props.setState(4); props.setItemForEdit(item) }}
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
                                                    onConfirm: () => { onDelete(item.id); console.log(item) }
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
                title={recordForView.numeJob}
                subTitle={recordForView.locatie}
                openPopup={openPopupView}
                setOpenPopup={setOpenPopupView}>
                <JobView recordForView={recordForView} buttons={false} buttonsAddJob={false}/>
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

export default JobsList
