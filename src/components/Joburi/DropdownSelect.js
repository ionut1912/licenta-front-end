import React from 'react';
import Select, { components } from 'react-select';
import './DropdownSelect.css'


export default function DropdownSelect(props) {

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
               color: state.isSelected ? '#fff' : state.isFocused ? '#000' : null,
               backgroundColor: state.isSelected ? '#fc1930d5' : state.isFocused ? '#f7b0b0b2' : null,
               ':active': {
                    backgroundColor: state.isSelected ? null : '#f7b0b0'
               }
          }),
     }

     return (
          <div className="body-select" style={{ display: 'flex' }}>
               <Select
                    onChange={handleChange}
                    options={options}
                    styles={customStyles}
                    placeholder='Select location to see available jobs'
                    className="select"
                    components={{
                         Menu: (props) => <components.Menu {...props} className="menu" />
                    }}
               />
               <Select
                    onChange={handleChange}
                    options={options}
                    styles={customStyles}
                    placeholder='Select location to see available jobs'
                    className="select"
                    components={{
                         Menu: (props) => <components.Menu {...props} className="menu" />
                    }}
               />
               <Select
                    onChange={handleChange}
                    options={options}
                    styles={customStyles}
                    placeholder='Select location to see available jobs'
                    className="select"
                    components={{
                         Menu: (props) => <components.Menu {...props} className="menu" />
                    }}
               />
          </div>
     )
}

