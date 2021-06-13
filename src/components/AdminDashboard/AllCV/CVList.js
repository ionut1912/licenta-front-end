import React, { useState, useEffect } from 'react'
import { makeStyles, TableBody, TableCell, Table, TableContainer, TableRow, Breadcrumbs, Toolbar, Paper } from '@material-ui/core';
import useTable from '../useTable'
import ViewPopup from '../../ViewPopup'
import PDF from '../../CV/PDF'
import Notification from '../../Notification'
import Button from '../Button'
import ConfirmDialog from '../ConfirmDialog';
import CvStatistics from './CvStatistics';
import CvFilters from './CvFilters';
import cvService from '../../../services/cv-service';

import AddIcon from '@material-ui/icons/Add';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CloseIcon from '@material-ui/icons/Close';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import * as RiIcons from 'react-icons/ri';

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
    btn: {
        marginLeft: 'auto',
        marginBottom: '20px',
        padding: '10px 20px',
        borderRadius: '20px 20px 20px 20px',
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

function format(date) {
    return new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    }).format(new Date(date));
}

export default function CVList(props) {

    const classes = useStyle();

    const [records, setRecords] = useState([]);
    const [openPopupView, setOpenPopupView] = useState(false);
    const [recordForView, setRecordForView] = useState("");

    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })


    function getSkillsFromCv(skills) {
        const cvSkills = []
        skills.map((item) => cvSkills.indexOf(item.skill) === -1 ? cvSkills.push(item.skill) : null)
        return cvSkills;
    }

    function getLanguagesFromCv(languages) {
        const cvLanguages = []
        languages.map((item) => cvLanguages.indexOf(item.language_name) === -1 ? cvLanguages.push(item.language_name) : null)
        return cvLanguages;
    }


    const filterData = (records) => {

        return records.filter(element => filter.name === "" ? element :
            (element.first_name.toLowerCase().includes(filter.name.toLowerCase())) || element.last_name.toLowerCase().includes(filter.name.toLocaleLowerCase()))
            .filter(element => filter.email === "" ? element : element.email.toLowerCase().includes(filter.email.toLowerCase()))
            .filter(element => filter.phone === "" ? element : element.phone.toLowerCase().includes(filter.phone.toLowerCase()))
            .filter(element => filter.city.length === 0 ? element : filter.city.includes(element.city))
            .filter(element => filter.skill.length === 0 ? element : filter.skill.some(r => getSkillsFromCv(element.skills).indexOf(r) >= 0))
            .filter(element => filter.language.length === 0 ? element : filter.language.some(r => getLanguagesFromCv(element.languages).indexOf(r) >= 0))
    }


    const { TblHead, TblPagination, recordsAfterPagingAndSorting } = useTable(records, headCells, filterData);

    const [filter, setFilter] = useState({
        name: "",
        email: "",
        phone: "",
        city: [],
        skill: [],
        language: []
    });

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
            response => {
                getData();
                setNotify({
                    isOpen: true,
                    message: 'Deleted Successfull!',
                    type: 'success'
                })
            },
            error =>
                setNotify({
                    isOpen: true,
                    message: 'Network error!',
                    type: 'error'
                })
        );
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
            className={props.sideState === true && window.innerWidth > 960 ? "dash-on dash-content" : "dash-content"}>
            <h1 style={{ padding: "10px 0 10px 0px" }} className="title-section">Cv list </h1>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
                <span style={{ color: '#1c2237b0' }}>Dasboard</span>
                <span className="text-primary">Cvs</span>
            </Breadcrumbs>

            <CvStatistics />

            <Toolbar className={classes.toolbar}>
                <Button
                    startIcon={<AddIcon />}
                    className={classes.btn}
                    onClick={() => { props.setState(7); props.setItemForEdit("") }}
                    text="Add new cv"
                />
            </Toolbar>

            <Paper className={classes.papper}>
                <CvFilters setFilter={setFilter} filter={filter} records={records} />

                <TableContainer style={{ marginTop: '25px' }}>
                    <Table className={classes.table}>
                        <TblHead />
                        <TableBody>
                            {
                                recordsAfterPagingAndSorting().map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{item.first_name}</TableCell>
                                        <TableCell>{item.last_name}</TableCell>
                                        <TableCell>{item.email}</TableCell>
                                        <TableCell>{item.phone}</TableCell>
                                        <TableCell>{item.city}</TableCell>
                                        <TableCell>{item.dateOfBirth !== null ? format(item.dateOfBirth) : null}</TableCell>

                                        <TableCell >{item.linkedin !== '' ?
                                            <a href={item.linkedin} style={{ marginLeft: '20px' }}><RiIcons.RiShareForwardLine style={{ fontSize: '20px' }} /></a>
                                            : null}</TableCell>

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
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TblPagination />
            </Paper>

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
        </motion.div>

    )
}
