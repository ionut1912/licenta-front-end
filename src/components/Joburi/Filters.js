import React from 'react';
import { locations, types, categories } from './JobEnums';
import './Filters.css'

export default function Filters(props) {

     const handleChangeLocations = (selectedOption) => {

          var value = selectedOption.target.value;
          props.setFilter(prevFilter => {
               return {
                    ...prevFilter,
                    location: value
               }
          });
     };

     const handleChangeCategories = (selectedOption) => {
          var value = selectedOption.target.value;

          props.setFilter(prevFilter => {
               return {
                    ...prevFilter,
                    category: value
               }
          });
     };

     const handleChangeTypes = (selectedOption) => {
          var value = selectedOption.target.value;

          props.setFilter(prevFilter => {
               return {
                    ...prevFilter,
                    type: value
               }
          });
     };

     function onChangeSearch(selectedOption) {

          var value = selectedOption.target.value;

          props.setFilter(prevFilter => {
               return {
                    ...prevFilter,
                    search: value
               }
          });
     }

     // const resetFilters = () => {
     //      props.setFilter({
     //           location: "All",
     //           category: "All",
     //           type: "All",
     //           search: "",
     //      })
     // }


     return (
          <div className="container-fluid">
               <div className="filters form-row">
                    <div className="filter form-group col-md-3">
                         <label htmlFor="location">Locations:</label>
                         <select className="custom-select" id="location" onChange={handleChangeLocations}>
                              {locations.map((item, index) => {
                                   return (
                                        <option key={index} value={item.value}>{item.label}</option>
                                   )
                              })}
                         </select>
                    </div>

                    <div className="form-group col-md-3">
                         <label htmlFor="category">Categories:</label>
                         <select className="custom-select" id="category" onChange={handleChangeCategories}>
                              {categories.map((item, index) => {
                                   return (
                                        <option key={index} value={item.value}>{item.label}</option>
                                   )
                              })}
                         </select>

                    </div>

                    <div className="form-group col-md-3" >
                         <label htmlFor="type">Types:</label>
                         <select className="custom-select" id="type" onChange={handleChangeTypes}>
                              {types.map((item, index) => {
                                   return (
                                        <option key={index} value={item.value}>{item.label}</option>
                                   )
                              })}
                         </select>
                    </div>

                    <div className="form-group col-md-3">
                         <label htmlFor="search">Search:</label>
                         <div className="input-group">
                              <div className="input-group-prepend">
                                   <span className="input-group-text"><i className="fas fa-search"></i></span>
                              </div>
                              <input type="text" className="form-control" id="search" onChange={onChangeSearch} placeholder="Search job by title" />
                         </div>
                    </div>
                    {/* <button className="btn btn-primary" onClick={() => resetFilters()}> Reset filters</button> */}
               </div>
          </div>
     )
}

