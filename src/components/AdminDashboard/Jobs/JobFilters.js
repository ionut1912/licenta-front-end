import React, { useState } from 'react'
import Search from '@material-ui/icons/Search';
import { makeStyles, Checkbox, TextField, Toolbar, InputAdornment, Tabs, Tab } from '@material-ui/core';

import { locations, types, categories } from '../../Joburi/JobEnums'

import Autocomplete from "@material-ui/lab/Autocomplete";

import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

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
                fontSize: '12px'
            },
        }
    },
    toolbar: {
        margin: '30px 0px 20px 0',
        display: 'flex',
        flexWrap: 'wrap',
        '& .field.MuiFormControl-root': {
            marginRight: '30px',
            marginTop: '10px',
            flex: '22%',
            maxWidth: '22%',
            [theme.breakpoints.down(1220)]: {
                marginRight: '15px',
                flex: '30%',
                maxWidth: '30%',
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
        },
        '& .MuiAutocomplete-root': {
            marginRight: '30px',
            marginTop: '10px',
            flex: '22%',
            maxWidth: '22%',
            '&:last-child': {
                marginRight: '0px',
            },
            [theme.breakpoints.down(1220)]: {
                marginRight: '15px',
                flex: '30%',
                maxWidth: '30%',
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


export default function JobFilters(props) {
    const classes = useStyle();

    const [currentTab, setCurrentTab] = useState(0);

    const handleChangeTab = (event, newValue) => {
        setCurrentTab(newValue);
        props.setFilter(prevFilter => {
            return {
                ...prevFilter,
                tab: newValue
            }
        });
    };

    function handleChangeName(selectedOption) {

        props.setFilter(prevFilter => {
            return {
                ...prevFilter,
                name: selectedOption.target.value
            }
        });
    }


    const handleChangeLocations = ((event, selectedOption) => {

        props.setFilter(prevFilter => {
            return {
                ...prevFilter,
                location: selectedOption
            }
        });
    });

    const handleChangeCategories = ((event, selectedOption) => {

        props.setFilter(prevFilter => {
            return {
                ...prevFilter,
                category: selectedOption
            }
        });
    });

    const handleChangeTypes = ((event, selectedOption) => {

        props.setFilter(prevFilter => {
            return {
                ...prevFilter,
                type: selectedOption
            }
        });
    });


    return (
        <div className={classes.filters}>
            <Tabs value={currentTab} indicatorColor="primary" onChange={handleChangeTab} textColor="primary">
                <Tab label="All jobs" />
                <Tab label="Active jobs" />
                <Tab label="Inactive jobs" />
            </Tabs>
            <hr />

            <Toolbar className={classes.toolbar}>
                <TextField
                    variant="outlined"
                    label="Search by name"
                    className="field"
                    InputProps={{
                        startAdornment: (<InputAdornment position="start">
                            <Search />
                        </InputAdornment>)
                    }}
                    onChange={handleChangeName}
                />
                <Autocomplete
                    multiple
                    limitTags={2}
                    value={props.filter.location}
                    id="locations"
                    className={classes.inputMultiple}
                    onChange={handleChangeLocations}
                    options={locations}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option}
                    renderOption={(option, { selected }) => (
                        <React.Fragment>
                            <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                checked={selected}
                            />
                            {option}
                        </React.Fragment>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"

                        />
                    )}
                />


                <Autocomplete
                    multiple
                    limitTags={2}
                    id="categories"
                    className={classes.inputMultiple}
                    value={props.filter.category}
                    onChange={handleChangeCategories}
                    options={categories}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option}
                    renderOption={(option, { selected }) => (
                        <React.Fragment>
                            <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                checked={selected}
                            />
                            {option}
                        </React.Fragment>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"

                        />
                    )}
                />




                <Autocomplete
                    multiple
                    limitTags={2}
                    id="types"
                    className={classes.inputMultiple}
                    value={props.filter.type}
                    onChange={handleChangeTypes}
                    options={types}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option === "FULL_TIME" ? "full-time" : "part-time"}
                    renderOption={(option, { selected }) => (
                        <React.Fragment>
                            <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                checked={selected}
                            />
                            {option === "FULL_TIME" ? "full-time" : "part-time"}
                        </React.Fragment>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"

                        />
                    )}
                />

            </Toolbar>
        </div>
    )
}
