import React from 'react';
import { locations, types, categories } from './JobEnums';
import './Filters.css'

import { makeStyles, Checkbox, InputAdornment, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Search from '@material-ui/icons/Search';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const useStyles = makeStyles(theme => ({
     inputMultiple: {
          '& .MuiChip-root': {
               color: '#fff',
               backgroundColor: '#dc3545'
          },
          '& .MuiChip-deleteIcon': {
               color: '#fff'
          }
     },
     input: {
          '& .MuiInputBase-root': {
               height: '57.5px',
          }
     }
}))

export default function Filters(props) {

     const classes = useStyles();

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

     function onChangeSearch(selectedOption) {

          props.setFilter(prevFilter => {
               return {
                    ...prevFilter,
                    search: selectedOption.target.value
               }
          });
     }

     return (
          <div className="container-fluid">
               <div className="filters form-row">
                    <div className="form-group col-md-6">
                         <label htmlFor="locations">Locations:</label>
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
                    </div>

                    <div className="form-group col-md-6">
                         <label htmlFor="categories">Categories:</label>
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

                    </div>

                    <div className="form-group col-md-6">
                         <label htmlFor="types">Types:</label>
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
                    </div>

                    <div className="form-group col-md-6">
                         <label htmlFor="search">Search:</label>
                         <TextField
                              style={{ width: '100%' }}
                              variant="outlined"
                              id="search"
                              className={classes.input}
                              onChange={onChangeSearch}
                              InputProps={{
                                   startAdornment: (<InputAdornment position="start">
                                        <Search />
                                   </InputAdornment>)
                              }}
                         />
                    </div>
               </div>
          </div>
     )
}

