import React from 'react'
import './FlexDinamicInfo.css'

export default function FlexDinamicInfo({
    lightBg, topLine, lightText, imgStart, headline,
    description, description2, description3, buttonLabel, buttonColor, goTo, img, alt
}) {

    return (
        <div className={lightBg ? 'infoDinamic-section' : 'infoDinamic-section darkBg'}>
            <div className="container">
                <div className="row__item" style={{ flexDirection: imgStart === true ? 'row-reverse' : 'row' }}>

                    <div className="col__item">
                        <div className="infoDinamic-text-wrapper">
                            <div className="top-line">{topLine}</div>
                            <h1 className={lightText ? 'heading whiteColor' : 'heading'}>{headline}</h1>
                            <p className={lightText ? 'infoDinamic-subtitle whiteColor' : 'infoDinamic-subtitle'}
                                style={description2 != null && description3 != null ? { marginBottom: '15px' } : null}>
                                {description}
                            </p>
                            {description2 != null && description3 != null ? (
                                <div>
                                    <p className={lightText ? 'infoDinamic-subtitle whiteColor' : 'infoDinamic-subtitle'} style={{ marginBottom: "15px" }}>{description2}</p>
                                    <p className={lightText ? 'infoDinamic-subtitle whiteColor' : 'infoDinamic-subtitle'}>{description3}</p>
                                </div>
                            ) : null}
                            <a href={goTo}>
                                <button className={buttonColor === "blue" ? "btn btn-primary btn-lg" : "btn btn-danger btn-lg"}>{buttonLabel}</button>
                            </a>
                        </div>
                    </div>

                    <div className="col__item" >
                        <div className="infoDinamic-img-wrapper">
                            <img src={img} alt={alt} className="infoDinamic-img" />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

