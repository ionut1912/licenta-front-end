import React from 'react';
import Select from 'react-select';
import './DropdownSelect.css'


function DropdownSelect(props) {

     const handleChange = selectedOption => {
          props.setFilter(selectedOption.value);
     };

     const options = [
          { value: 'All', label: 'All' },
          { value: 'Bucuresti,Romania', label: 'Bucuresti,Romania' },
          { value: 'Galati,Romania', label: 'Galati,Romania' },
          { value: 'Chisinau,Republica Moldova', label: 'Chisinau,Republica Moldova' },
          { value: 'Durres,Albania', label: 'Durres,Albania' },
          { value: 'Limassol,Cipru', label: 'Limassol,Cipru' },
     ];


     const customStyles = {
          option: (provided, state) => ({
               ...provided,
               color: state.isSelected ? 'blue' : 'dark',
               backgroundColor: state.isSelected ? 'yellow' : 'white'
          }),
     }


     return (
          <div className="body-select">
               <h2 className="info">Select location to see available jobs</h2>
               <Select
                    onChange={handleChange}
                    options={options}
                    styles={customStyles}
                    placeholder={options[0].label}
                    className="select"
               />
          </div>
     )
}

export default DropdownSelect
