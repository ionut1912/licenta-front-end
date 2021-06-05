import React from 'react'
import Search from '@material-ui/icons/Search';
import { makeStyles, TextField, Toolbar, InputAdornment } from '@material-ui/core';


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

export default function CvFilters() {
    const classes = useStyle();
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
                    label="Search by city"
                    InputProps={{
                        startAdornment: (<InputAdornment position="start">
                            <Search />
                        </InputAdornment>)
                    }}
                />
                <TextField
                    variant="outlined"
                    label="Search by phone"
                    InputProps={{
                        startAdornment: (<InputAdornment position="start">
                            <Search />
                        </InputAdornment>)
                    }}
                />
                <TextField
                    variant="outlined"
                    label="Search by skills"
                    InputProps={{
                        startAdornment: (<InputAdornment position="start">
                            <Search />
                        </InputAdornment>)
                    }}
                />

                <TextField
                    variant="outlined"
                    label="Search by languages"
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


