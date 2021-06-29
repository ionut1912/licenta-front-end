import React, { useState, useEffect } from 'react'
import { makeStyles, TableBody, TableCell, Table, TableContainer, TableRow, Breadcrumbs, Toolbar, Paper } from '@material-ui/core';
import useTable from '../useTable'
import ViewPopup from '../../ViewPopup'
import JobView from '../../Joburi/JobView'
import Notification from '../../Notification'
import Button from '../Button'
import ConfirmDialog from '../ConfirmDialog';
import JobStatistics from './JobStatistics';
import JobFilters from './JobFilters';
import jobService from '../../../services/job.service';

import AssignmentIcon from '@material-ui/icons/Assignment';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CloseIcon from '@material-ui/icons/Close';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import AddIcon from '@material-ui/icons/Add';

import { motion } from "framer-motion";



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
    table: {
        '& .MuiTableCell-root': {
            borderBottom: '2px solid rgba(0, 0, 0, 0.2)',
            fontSize: '0.875rem',
            letterSpacing: '0',
            '&:first-child': {
                paddingLeft: '30px'
            },
            '& .role': {
                padding: '5px 10px',
                borderRadius: '20px',
                color: '#fff',
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
    toolbar: {

        marginLeft: 'auto',

    },
    btn: {
        padding: '10px 20px',
        marginBottom: '20px',
        marginLeft: 'auto',
        borderRadius: '20px 20px 20px 20px',
    }
}))

const headCells = [
    { id: 'numeJob', label: 'Name job' },
    { id: 'locatie', label: 'Location' },
    { id: 'jobCategory', label: 'Job category' },
    { id: 'jobType', label: 'Job type' },
    { id: 'dataAdaugare', label: 'Data adaugarii' },
    { id: 'dataMaxima', label: 'Last date' },
    { id: 'actions', label: 'Actions', disableSorting: true }

]

function format(date) {
    return new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    }).format(new Date(date));
}


export default function JobsList(props) {

    const classes = useStyle();

    const [records, setRecords] = useState([]);
    const [openPopupView, setOpenPopupView] = useState(false);
    const [recordForView, setRecordForView] = useState("");

    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    const filterData = (records) => {

        return records.filter(element => filter.tab === 0 ? element : filter.tab === 1 ? (new Date(element.dataMaxima).getTime() >= new Date().getTime())
            : (new Date(element.dataMaxima).getTime() < new Date().getTime()))
            .filter(element => filter.name === "" ? element : element.numeJob.toLowerCase().includes(filter.name.toLowerCase()))
            .filter(element => filter.location.length === 0 ? element : filter.location.includes(element.locatie))
            .filter(element => filter.category.length === 0 ? element : filter.category.includes(element.jobCategory))
            .filter(element => filter.type.length === 0 ? element : filter.type.includes(element.jobType))

    }

    const { TblHead, TblPagination, recordsAfterPagingAndSorting } = useTable(records, headCells, filterData);

    const [filter, setFilter] = useState({
        tab: 0,
        name: "",
        location: [],
        category: [],
        type: []
    });


    const getData = () => {
        jobService.getJobs().then(
            response => {
                setRecords(response.data)
            }
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

    const showApplications = item => {
        props.setShowApplcations(item);
        props.setState(5);
    }

    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        jobService.deleteJob(id).then(
            response => {
                getData()
                setNotify({
                    isOpen: true,
                    message: 'Deleted Successfull!',
                    type: 'success'
                })
            },
            error => {
                setNotify({
                    isOpen: true,
                    message: 'Network error!',
                    type: 'error'
                })
            }
        )

    }

    // animation
    const contentAnim = {
        hidden: {
            opacity: 0
        },
        visible: {
            opacity: 1,
            transition: { type: 'spring', delay: 0.5, duration: 0.5 }
        }
    }

    return (
        <motion.div variants={contentAnim} initial='hidden' animate='visible'
            className={props.sideState === true && window.innerWidth > 960 ? "dash-on dash-content" : "dash-content"} >

            <h1 style={{ padding: "10px 0 10px 0px" }} className="title-section">Job list </h1>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
                <span style={{ color: '#1c2237b0' }}>Dasboard</span>
                <span className="text-primary">Jobs</span>
            </Breadcrumbs>

            <JobStatistics />

            <Toolbar className={classes.toolbar}>
                <Button
                    startIcon={<AddIcon />}
                    className={classes.btn}
                    onClick={() => { props.setState(4); props.setItemForEdit("") }}
                    text="Add new job"
                />
            </Toolbar>
            <Paper className={classes.papper}>
                <JobFilters setFilter={setFilter} filter={filter} />

                <TableContainer style={{ marginTop: '25px' }}>
                    <Table className={classes.table}>
                        <TblHead />
                        <TableBody>
                            {
                                recordsAfterPagingAndSorting().map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{item.numeJob}</TableCell>
                                        <TableCell>{item.locatie}</TableCell>
                                        <TableCell>{item.jobCategory}</TableCell>

                                        <TableCell><span style={item.jobType === 'FULL_TIME' ? { backgroundColor: "#f19e02", display: 'block', textAlign: 'center' } : { backgroundColor: "#4c0097", display: 'block', textAlign: 'center' }} className="role">
                                            {item.jobType === 'FULL_TIME' ? "Full time" : "Part time"}</span></TableCell>

                                        <TableCell>{format(item.dataAdaugare)}</TableCell>

                                        <TableCell><span style={new Date(item.dataMaxima).getTime() >= new Date().getTime() ? { backgroundColor: "#40a145" } : { backgroundColor: "#f30909" }} className="role">
                                            {format(item.dataMaxima)}</span>
                                        </TableCell>

                                        <TableCell>
                                            <div className={classes.action}>

                                                <Button
                                                    style={{ backgroundColor: "#4c0097" }}
                                                    color="primary"
                                                    text={<AssignmentIcon fontSize="small" />}
                                                    onClick={() => { showApplications(item.numeJob) }}
                                                />
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
                                                            title: 'Are you sure want delete this record?',
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
                </TableContainer>
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
        </motion.div>

    )

}

