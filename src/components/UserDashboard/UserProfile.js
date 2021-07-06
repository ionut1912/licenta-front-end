import React, { useState } from 'react'
import * as IoIcons from 'react-icons/io';
import { Formik } from 'formik';
import * as Yup from "yup";
import UserService from '../../services/user.service';
import AuthService from '../../services/auth.service'
import Notification from '../Notification';
import ConfirmDialog from '../AdminDashboard/ConfirmDialog'
import "./UserProfile.css"
import { motion } from "framer-motion";

export default function UserProfile(props) {

    const [edit, setEdit] = useState(false);
    const [fileChoosen, setFileChosen] = useState('No file choosen');

    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    const currentUser = AuthService.getCurrentUser();

    const validateSchema = Yup.object().shape({
        full_name: Yup.string()
            .min(4, "Name is to short!")
            .max(100, "Name is to long!")
            .matches(/^[a-zA-Z ,.'-]+$/, "Full name can't contains number or symbols")
            .required("This field is required!"),
        email: Yup.string()
            .email("Invalid email!")
            .max(60, "Email is to long!")
            .required("This field is required!"),
        phone: Yup.string()
            .matches(/^(\+4|)?(07[0-8]{1}[0-9]{1}|02[0-9]{2}|03[0-9]{2}){1}?(\s|\.|-)?([0-9]{3}(\s|\.|-|)){2}$/, 'Invalid phone number')
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
                setNotify({
                    isOpen: true,
                    message: "Updated informations with success",
                    type: 'success'
                });
            }
        );

        setBaseImage("");
        setFileChosen("No file choosen");
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

    function removeImgFromDB(resetImgForm) {
        UserService.deleteUserImg(currentUser.id).then(
            response => {
                let currentUserr = {
                    id: currentUser.id,
                    img: null,
                    full_name: currentUser.full_name,
                    email: currentUser.email,
                    phone: currentUser.phone,
                    role: currentUser.role,
                    token: currentUser.token,
                    type: currentUser.type
                };

                localStorage.setItem("user", JSON.stringify(currentUserr));
                resetImgForm();
                setNotify({
                    isOpen: true,
                    message: "Deleted image with success",
                    type: 'success'
                });
                setConfirmDialog({
                    ...confirmDialog,
                    isOpen: false
                });
            },
            error => {
                setNotify({
                    isOpen: true,
                    message: "Network error",
                    type: 'error'
                });
                setConfirmDialog({
                    ...confirmDialog,
                    isOpen: false
                });
            }
        )
    }

    const deleteImg = (resetImgForm) => {
        if (baseImage === "") {
            setConfirmDialog({
                isOpen: true,
                title: 'Are you sure want delete profile image?',
                subTitle: "You can't undo this operation, this record will be deleted from datebase!",
                onConfirm: () => removeImgFromDB(resetImgForm)
            })

        } else {
            setBaseImage("");
            setFileChosen("No file choosen");
        }

    }

    // animation
    const contentAnim = {
        hidden: {

            opacity: 0
        },
        visible: {

            opacity: 1,
            transition: { type: 'tween', delay: 0.5, duration: 0.5 }
        }
    }

    return (
        <motion.div variants={contentAnim} initial='hidden' animate='visible'
            className={props.sideState === true && window.innerWidth > 960 ? "dash-on dash-content" : "dash-content"}>
            <h1 style={{ padding: "10px 0 10px 0px" }} className="title-section">My informations</h1>
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

                            <div className={edit === true ? (props.values.img === null && baseImage === '' ? "profil-img" : "col-sm-2 col-form-label") :
                                (props.values.img === null && baseImage === '' ? "profil-img" : null)} >
                                <img src={baseImage !== "" ? baseImage : props.values.img} className={props.values.img === null && baseImage === "" ? null : "avatar"} alt="" />
                                {props.values.img === null && baseImage === '' && <span className="firstLetter">{props.values.full_name[0]}</span>}
                            </div>

                            {edit === true ?
                                <div style={{ display: 'flex' }} className="col-md-6 col-sm-8 chosee">
                                    <input type="file" onChange={uploadImage} className="input-file" style={{ alignSelf: 'center' }} accept=".png,.jpg,.jpeg" />
                                    <p className="file-name text-primary">{fileChoosen}</p>
                                </div> : null}
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="inputFullName" className="col-sm-2 col-form-label">Full name:</label>
                            <div className="col-md-6 col-sm-8">
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
                        {edit === false && <button type="button" className="btn btn-outline-primary btn-detalii" onClick={() => setEdit(true)}>Edit data</button>}

                        {edit === true && <div className="btns">
                            <button type="button" className="btn btn-outline-primary btn-detalii btn-edit-send" style={{ marginLeft: '0px' }}
                                onClick={() => {
                                    setBaseImage("");
                                    setFileChosen("No file choosen");
                                    setEdit(false);
                                    props.setFieldValue('id', currentUser.id);
                                    props.setFieldValue('img', currentUser.img);
                                    props.setFieldValue('full_name', currentUser.full_name);
                                    props.setFieldValue('email', currentUser.email);
                                    props.setFieldValue('phone', currentUser.phone);
                                }}>Remove changes</button>

                            {props.values.img === null && baseImage === "" ? null : <button type="button"
                                className="btn btn-outline-primary btn-edit-send"
                                onClick={() => deleteImg(() => props.setFieldValue('img', null))}>Remove picture</button>}
                            <button type="submit" name="submit" className="btn btn-outline-primary btn-edit-send" >Save changes</button>
                        </div>
                        }
                    </form>
                )}
            </Formik>
            <hr className="hr" />

            <div className="card mb-3 info-apps">
                <div className="card-body">
                    <h3 className="card-title">My activity</h3>
                    <div className="activity">
                        <IoIcons.IoIosPaper className="activity-icon text-primary" />
                        <div className="activity-body">
                            <p className="card-text">You applied for {props.nrAplicarii} {props.nrAplicarii === 1 ? "time" : "times"}</p>
                            <hr className="hr" />
                            <a className="card-text  text-primary" href="#/" onClick={() => props.setState(2)}>See application history</a>
                        </div>
                    </div>
                </div>
            </div>

            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />

        </motion.div>

    )
}

