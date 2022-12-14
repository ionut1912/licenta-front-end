import React, { useState } from 'react'
import UserService from '../../services/auth.service';
import { Formik } from 'formik';
import * as Yup from "yup";

export default function PersonalInfoSection(props) {

    const [openAditionalInfo, setOpenAditionalInfo] = useState(false);
    const [buttonFormPressed, setButtonFormPressed] = useState(false);

    const addCv = props.addCv;

    const currentUser = UserService.getCurrentUser();
    const firstNameEnd = currentUser !== null && currentUser.full_name.indexOf(" ");
    const fullNameLength = currentUser !== null && currentUser.full_name.length;

    const validateSchema = Yup.object().shape({
        first_name: Yup.string()
            .max(45, "First name is to long!")
            .matches(/^[a-zA-Z ,.'-]+$/, "First name can't contains number or symbols")
            .required("This field is required!"),
        last_name: Yup.string()
            .max(60, "Last name is to long!")
            .matches(/^[a-zA-Z ,.'-]+$/, "Last name can't contains number or symbols")
            .required("This field is required!"),
        email: Yup.string()
            .email("Invalid email!")
            .max(60, "Email is to long!")
            .required("This field is required!"),
        phone: Yup.string()
            .matches(/^(\+4|)?(07[0-8]{1}[0-9]{1}|02[0-9]{2}|03[0-9]{2}){1}?(\s|\.|-)?([0-9]{3}(\s|\.|-|)){2}$/, 'Invalid phone number')
            .required("This field is required!"),
        city: Yup.string()
            .max(45, "City is to long!")
            .matches(/^[a-zA-Z ,.'-]+$/, "City can't contains number or symbols"),
        nationality: Yup.string()
            .max(45, "Nationality is to long!")
            .matches(/^[a-zA-Z ,.'-]+$/, "Nationality can't contains number or symbols"),
        address: Yup.string()
            .max(250, "Address is to long!"),
        drivingLicence: Yup.string()
            .max(150, "Your input is to long!"),
        dateOfBirth: Yup.date()
            .max(new Date(), "Date of birth can't be in the future"),
        linkedin: Yup.string()
            .max(500, "Your input is to long!"),
        personalSite: Yup.string()
            .max(500, "Your input is to long!"),

    })

    const [baseImage, setBaseImage] = useState("");

    const uploadImage = async (e) => {
        const file = e.target.files[0];
        if (file !== undefined) {
            const base64 = await convertBase64(file);
            setBaseImage(base64);
        }
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            //citim continutul fisierului
            fileReader.readAsDataURL(file);

            //returnam rezultatul(continutul codificat in baza 64)
            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    function handleSubmit(values) {
        if (baseImage !== "") {
            values.img_cv = baseImage;
        } else if (values.img !== null) {
            values.img_cv = values.img;
        } else {
            values.img_cv = '';
        }

        if (buttonFormPressed === true) {
            props.changeState(2);
            setButtonFormPressed(false);
        } else {
            props.changeState(props.nextStateForm)
        }

        if (addCv === true)
            props.setCv(prevInfo => {
                return {
                    ...prevInfo,
                    first_name: values.first_name,
                    last_name: values.last_name,
                    email: values.email,
                    phone: values.phone,
                    city: values.city,
                    nationality: values.nationality,
                    address: values.address,
                    dateOfBirth: values.dateOfBirth,
                    drivingLicence: values.drivingLicence,
                    linkedin: values.linkedin,
                    personalSite: values.personalSite
                }
            });
        else
            props.setCv(prevInfo => {
                return {
                    ...prevInfo,
                    img_cv: values.img_cv,
                    first_name: values.first_name,
                    last_name: values.last_name,
                    email: values.email,
                    phone: values.phone,
                    city: values.city,
                    nationality: values.nationality,
                    address: values.address,
                    dateOfBirth: values.dateOfBirth,
                    drivingLicence: values.drivingLicence,
                    linkedin: values.linkedin,
                    personalSite: values.personalSite
                }
            });
    }

    return (
        <div className="form-cls">
            <Formik
                enableReinitialize={true}
                initialValues={
                    currentUser === null ?
                        {
                            img: null,
                            first_name: props.cv.first_name,
                            last_name: props.cv.last_name,
                            email: props.cv.email,
                            phone: props.cv.phone,
                            city: props.cv.city,
                            nationality: props.cv.nationality,
                            address: props.cv.address,
                            dateOfBirth: props.cv.dateOfBirth,
                            drivingLicence: props.cv.drivingLicence,
                            linkedin: props.cv.linkedin,
                            personalSite: props.cv.personalSite
                        }
                        :
                        addCv === true ? {
                            first_name: props.cv.first_name,
                            last_name: props.cv.last_name,
                            email: props.cv.email,
                            phone: props.cv.phone,
                            city: props.cv.city,
                            nationality: props.cv.nationality,
                            address: props.cv.address,
                            dateOfBirth: props.cv.dateOfBirth,
                            drivingLicence: props.cv.drivingLicence,
                            linkedin: props.cv.linkedin,
                            personalSite: props.cv.personalSite
                        } :
                            {
                                img: currentUser.img,
                                first_name: firstNameEnd === -1 ? currentUser.full_name : currentUser.full_name.substring(0, firstNameEnd),
                                last_name: firstNameEnd === -1 ? '' : currentUser.full_name.substring(firstNameEnd + 1, fullNameLength),
                                email: currentUser.email,
                                phone: currentUser.phone,
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
                innerRef={props.formRef}
                validationSchema={validateSchema}>
                {props => (
                    <form onSubmit={props.handleSubmit} >
                        <div className={addCv === true ? null : "row-img-cv"} >
                            {addCv === true ? null :
                                <div className="left-img" style={baseImage === '' && props.values.img === null ? { textAlign: 'center', border: '3px dashed #1c2237c0' } : { padding: '0px' }}>
                                    <div className="image-upload">
                                        <label htmlFor="file-input" >
                                            <img src={baseImage !== "" ? baseImage : props.values.img} className={baseImage !== '' || props.values.img !== null ? "img-cv" : null} alt="" />
                                            {baseImage === '' && props.values.img === null && <div>
                                                <i className="fas fa-camera addPhoto" style={{ fontSize: '40px' }} />
                                                <br />
                                                <span className="addPhoto">Add photo</span>
                                            </div>}
                                        </label>
                                        <input type="file" id="file-input" onChange={uploadImage} className="input-file input-img" style={{ alignSelf: 'center' }} accept=".png,.jpg,.jpeg" />
                                    </div>

                                </div>
                            }
                            <div className="form-row">
                                <div className={addCv === true ? "form-group col-md-6" : "form-group col-md-12"} >
                                    <label htmlFor="inputfn" className={addCv === false ? "group-margin-left" : null}>First name*</label>
                                    <input type="text"
                                        name="first_name"
                                        value={props.values.first_name}
                                        className={addCv === false ? (props.errors.first_name && props.touched.first_name ? "form-control is-invalid group-margin-left" : "form-control group-margin-left")
                                            : (
                                                props.errors.first_name && props.touched.first_name ? "form-control is-invalid" : "form-control"
                                            )}
                                        id="inputfn"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        placeholder="First name"
                                    />
                                    <div className="invalid-feedback">
                                        {props.errors.first_name && props.touched.first_name && <p >{props.errors.first_name}</p>}
                                    </div>
                                </div>

                                <div className={addCv === true ? "form-group col-md-6" : "form-group col-md-12"}>
                                    <label htmlFor="inputln" className={addCv === false ? "group-margin-left" : null}>Last name*</label>
                                    <input type="text"
                                        name="last_name"
                                        value={props.values.last_name}
                                        className={addCv === false ? (props.errors.first_name && props.touched.first_name ? "form-control is-invalid group-margin-left" : "form-control group-margin-left")
                                            : (
                                                props.errors.first_name && props.touched.first_name ? "form-control is-invalid" : "form-control"
                                            )}
                                        id="inputln"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        placeholder="Last name"

                                    />
                                    <div className="invalid-feedback">
                                        {props.errors.last_name && props.touched.last_name && <p >{props.errors.last_name}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="inputEmail">Email address*</label>
                                <input type="email"
                                    name="email"
                                    value={props.values.email}
                                    className={props.errors.email && props.touched.email ? "form-control is-invalid" : "form-control"}
                                    id="inputEmail"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    placeholder="Email"

                                />
                                <div className="invalid-feedback">
                                    {props.errors.email && props.touched.email && <p>{props.errors.email}</p>}
                                </div>
                            </div>

                            <div className="form-group col-md-6">
                                <label htmlFor="inputPhone">Phone number*</label>
                                <input type="text"
                                    name="phone"
                                    value={props.values.phone}
                                    className={props.errors.phone && props.touched.phone ? "form-control is-invalid" : "form-control"}
                                    id="inputPhone"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    placeholder="Phone"

                                />
                                <div className="invalid-feedback">
                                    {props.errors.phone && props.touched.phone && <p>{props.errors.phone}</p>}
                                </div>
                            </div>

                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="inputCity1">City</label>
                                <input type="text"
                                    name="city"
                                    value={props.values.city}
                                    className={props.errors.city && props.touched.city ? "form-control is-invalid" : "form-control"}
                                    id="inputCity1"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                />
                                <div className="invalid-feedback">
                                    {props.errors.city && props.touched.city && <p>{props.errors.city}</p>}
                                </div>
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputNationality">Nationality</label>
                                <input type="text"
                                    name="nationality"
                                    value={props.values.nationality}
                                    className={props.errors.nationality && props.touched.nationality ? "form-control is-invalid" : "form-control"}
                                    id="inputNationality"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur} />
                                <div className="invalid-feedback">
                                    {props.errors.nationality && props.touched.nationality && <p>{props.errors.nationality}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <label htmlFor="inputAddress">Address</label>
                                <input type="text"
                                    name="address"
                                    value={props.values.address}
                                    className={props.errors.address && props.touched.address ? "form-control is-invalid" : "form-control"}
                                    id="inputAddress"
                                    placeholder="1234 Main St"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur} />
                                <div className="invalid-feedback">
                                    {props.errors.address && props.touched.address && <p >{props.errors.address}</p>}
                                </div>
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
                                        value={props.values.dateOfBirth}
                                        data-date-format="dd-mm-yyyy"
                                        className={props.errors.dateOfBirth && props.touched.dateOfBirth ? "form-control is-invalid" : "form-control"}
                                        id="inputDateBirth"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                    />
                                    <div className="invalid-feedback">
                                        {props.errors.dateOfBirth && props.touched.dateOfBirth && <p >{props.errors.dateOfBirth}</p>}
                                    </div>
                                </div>

                                <div className="form-group col-md-6">
                                    <label htmlFor="inputDrivingLicence">Driving licence</label>
                                    <input type="text"
                                        name="drivingLicence"
                                        value={props.values.drivingLicence}
                                        className={props.errors.drivingLicence && props.touched.drivingLicence ? "form-control is-invalid" : "form-control"}
                                        id="inputDrivingLicence"
                                        placeholder="B"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                    />
                                    <div className="invalid-feedback">
                                        {props.errors.drivingLicence && props.touched.drivingLicence && <p >{props.errors.drivingLicence}</p>}
                                    </div>
                                </div>

                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputLinkedIn">LinkedIn</label>
                                    <input type="text"
                                        name="linkedin"
                                        value={props.values.linkedin}
                                        className={props.errors.linkedin && props.touched.linkedin ? "form-control is-invalid" : "form-control"}
                                        id="inputLinkedIn"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur} />
                                    <div className="invalid-feedback">
                                        {props.errors.linkedin && props.touched.linkedin && <p >{props.errors.linkedin}</p>}
                                    </div>
                                </div>

                                <div className="form-group col-md-6">
                                    <label htmlFor="inputWebsite">Personal Website</label>
                                    <input type="text"
                                        name="personalSite"
                                        value={props.values.personalSite}
                                        className={props.errors.personalSite && props.touched.personalSite ? "form-control is-invalid" : "form-control"}
                                        id="inputWebsite"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                    />
                                    <div className="invalid-feedback">
                                        {props.errors.personalSite && props.touched.personalSite && <p >{props.errors.personalSite}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="toggler-additionalInfo">
                            <span className="btn-additionalInfo" onClick={() => setOpenAditionalInfo(!openAditionalInfo)}><i className={openAditionalInfo === false ? "fa fa-plus-circle" : "fa fa-minus-circle"} aria-hidden="true"></i> Additional information</span>
                        </div>

                        <hr className="hr" />

                        <div className="btn-next">
                            <button type="submit" name="submit" className="btn btn-primary" onClick={() => setButtonFormPressed(true)}>Next  <i className="fa fa-arrow-right" aria-hidden="true"></i></button>
                        </div>
                    </form>
                )}
            </Formik>
        </div>

    )
}

