import React, { useState } from 'react'
import * as IoIcons from 'react-icons/io';
import { Formik } from 'formik';
import * as Yup from "yup";
import UserService from '../../services/user.service';
import AuthService from '../../services/auth.service'
import "./UserProfile.css"

function UserProfile(props) {

    const [edit, setEdit] = useState(false);
    const [fileChoosen, setFileChosen] = useState('No file choosen');

    const currentUser = AuthService.getCurrentUser();

    const validateSchema = Yup.object().shape({
        full_name: Yup.string()
            .required("This field is required!"),
        email: Yup.string()
            .email("Invalid email!")
            .required("This field is required!"),
        phone: Yup.string()
            .matches(/^[0-9]{10}$/, 'Must be exactyle 10 digits')
            .required("This field is required!"),
    })

    function handleSubmit(values) {

        if (baseImage !== "") {
            values.img = baseImage;
        }

        UserService.updateUserInformation(values).then(
            response => {
                let currentUserr = {
                    id: currentUser.id,
                    img: response.data.img,
                    full_name: response.data.full_name,
                    email: response.data.email,
                    phone: response.data.phone,
                    role: currentUser.role,
                    token: currentUser.token,
                    type: currentUser.type
                };

                localStorage.setItem("user", JSON.stringify(currentUserr));
            }
        );

        setEdit(false);
    }

    const [baseImage, setBaseImage] = useState("");

    const uploadImage = async (e) => {
        const file = e.target.files[0];
        if (file !== undefined) {
            setFileChosen(file.name);
            const base64 = await convertBase64(file);
            setBaseImage(base64);
        }
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    return (
        <div className={props.sideState === true && window.innerWidth > 960 ? "dash-on dash-content" : "dash-content"}>
            <h1 style={{ padding: "10px 0 10px 0px" }} className="title-section">Datele mele</h1>
            <Formik

                initialValues={
                    {
                        id: currentUser.id,
                        img: currentUser.img,
                        full_name: currentUser.full_name,
                        email: currentUser.email,
                        phone: currentUser.phone,
                    }
                }

                onSubmit={(values) => {
                    handleSubmit(values);
                }}

                validationSchema={validateSchema}>

                {props => (

                    <form className="form-profile" onSubmit={props.handleSubmit}>
                        <div className="form-group">
                            {edit === false ? <label className="col-sm-2 col-form-label img-label" style={{ alignSelf: 'center' }}>Profile picture:</label> : null}
                           
                            <img src={baseImage !== "" ? baseImage : props.values.img} className={props.values.img === null && baseImage === "" ? "no-avatar " : "avatar"} alt="" />
                            {props.values.img === null && baseImage === '' && <span className="firstLetter">{props.values.full_name[0]}</span>}
                           
                            {edit === true ? <div style={{ display: 'flex' }}>
                                <input type="file" onChange={uploadImage} className="input-file input-img" style={{ alignSelf: 'center' }} accept=".png,.jpg,.jpeg" />
                                <p className="file-name text-primary">{fileChoosen}</p>
                            </div> : null}
                        </div>

                        <div className="form-group">
                            <label htmlFor="inputFullName" className="col-sm-2 col-form-label">Full name:</label>
                            <div className=" col-md-6 col-sm-8">
                                {edit === true ? <input type="text"
                                    className="form-control text-primary"
                                    name="full_name"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.full_name}
                                    id="inputFullName"
                                /> :
                                    <p className="text-primary">{props.values.full_name}</p>
                                }
                                {props.errors.full_name && props.touched.full_name && <p className="text-danger">{props.errors.full_name}</p>}
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Email:</label>
                            <div className="col-md-6 col-sm-8">
                                {edit === true ? <input
                                    type="email"
                                    name="email"
                                    value={props.values.email}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    className="form-control text-primary"
                                    id="inputEmail"
                                /> :
                                    <p className="text-primary">{props.values.email}</p>
                                }
                                {props.errors.email && props.touched.email && <p className="text-danger">{props.errors.email}</p>}
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="inputPhone" className="col-sm-2 col-form-label">Phone:</label>
                            <div className="col-md-6 col-sm-8">
                                {edit === true ? <input
                                    type="text"
                                    className="form-control text-primary"
                                    id="inputPhone"
                                    name="phone"
                                    value={props.values.phone}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                /> :
                                    <p className="text-primary">{props.values.phone}</p>
                                }
                                {props.errors.phone && props.touched.phone && <p className="text-danger">{props.errors.phone}</p>}
                            </div>
                        </div>
                        {edit === false && <button type="button" className="btn btn-outline-primary btn-detalii" onClick={() => setEdit(true)}>Editeaza datele</button>}
                        {edit === true && <div className="btns">
                            <button type="button" className="btn btn-outline-primary btn-detalii"
                                onClick={() => {
                                    setBaseImage("");
                                    setEdit(false);
                                    props.setFieldValue('id', currentUser.id);
                                    props.setFieldValue('img', currentUser.img);
                                    props.setFieldValue('full_name', currentUser.full_name);
                                    props.setFieldValue('email', currentUser.email);
                                    props.setFieldValue('phone', currentUser.phone);
                                }}>Elimina modificarile</button>
                            <button type="submit" name="submit" className="btn btn-outline-primary btn-edit-send" >Salveaza modificarile</button>
                        </div>}
                    </form>
                )}
            </Formik>
            <hr className="hr" />

            <div className="card mb-3" style={{ width: "18rem" }}>
                <div className="card-body">
                    <h3 className="card-title">Activitatea mea</h3>
                    <div className="activity">
                        <IoIcons.IoIosPaper className="activity-icon text-primary" />
                        <div className="activity-body">
                            <p className="card-text">Ati aplicat de {props.nrAplicarii} ori</p>
                            <hr className="hr" />
                            <a className="card-text  text-primary" href="#/" onClick={() => props.setState(2)}>Vezi istoricul aplicarilor</a>
                        </div>
                    </div>


                </div>
            </div>
        </div>

    )
}

export default UserProfile
