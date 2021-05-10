import React from 'react'
import { Dialog, DialogContent, makeStyles } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
    modal: {
        textAlign: 'center',
        width: '85%',
        margin: 'auto',
        '& .MuiDialogContent-root': {
            padding: '0'
        },
        '& .MuiDialog-paperWidthMd': {
            width: '2000px',
            maxWidth: '2000px'
        }
    }
}))

export default function ViewPopup(props) {
    const { title, subTitle, children, openPopup, setOpenPopup } = props;
    const classes = useStyles();

    const handleClose = () => {
        setOpenPopup(false);
    }
    return (
        <Dialog open={openPopup} maxWidth="md" className={classes.modal} onClose={handleClose} >
            <div className="modal-header">
                <span onClick={() => setOpenPopup(false)} className="close-modal"><CloseIcon fontSize="large" /></span>
                <div className="header-description">
                    <h2 style={subTitle === null ? { marginBottom: '10px' } : null}>{title}</h2>
                    {subTitle != null ? <p>{subTitle}</p> : null}
                </div>

            </div>
            <DialogContent style={{ backgroundColor: "white" }}>
                {children}
            </DialogContent>
        </Dialog>
    )
}

