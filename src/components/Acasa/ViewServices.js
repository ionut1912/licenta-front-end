import React from 'react'

export default function ViewServices(props) {
    return (
        <div className="modal-content">
            <div className="modal-body">
                {props.recordForView.descriere != null ? (
                    <div>
                        <h4>Description</h4>
                        <p>{props.recordForView.descriere}</p>
                    </div>
                ) : null}

                {props.recordForView.category.map((item, nr) => {
                    return (
                        <ul key={nr}>
                            <h4>{item.title}</h4>
                            <li >{item.detalii}</li>
                        </ul>
                    );
                })}
            </div>
        </div>
    )
}


