import React, { useState, useEffect } from 'react'
import { makeStyles, TableBody, TableCell, Table, TableContainer, TableRow, Breadcrumbs, Typography, Paper } from '@material-ui/core';
import useTable from '../useTable'
import Button from '../Button'
import aplicariiService from '../../../services/aplicareJob.serivce';
import CloseIcon from '@material-ui/icons/Close';
import Notification from '../../Notification'
import ConfirmDialog from '../ConfirmDialog';
import DescriptionIcon from '@material-ui/icons/Description';
import NavigateNextIcon from "@material-ui/icons/NavigateNext"
import AplicationFilters from './AplicationFilters';
import AplicationStatistics from './AplicationStatistics';




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

function format(date) {
    return new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        //time
    }).format(new Date(date));
}

const headCells = [
    { id: 'full_name', label: 'Full name' },
    { id: 'email', label: 'Email' },
    { id: 'telefon', label: 'Phone' },
    { id: 'jobName', label: 'Name job' },
    { id: 'dataAplicarii', label: 'Data aplicarii' },
    { id: 'verificat', label: 'Verificat' },
    { id: 'cv', label: 'Download CV', disableSorting: true },
    { id: 'actions', label: 'Actions', disableSorting: true }

]

export default function Aplications(props) {

    const classes = useStyle();

    const [records, setRecords] = useState([]);
    const [filterFunction, setFilterFunction] = useState({ fn: items => { return items } })

    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    const { TblHead, TblPagination, recordsAfterPagingAndSortingAplicarii } = useTable(records, headCells, filterFunction);

    function getData() {
        aplicariiService.getAplicarii().then(
            response =>
                setRecords(response.data)
        )
    }

    useEffect(() => {
        getData();

        return function cleanup() {
            setRecords([]);
        }
    }, [])


    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })

        getData();

        setNotify({
            isOpen: true,
            message: 'Deleted Successfull!',
            type: 'error'
        })
    }

    function downloadFile(idForUpdateVerificat, numeAplicant, base64String) {
        var indexForFileType = base64String.indexOf(",");
        var fileType = base64String[indexForFileType + 1];
        var a = document.createElement("a");
        a.href = base64String;
        if (fileType === "U") {
            a.download = numeAplicant + "_CV.docx";
        } else if (fileType === "0") {
            a.download = numeAplicant + "_CV.doc";
        } else if (fileType === "J") {
            a.download = numeAplicant + "_CV.pdf";
        }
        a.click();

        aplicariiService.updateVerificat(idForUpdateVerificat);
    }


    return (
        <div className={props.sideState === true && window.innerWidth > 960 ? "dash-on dash-content" : "dash-content"} >
            <h1 style={{ padding: "10px 0 5px 0px" }} className="title-section">User list</h1>

            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
                <a style={{ color: '#1c2237b0' }}>Dasboard</a>
                <a className="text-primary">Users</a>
            </Breadcrumbs>

            <AplicationStatistics />

            <Paper className={classes.papper}>

                <AplicationFilters />

                <TableContainer style={{ marginTop: '25px' }}>
                    <Table className={classes.table}>

                        <TableBody >
                            {
                                recordsAfterPagingAndSortingAplicarii().map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{item.full_name}</TableCell>
                                        <TableCell className={classes.th}>{item.email}</TableCell>
                                        <TableCell>{item.telefon}</TableCell>
                                        <TableCell>{item.jobName}</TableCell>
                                        <TableCell className={classes.th}>{item.dataAplicarii}</TableCell>
                                        <TableCell><p className={item.verificat === true ? "card-text state-green" : "card-text state-red"}><i className="fas fa-circle" style={{ marginRight: '10px' }}></i>{item.verificat === true ? "Verificat" : "Neverificat"}</p></TableCell>
                                        <TableCell>
                                            <div className={classes.action}>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    text={<DescriptionIcon fontSize="small" />}
                                                    onClick={() => { downloadFile(item.id, item.full_name, item.cv); }}
                                                />
                                            </div>
                                        </TableCell>

                                        <TableCell  >
                                            <div className={classes.action}>
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
                </TableContainer>
                <TblPagination />
            </Paper>

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


