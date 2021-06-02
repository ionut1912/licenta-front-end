import React, { useState, useEffect } from 'react'
import { makeStyles, TableHead, TableBody, TableCell, TableRow, Table, TextField, Toolbar, Breadcrumbs, Typography, Paper } from '@material-ui/core';
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
import NavigateNextIcon from "@material-ui/icons/NavigateNext";


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
            fontSize: '17px'
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
    toolbar: {
        textTransform: 'none',
        marginLeft: 'auto',
        top: '-20px'
    },
    btn: {
        padding: '5px 20px',
        borderRadius: '20px 20px 20px 20px',
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
    { id: 'jobCategory', label: 'Job category' },
    { id: 'jobType', label: 'Job type' },
    { id: 'locatie', label: 'Location' },
    { id: 'last_date', label: 'Last date' },
    { id: 'actions', label: 'Actions', disableSorting: true }

]

const filterInputs = [
    { id: 'numeJob', label: 'Search by name' },
    { id: 'jobCategory', label: 'Search by job category' },
    { id: 'jobType', label: 'Search by job type' },
    { id: 'location', label: 'Search by location' },
    { id: 'last_date', label: 'Search by last date' },
    { id: '', label: '' }
]

function format(date) {
    return new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    }).format(new Date(date));
}


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
                else if (name === "jobCategory")
                    return items.filter(x => x.jobCategory.toLowerCase().includes(value.toLowerCase()))
                else if (name === "jobType")
                    return items.filter(x => x.jobType.toLowerCase().includes(value.toLowerCase()))
                else if (name === "location")
                    return items.filter(x => x.locatie.toLowerCase().includes(value.toLowerCase()))
                else if (name === "last_date")
                    return items.filter(x => format(x.dataMaxima.toLowerCase()).includes(value.toLowerCase()))

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
        jobService.deleteJob(id);
        getData();
        setNotify({
            isOpen: true,
            message: 'Deleted Successfull!',
            type: 'error'
        })


    }

    return (
        <div className={props.sideState === true && window.innerWidth > 960 ? "dash-on dash-content" : "dash-content"} style={{ backgroundColor: '#f1f1f1' }} >

            <h1 style={{ padding: "10px 0 10px 0px" }} className="title-section">Job list </h1>
            <div className="d-flex">
                <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                    aria-label="breadcrumb">
                    <a style={{ color: 'black' }}>Material-U</a>
                    <a style={{ color: 'black' }}>Core</a>
                    <Typography style={{ color: '#1c2237b0' }}>Breadcrumb</Typography>
                </Breadcrumbs>

                <Toolbar className={classes.toolbar}>
                    <Button
                        startIcon={<AddIcon />}
                        className={classes.btn}
                        onClick={() => { props.setState(4); props.setItemForEdit("") }}
                        text="Add new job"
                    />
                </Toolbar>
            </div>

            <Paper>
                <Table className={classes.table}>
                    <TblHead />
                    <TableHead className={classes.filterHead}>
                        <TableRow>
                            {
                                filterInputs.map((filterCell, index) => (
                                    <TableCell key={index}>
                                        {index === 5 ? null : <TextField
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
                                    <TableCell>{item.jobCategory}</TableCell>
                                    <TableCell>{item.jobType}</TableCell>
                                    <TableCell>{item.locatie}</TableCell>
                                    <TableCell>{format(item.dataMaxima)}</TableCell>
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
                                                        onConfirm: () => { onDelete(item.id); }
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
            </Paper>

            <ViewPopup
                title={recordForView.numeJob}
                subTitle={recordForView.locatie}
                openPopup={openPopupView}
                setOpenPopup={setOpenPopupView}>
                <JobView recordForView={recordForView} buttons={false} buttonsAddJob={false} />
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
