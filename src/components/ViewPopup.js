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
            maxWidth: '2000px',
            borderRadius: '7px'
        }
    },
    cvMode: {
        width: '85%',
        margin: 'auto',
        '& .MuiDialogContent-root': {
            padding: '0'
        },
        '& .MuiDialog-paperWidthMd': {
            width: '680px',
            maxWidth: '680px',
            paddingTop:'20px',
            borderRadius: '7px'
        }
    },
    modalLogin: {
        width: '85%',
        margin: 'auto',
        '& .MuiDialogContent-root': {
            padding: '0'
        },
        '& .MuiDialog-paperWidthMd': {
            width: '430px',
            maxWidth: '430px',
            borderRadius: '10px'
        }
    }
}))

export default function ViewPopup(props) {
    const { title, subTitle, children, openPopup, setOpenPopup, showLogin, cvMode } = props;
    const classes = useStyles();

    const handleClose = () => {
        setOpenPopup(false);
    }

    return (
        <Dialog open={openPopup} maxWidth="md" className={showLogin === true ? classes.modalLogin : cvMode === true ? classes.cvMode : classes.modal} onClose={handleClose} >
            {cvMode === true ? null : <div className={showLogin === true ? "modal-header-login" : "modal-header"}>
                <span onClick={() => setOpenPopup(false)} className="close-modal" style={showLogin === true ? { display: 'none' } : null}><CloseIcon fontSize="large" /></span>
                <div className={showLogin === true ? null : "header-description"}>
                    <h2 style={subTitle === null ? { marginBottom: '10px' } : null} className="title-header">{title}</h2>
                    {subTitle != null ? <p>{subTitle}</p> : null}
                </div>
            </div>}
            <DialogContent style={{ backgroundColor: "white" }}>
                {children}
            </DialogContent>
        </Dialog>
    )
}

