import React, { useState } from 'react'
import Search from '@material-ui/icons/Search';
import { makeStyles, TextField, MenuItem, FormControl, InputLabel, Select, Toolbar, InputAdornment, Tabs, Tab, } from '@material-ui/core';

const useStyle = makeStyles(theme => ({
    filters: {
        '& hr': {
            margin: '-2px 0 0 0 ',
            borderTop: '2px solid rgba(0, 0, 0, 0.2)'
        },
        '& .MuiTab-root': {
            '&:first-child': {
                borderTopLeftRadius: '16px'
            },
            '&:focus': {
                border: 'none',
                outline: 'none'
            },
            [theme.breakpoints.down(400)]: {
                fontSize:'12px'
            },
        },
        '& .roundField .MuiOutlinedInput-root': {
            borderRadius: '20px',

        }
    },
    toolbar: {
        margin: '30px 0px 20px 0',
        display: 'flex',
        flexWrap: 'wrap',
        '& .MuiFormControl-root': {
            marginRight: '30px',
            marginTop: '10px',
            flex: '22%',
            maxWidth: '22%',
            '&:last-child': {
                marginRight: '0px',
            },
            [theme.breakpoints.down(1200)]: {
                marginRight: '15px',
                flex: '21%',
                maxWidth: '21%',
            },
            [theme.breakpoints.down(840)]: {
                marginRight: '30px',
                marginTop: '20px',
                flex: '40%',
                maxWidth: '40%',
            },
            [theme.breakpoints.down(620)]: {
                flex: '100%',
                maxWidth: '100%',
                margin: '10px 0 10px 0',
            }
        }
    }
}))


export default function JobFilters() {
    const classes = useStyle();

    const [currentTab, setCurrentTab] = useState(0);

    const handleChange = (event, newValue) => {
        setCurrentTab(newValue);
    };

    return (
        <div className={classes.filters}>
            <Tabs value={currentTab} indicatorColor="primary" onChange={handleChange} textColor="primary">
                <Tab label="All jobs" />
                <Tab label="Active jobs" />
                <Tab label="Unactive jobs" />
            </Tabs>
            <hr />

            <Toolbar className={classes.toolbar}>
                <TextField
                    variant="outlined"
                    label="Search by name"
                    className="roundField"
                    InputProps={{
                        startAdornment: (<InputAdornment position="start">
                            <Search />
                        </InputAdornment>)
                    }}
                />
                <FormControl variant="outlined">
                    <InputLabel>Search by category</InputLabel>
                    <Select
                        name="category"
                        label="Search by category"
                        value={"All"}>
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="Development">Development</MenuItem>
                        <MenuItem value="Architect">Architect</MenuItem>
                        <MenuItem value="Front-end">Front-end</MenuItem>
                    </Select>
                </FormControl>

                <FormControl variant="outlined">
                    <InputLabel>Search by type</InputLabel>
                    <Select
                        name="type"
                        label="Search by type"
                        value={"All"}>
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="Development">Development</MenuItem>
                        <MenuItem value="Architect">Architect</MenuItem>
                        <MenuItem value="Front-end">Front-end</MenuItem>
                    </Select>
                </FormControl>

                <FormControl variant="outlined">
                    <InputLabel>Search by location</InputLabel>
                    <Select
                        name="location"
                        label="Search by location"
                        value={"All"}>
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="Development">Development</MenuItem>
                        <MenuItem value="Architect">Architect</MenuItem>
                        <MenuItem value="Front-end">Front-end</MenuItem>
                    </Select>
                </FormControl>
            </Toolbar>
        </div>
    )
}
