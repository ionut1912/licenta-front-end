import React, { useState } from 'react';
import ViewPopup from '../ViewPopup';
import JobView from '../Joburi/JobView';
import JobService from '../../services/job.service';
import "./UserAplications.css"

function UserAplications(props) {

    const [aplicariUser, setAplicariiUser] = useState(props.aplicariUser);

    const [openPopupView, setOpenPopupView] = useState(false);
    const [currentItem, setCurrentItem] = useState("");

    function format(date) {
        return new Intl.DateTimeFormat("en-US", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        }).format(new Date(date));
    }

    function showDetaliiAplicare(idJob) {

        JobService.getJob(idJob).then(
            response => {
                setCurrentItem(response.data);
                setOpenPopupView(true);
            }
        )

    }

    function onChangeSearch(event) {

        const search = event.target.value;

        if (search === "") {
            setAplicariiUser(props.aplicariUser);
        } else {
            setAplicariiUser(aplicariUser.filter(job => String(job.jobName.toLowerCase()).startsWith(search.toLowerCase())));
        }
    }

    function onChangeSelect(event) {

        var value = event.target.value;

        if (value === "Aplicarile in curs de verificare") {
            setAplicariiUser(props.aplicariUser.filter(aplicare => aplicare.verificat === false));
        } else if (value === "Aplicarile verificate") {
            setAplicariiUser(props.aplicariUser.filter(aplicare => aplicare.verificat === true));
        } else {
            setAplicariiUser(props.aplicariUser);
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


    return (
        <div className={props.sideState === true && window.innerWidth > 960 ? "dash-on dash-content" : "dash-content"}>

            <h1 style={{ padding: "10px 0 10px 0px" }} className="title-section">Aplicarile mele</h1>
            <div className="filtrare-aplicatii">
                <select className="custom-select" id="inputGroupSelect01" onChange={onChangeSelect}>
                    <option value="Toate aplicarile">Toate aplicarile</option>
                    <option value="Aplicarile in curs de verificare">Aplicarile in curs de verificare</option>
                    <option value="Aplicarile verificate">Aplicarile verificate</option>
                </select>

                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fas fa-search"></i></span>
                    </div>
                    <input type="text" className="form-control" onChange={onChangeSearch} placeholder="Cauta dupa titlu" />
                </div>
            </div>

            { aplicariUser.sort((a, b) => b.id - a.id).map((aplicare, index) => {
                return (
                    <div className="card mb-3" key={index}>
                        <div className="card-body">
                            <div className="body-aplicare">
                                <div className="info-aplicare">
                                    <h3 className="card-title text-primary">{aplicare.jobName}</h3>
                                    <p className="card-text">Ai aplicat la data de: {format(aplicare.dataAplicarii)}</p>
                                </div>
                                <button type="button" className="btn btn-outline-primary btn-detalii" onClick={() => showDetaliiAplicare(aplicare.idJob)}>Detalii aplicare</button>

                            </div>
                            <hr className="hr" />
                            <div className="footer-aplicare">
                                <p className={aplicare.verificat === true ? "card-text state-green" : "card-text state-red"}><i className="fas fa-circle"></i>{aplicare.verificat === true ? "Verificat" : "In curs de verificare"}</p>
                                <button type="button" className="btn btn-outline-primary btn-detalii" onClick={() => downloadFile(aplicare.cv)}>CV aplicare</button>
                            </div>
                        </div>
                    </div>
                )
            })
            }


            <ViewPopup
                title={currentItem.numeJob}
                subTitle={currentItem.locatie}
                openPopup={openPopupView}
                setOpenPopup={setOpenPopupView}>
                <JobView recordForView={currentItem} setOpenPopup={setOpenPopupView} buttons={false} />
            </ViewPopup>
        </div>
    )
}

export default UserAplications
