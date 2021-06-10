import React from 'react'
import "./Row.css"

export default function Row(props) {

    function handleClickDelete() {

        if (props.deletePermanent)
            props.setConfirmDialog({
                isOpen: true,
                title: 'Are you sure want delete this record?',
                subTitle: "You can't undo this operation, this record will be deleted from datebase!",
                onConfirm: () => { props.onDelete(props.id) }
            })
        else
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
                    {props.start === undefined ? null : <p >{props.start} - {props.end}</p>}
                </div>

                <div className="actions">
                    <span className="edit" onClick={handleClickEdit}><i className="fas fa-pencil-alt"></i></span>
                    <span className="delete" onClick={handleClickDelete}><i className="fas fa-trash-alt"></i></span>
                </div>

            </div>
            <hr className="hr" />
        </div>
    )
}

