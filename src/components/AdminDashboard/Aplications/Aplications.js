import React, { useState, useEffect } from 'react'
import { makeStyles, TableHead, TableBody, TableCell, TableRow, Table, TextField, Toolbar } from '@material-ui/core';
import useTable from '../useTable'
import Button from '../Button'
import AddIcon from '@material-ui/icons/Add';
import aplicariiService from '../../../services/aplicareJob.serivce';
import CloseIcon from '@material-ui/icons/Close';
import Notification from '../../Notification'
import ConfirmDialog from '../ConfirmDialog';
import DescriptionIcon from '@material-ui/icons/Description';


const useStyle = makeStyles(theme => ({
    pageContent: {
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: '50px',
        margin: '10px',
        padding: '10px',
        overflowX: 'auto'
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
    th: {
        [theme.breakpoints.up(1447)]: {
            maxWidth: '125px',
            minWidth: '125px',
            overflowX: 'auto',
            padding: '0 !important',
            whiteSpace: 'nowrap',

        }
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
    },
    filterHead: {
        backgroundColor: '#f1f1f1'
    }

}))

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

const filterInputs = [
    { id: 'fullName', label: 'Search by name' },
    { id: 'email', label: 'Search by email' },
    { id: 'phone', label: 'Search by phone' },
    { id: 'numeJob', label: 'Search by job' },
    { id: 'dataAplicare', label: 'Search by aplication date' },
    { id: 'verificat', label: 'Search by status' },
    { id: '', label: '' },
    { id: '', label: '' }
]

function Aplications(props) {
    const classes = useStyle();
    const [records, setRecords] = useState([]);
    const [filterFunction, setFilterFunction] = useState({ fn: items => { return items } })

    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    const {
        TblHead,
        TblPagination,
        recordsAfterPagingAndSortingAplicarii
    } = useTable(records, headCells, filterFunction);


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
                    return items.filter(x => x.telefon.toLowerCase().includes(value.toLowerCase()))
                else if (name === "numeJob")
                    return items.filter(x => x.jobName.toLowerCase().includes(value.toLowerCase()))
                else if (name === "dataAplicare")
                    return items.filter(x => x.dataAplicarii.toLowerCase().includes(value.toLowerCase()))
                else if (name === "verificat")
                    return items.filter(x => x.verificat.toLowerCase().includes(value.toLowerCase()))
            }
        })
    }

    function getData() {
        aplicariiService.getAplicarii().then(
            response =>
                setRecords(response.data)
        )
    }

    useEffect(() => {
        getData();
    }, [])


    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        // userService.deleteUser(id);
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
        <div className={props.sideState === true && window.innerWidth > 960 ? "dash-on dash-content" : "dash-content"} style={{ background: "#d7dcf893" }}>
            <Toolbar>
                <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    className={classes.newBtn}
                    onClick={() => props.setState(7)}
                    text="Add new CV"
                />
            </Toolbar>
            <Table className={classes.table}>
                <TblHead />
                <TableHead className={classes.filterHead}>
                    <TableRow>
                        {
                            filterInputs.map((filterCell, index) => (
                                <TableCell key={index}>
                                    {index === 6 || index === 7 ? null : <TextField
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
            <TblPagination />
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

export default Aplications
