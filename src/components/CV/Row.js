import React from 'react'
import "./Row.css"

function Row(props) {

    function handleClickDelete() {
        props.onDelete(props.id);
    }
    function handleClickEdit() {
        props.onEdit(props.id);
    }

    return (
        <div>
            <div className="roww">
                <div className="detail">
                    <h1>{props.title}</h1>
                    {props.start === undefined ? null : <p >{props.start} - {props.end}</p> }
                </div>

                <div className="actions">
                    <span className="edit text-primary" onClick={handleClickEdit}><i className="fas fa-pencil-alt"></i></span>
                    <span className="text-primary" onClick={handleClickDelete}><i className="fas fa-trash-alt"></i></span>
                </div>

            </div>
            <hr className="hr" />
        </div>
    )
}

export default Row;
