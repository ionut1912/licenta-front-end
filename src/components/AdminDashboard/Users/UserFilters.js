import React, { useState } from 'react'
import Search from '@material-ui/icons/Search';
import { makeStyles, TextField, Toolbar, InputAdornment, Tabs, Tab, } from '@material-ui/core';


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

        },
        '& .MuiOutlinedInput-root': {
            borderRadius: '20px',

        }
    },
    toolbar: {
        margin: '30px 0px 30px 0',
        display: 'flex',
        flexWrap: 'wrap',
        '& .MuiTextField-root': {
            marginRight: '30px',
            marginTop: '10px',
            flex: '30%%',
            maxWidth: '30%',
            '&:last-child': {
                marginRight: '0px',
            },
            [theme.breakpoints.down(768)]: {
                flex: '28%',
                maxWidth: '28%',
            },
            [theme.breakpoints.down(620)]: {
                flex: '100%',
                maxWidth: '100%',
                margin: '10px 0 10px 0',
            }
        }
    }
}))


export default function UserFilters() {

    const classes = useStyle();

    const [currentTab, setCurrentTab] = useState(0);

    const handleChange = (event, newValue) => {
        setCurrentTab(newValue);
    };

    return (
        <div className={classes.filters}>
            <Tabs value={currentTab} indicatorColor="primary" onChange={handleChange} textColor="primary">
                <Tab label="All user" />
                <Tab label="Admin" />
                <Tab label="Normal user" />
            </Tabs>
            <hr />

            <Toolbar className={classes.toolbar}>
                <TextField
                    variant="outlined"
                    label="Search by name"
                    InputProps={{
                        startAdornment: (<InputAdornment position="start">
                            <Search />
                        </InputAdornment>)
                    }}
                />
                <TextField
                    variant="outlined"
                    label="Search by email"
                    InputProps={{
                        startAdornment: (<InputAdornment position="end">
                            <Search />
                        </InputAdornment>)
                    }}
                />
                <TextField
                    variant="outlined"
                    label="Search by location"
                    InputProps={{
                        startAdornment: (<InputAdornment position="start">
                            <Search />
                        </InputAdornment>)
                    }}
                />
            </Toolbar>
        </div>
    )
}

