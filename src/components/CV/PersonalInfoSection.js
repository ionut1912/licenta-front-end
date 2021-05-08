import React, { useState } from 'react'
import { Formik } from 'formik';
import * as Yup from "yup";

export default function PersonalInfoSection(props) {

    const [openAditionalInfo, setOpenAditionalInfo] = useState(false);

    const validateSchema = Yup.object().shape({
        first_name: Yup.string()
            .required("This field is required!"),
        last_name: Yup.string()
            .required("This field is required!"),
        email: Yup.string()
            .email("Invalid email!")
            .required("This field is required!"),
        phone: Yup.string()
            .required("This field is required!")
    })

    function handleSubmit(values) {
        props.setValid(true);
        props.changeState(2);
        props.changePersonalInfo(values);

    }

    return (
        <div className="form-cls">

            <Formik
                initialValues={
                    {
                        first_name: '',
                        last_name: '',
                        email: '',
                        phone: '',
                        city: '',
                        nationality: '',
                        address: '',
                        dateOfBirth: '',
                        drivingLicence: '',
                        linkedin: '',
                        personalSite: ''
                    }
                }

                onSubmit={(values) => {
                    handleSubmit(values);
                
                }}

                validationSchema={validateSchema}>

                {props => (
                    <form onSubmit={props.handleSubmit} >

                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="inputfn">First name*</label>
                                <input type="text"
                                    name="first_name"
                                    value={props.first_name}
                                    className="form-control"
                                    id="inputfn"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    placeholder="First name" 
                            
                                    />
                                {props.errors.first_name && props.touched.first_name && <p className="text-danger">{props.errors.first_name}</p>}
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputln">Last name*</label>
                                <input type="text"
                                    name="last_name"
                                    value={props.last_name}
                                    className="form-control"
                                    id="inputln"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    placeholder="Last name" 
                               
                                    />
                                {props.errors.last_name && props.touched.last_name && <p className="text-danger">{props.errors.last_name}</p>}
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="inputEmail">Email address*</label>
                                <input type="email"
                                    name="email"
                                    value={props.email}
                                    className="form-control"
                                    id="inputEmail"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    placeholder="Email" 
                       
                                    />
                                {props.errors.email && props.touched.email && <p className="text-danger">{props.errors.email}</p>}
                            </div>

                            <div className="form-group col-md-6">
                                <label htmlFor="inputPhone">Phone number*</label>
                                <input type="text"
                                    name="phone"
                                    value={props.phone}
                                    className="form-control"
                                    id="inputPhone"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    placeholder="Phone" 
                              
                                    />
                                {props.errors.phone && props.touched.phone && <p className="text-danger">{props.errors.phone}</p>}
                            </div>

                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="inputCity1">City</label>
                                <input type="text"
                                    name="city"
                                    value={props.city}
                                    className="form-control"
                                    id="inputCity1"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputNationality">Nationality</label>
                                <input type="text"
                                    name="nationality"
                                    value={props.nationality}
                                    className="form-control"
                                    id="inputNationality"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur} />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <label htmlFor="inputAddress">Address</label>
                                <input type="text"
                                    name="address"
                                    value={props.address}
                                    className="form-control"
                                    id="inputAddress"
                                    placeholder="1234 Main St"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur} />
                            </div>
                        </div>

                        <div className="additionalInfo" style={{
                            display: openAditionalInfo === false && 'none'
                        }}>

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputDateBirth">Date of birth</label>
                                    <input type="date"
                                        name="dateOfBirth"
                                        value={props.dateOfBirth}
                                        data-date-format="dd-mm-yyyy"
                                        className="form-control"
                                        id="inputDateBirth"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                    />
                                </div>

                                <div className="form-group col-md-6">
                                    <label htmlFor="inputDrivingLicence">Driving licence</label>
                                    <input type="text"
                                        name="drivingLicence"
                                        value={props.drivingLicence}
                                        className="form-control"
                                        id="inputDrivingLicence"
                                        placeholder="B"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                    />
                                </div>

                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputLinkedIn">LinkedIn</label>
                                    <input type="text"
                                        name="linkedin"
                                        value={props.linkedin}
                                        className="form-control"
                                        id="inputLinkedIn"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur} />
                                </div>

                                <div className="form-group col-md-6">
                                    <label htmlFor="inputWebsite">Personal Website</label>
                                    <input type="text"
                                        name="personalSite"
                                        value={props.personalSite}
                                        className="form-control"
                                        id="inputWebsite"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="toggler-additionalInfo">
                            <a href="#/" className="btn-additionalInfo" onClick={() => setOpenAditionalInfo(!openAditionalInfo)}><i className={openAditionalInfo === false ? "fa fa-plus-circle" : "fa fa-minus-circle"} aria-hidden="true"></i> Additional information</a>
                        </div>

                        <hr className="hr" />

                        <div className="btn-next">
                            <button type="submit" name="submit" className="btn btn-primary" >Next  <i className="fa fa-arrow-right" aria-hidden="true"></i></button>
                        </div>
                    </form>
                )}
            </Formik>

        </div>

    )
}

