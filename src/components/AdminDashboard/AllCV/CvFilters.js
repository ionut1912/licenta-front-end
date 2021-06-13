import React, { useState, useEffect } from 'react'
import Search from '@material-ui/icons/Search';
import { makeStyles, Checkbox, TextField, Toolbar, InputAdornment } from '@material-ui/core';

import Autocomplete from "@material-ui/lab/Autocomplete";

import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


const useStyle = makeStyles(theme => ({
    filters: {
        '& .MuiOutlinedInput-root': {
            borderRadius: '20px',

        }
    },
    toolbar: {
        margin: '0px 0px 30px 0',
        display: 'flex',
        flexWrap: 'wrap',
        '& .MuiFormControl-root': {
            marginRight: '30px',
            marginTop: '20px',
            flex: '22%',
            maxWidth: '22%',
            '&:last-child': {
                marginRight: '0px',
            },
            [theme.breakpoints.down(1357)]: {
                marginRight: '20px',
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

export default function CvFilters(props) {
    const classes = useStyle();

    const [enums, setEnums] = useState({
        cities: [],
        skills: [],
        languages: []
    })

    function handleChangeName(selectedOption) {

        props.setFilter(prevFilter => {
            return {
                ...prevFilter,
                name: selectedOption.target.value
            }
        });
    }

    function handleChangeEmail(selectedOption) {

        props.setFilter(prevFilter => {
            return {
                ...prevFilter,
                email: selectedOption.target.value
            }
        });
    }

    function handleChangePhone(selectedOption) {

        props.setFilter(prevFilter => {
            return {
                ...prevFilter,
                phone: selectedOption.target.value
            }
        });
    }


    const handleChangeCity = ((event, selectedOption) => {

        props.setFilter(prevFilter => {
            return {
                ...prevFilter,
                city: selectedOption
            }
        });
    });


    const handleChangeSkill = ((event, selectedOption) => {

        props.setFilter(prevFilter => {
            return {
                ...prevFilter,
                skill: selectedOption
            }
        });
    });


    const handleChangeLanguage = ((event, selectedOption) => {

        props.setFilter(prevFilter => {
            return {
                ...prevFilter,
                language: selectedOption
            }
        });
    });


    useEffect(() => {
        const cities = [];
        const skills = [];
        const languages = [];


        props.records.map((item) => {

            item.skills.map((skill1) => {
                if (skills.indexOf(skill1.skill) === -1)
                    return skills.push(skill1.skill)
                else return null
            })

            item.languages.map((language1) => {
                if (languages.indexOf(language1.language_name) === -1)
                    return languages.push(language1.language_name)
                else return null
            })

            if (cities.indexOf(item.city) === -1)
                return cities.push(item.city)
            else return null
        })

        setEnums({
            cities: cities,
            skills: skills,
            languages: languages
        })

    }, [setEnums, props.records])

    return (
        <div className={classes.filters}>
            <Toolbar className={classes.toolbar}>
                <TextField
                    variant="outlined"
                    label="Search by name"
                    InputProps={{
                        startAdornment: (<InputAdornment position="start">
                            <Search />
                        </InputAdornment>)
                    }}
                    onChange={handleChangeName}
                />
                <TextField
                    variant="outlined"
                    label="Search by email"
                    InputProps={{
                        startAdornment: (<InputAdornment position="end">
                            <Search />
                        </InputAdornment>)
                    }}
                    onChange={handleChangeEmail}
                />
                <TextField
                    variant="outlined"
                    label="Search by phone"
                    InputProps={{
                        startAdornment: (<InputAdornment position="start">
                            <Search />
                        </InputAdornment>)
                    }}
                    onChange={handleChangePhone}
                />
                <Autocomplete
                    multiple
                    limitTags={2}
                    id="cities"
                    className={classes.inputMultiple}
                    value={props.filter.category}
                    onChange={handleChangeCity}
                    options={enums.cities}
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
                    id="skills"
                    className={classes.inputMultiple}
                    value={props.filter.category}
                    onChange={handleChangeSkill}
                    options={enums.skills}
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
                    id="languages"
                    className={classes.inputMultiple}
                    value={props.filter.category}
                    onChange={handleChangeLanguage}
                    options={enums.languages}
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
            </Toolbar>
        </div>
    )
}


