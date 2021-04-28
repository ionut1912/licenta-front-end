import React, { useState } from 'react'
import {TableHead, TableRow, TableCell, makeStyles, TablePagination, TableSortLabel } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    headText: {
        backgroundColor: '#009879'
    }
}))
export default function useTable(records, headCells, filterFunction) {

    const classes = useStyles();

    const pages = [5, 10, 25];
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(pages[page]);

    const [order, setOrder] = useState();
    const [orderBy, setOrderBy] = useState();

    const TblHead = props => {

        const handleSortRequest = index => {
            const isAsc = orderBy === index && order === "asc";
            setOrder(isAsc ? "desc" : "asc")
            setOrderBy(index);
        }

        return (
            <TableHead className={classes.headText}>
                <TableRow>
                    {
                        headCells.map((headCell, index) => (
                            <TableCell key={index}
                                sortDirection={orderBy === headCell.id ? order : false} >
                                <TableSortLabel
                                    active={orderBy === headCell.id}
                                    direction={orderBy === headCell.id ? order : 'asc'}
                                    onClick={() => { handleSortRequest(headCell.id) }}>
                                    {headCell.label}
                                </TableSortLabel>
                            </TableCell>
                        ))
                    }
                </TableRow>
            </TableHead>)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0);
    }

    const TblPagination = () => (
        <TablePagination
            component="div"
            page={page}
            rowsPerPageOptions={pages}
            rowsPerPage={rowsPerPage}
            count={records.length}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
        />)


    function desc(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    function stableSort(array, cmp) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = cmp(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map(el => el[0]);
    }

    function getSorting(order, orderBy) {
        return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
    }


    const recordsAfterPagingAndSortingUsers = () => {
        return stableSort(filterFunction.fn(records), getSorting(order, orderBy))
            .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
    }

    const recordsAfterPagingAndSortingJobs = () => {
        return stableSort(filterFunction.fn(records), getSorting(order, orderBy))
            .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
    }

    const recordsAfterPagingAndSortingAplicarii = () => {
        return stableSort(filterFunction.fn(records), getSorting(order, orderBy))
            .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
    }

    return {
        TblHead,
        TblPagination,
        recordsAfterPagingAndSortingUsers,
        recordsAfterPagingAndSortingJobs,
        recordsAfterPagingAndSortingAplicarii
    }
}


