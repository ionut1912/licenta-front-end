import React, { useState } from 'react';
import ViewPopup from '../ViewPopup';
import JobView from '../Joburi/JobView';
import JobService from '../../services/job.service';
import Notification from '../Notification';
import ConfirmDialog from '../AdminDashboard/ConfirmDialog'
import "./UserAplications.css"
import { motion } from "framer-motion";

import aplicareService from '../../services/aplicareJob.serivce'
import AuthService from '../../services/auth.service'
import UserService from '../../services/user.service';

export default function UserAplications(props) {

    const [filter, setFilter] = useState('');
    const [search, setSearch] = useState('');

    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [openPopupView, setOpenPopupView] = useState(false);

    const [currentItem, setCurrentItem] = useState("");

    function format(date) {
        return new Intl.DateTimeFormat("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        }).format(new Date(date));
    }

    function openConfirmDialog(idAplicare) {
        setConfirmDialog({
            isOpen: true,
            title: 'Are you sure want delete that application?',
            subTitle: "You can't undo this operation, this record will be deleted from datebase!",
            onConfirm: () => deleteAplicare(idAplicare)
        })
    }

    function deleteAplicare(idAplicare) {
        aplicareService.deleteAplicare(idAplicare).then(
            () => {
                setConfirmDialog({
                    ...confirmDialog,
                    isOpen: false
                });

                setNotify({
                    isOpen: true,
                    message: 'Deleted Successfull!',
                    type: 'success'
                });

                const currentUser = AuthService.getCurrentUser();

                UserService.getUserAplications(currentUser.id).then(
                    response => {
                        props.setAplicariUser(response.data);
                    }
                );
            },
            error => {
                setConfirmDialog({
                    ...confirmDialog,
                    isOpen: false
                })

                setNotify({
                    isOpen: true,
                    message: 'Network error!',
                    type: 'error'
                })
            }
        )
    }

    function showDetaliiAplicare(idJob) {

        JobService.getJob(idJob).then(
            response => {
                setCurrentItem(response.data);
                setOpenPopupView(true);
            }
        )

    }

    const recordsAfterFilterAndSearching = () => {
        return props.aplicariUser.filter(x => filter === '' ? x : x.verificat === filter)
            .filter(x => x.jobName.toLowerCase().includes(search));
    }

    function onChangeSearch(event) {

        const search = event.target.value;

        if (search === "") {
            setSearch('');
        } else {
            setSearch(search.toLowerCase());
        }
    }

    function onChangeSelect(event) {

        var value = event.target.value;

        if (value === "Aplicarile in curs de verificare") {
            setFilter(false);
        } else if (value === "Aplicarile verificate") {
            setFilter(true);
        } else {
            setFilter('');
        }

    }

    function downloadFile(base64String) {
        var indexForFileType = base64String.indexOf(",");
        var fileType = base64String[indexForFileType + 1];
        var a = document.createElement("a");
        a.href = base64String;
        if (fileType === "U") {
            a.download = "CV.docx";
        } else if (fileType === "0") {
            a.download = "CV.doc";
        } else if (fileType === "J") {
            a.download = "CV.pdf";
        }
        a.click();
    }

    // animation
    const contentAnim = {
        hidden: {
            opacity: 0
        },
        visible: {
            opacity: 1,
            transition: { type: 'spring', delay: 0.5, duration: 0.5 }
        }
    }

    return (
        <motion.div variants={contentAnim} initial='hidden' animate='visible'
            className={props.sideState === true && window.innerWidth > 960 ? "dash-on dash-content" : "dash-content"}>

            <h1 style={{ padding: "10px 0 10px 0px" }} className="title-section">My applications</h1>

            <div className="filtrare-aplicatii">
                <select className="custom-select" id="inputGroupSelect01" onChange={onChangeSelect}>
                    <option value="Toate aplicarile">All applications</option>
                    <option value="Aplicarile in curs de verificare">Applications to check</option>
                    <option value="Aplicarile verificate">Applications checked</option>
                </select>

                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fas fa-search"></i></span>
                    </div>
                    <input type="text" className="form-control" onChange={onChangeSearch} placeholder="Search by title" />
                </div>
            </div>

            {recordsAfterFilterAndSearching().length === 0 ? <h1 style={{ textAlign: 'center', color: "#fc1930d5", fontSize: '60px', marginTop: '30px' }}>No results found!</h1> :
                recordsAfterFilterAndSearching().sort((a, b) => b.id - a.id).map((aplicare, index) => {
                    return (
                        <div className="card mb-3" key={index}>
                            <div className="card-body">
                                <div className="body-aplicare">
                                    <div className="info-aplicare">
                                        <h3 className="card-title text-primary">{aplicare.jobName}</h3>
                                        <p className="card-text">You applied on: {format(aplicare.dataAplicarii)}</p>
                                    </div>
                                    <div className="view-delete">
                                        <button type="button" className="btn btn-outline-primary btn-view-app" onClick={() => showDetaliiAplicare(aplicare.idJob)}>Application details</button>
                                        <button type="button" className="btn btn-outline-primary" onClick={() => openConfirmDialog(aplicare.id)}>Delete application</button>
                                    </div>
                                </div>
                                <hr className="hr" />
                                <div className="footer-aplicare">
                                    <p className={aplicare.verificat === true ? "card-text state-green" : "card-text state-red"}><i className="fas fa-circle"></i>{aplicare.verificat === true ? "Checked" : "To check"}</p>
                                    <button type="button" className="btn btn-outline-primary btn-detalii" onClick={() => downloadFile(aplicare.cv)}>CV aplication</button>
                                </div>
                            </div>
                        </div>
                    )
                })
            }

            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />

            <ViewPopup
                title={currentItem.numeJob}
                subTitle={currentItem.locatie}
                openPopup={openPopupView}
                setOpenPopup={setOpenPopupView}>
                <JobView recordForView={currentItem} setOpenPopup={setOpenPopupView} buttons={false} buttonsAddJob={false} />
            </ViewPopup>
        </motion.div>
    )
}

