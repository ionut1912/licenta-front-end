import React from 'react'
import { Dialog, DialogContent, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    modal: {
        textAlign: 'center',
        width: '83%',
        position: 'absolute',
        left: '9%',
        margin: 'auto',
        zIndex: '1',
        transition: 'all .3s ease',
        '& .MuiDialogContent-root': {
            padding: '0'
        },
        '& .MuiDialog-paperWidthMd': {
            width: '2000px',
            maxWidth: '2000px'
        },
        '& .MuiPaper-root': {
            backgroundColor: 'transparent'
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
                <div className="job-description">
                    <h2>{title}</h2>
                    {subTitle != null ? <p>{subTitle}</p> : null}
                </div>
                <span onClick={() => setOpenPopup(false)}>X</span>

            </div>
            <DialogContent style={{ backgroundColor: "white" }}>
                {children}
            </DialogContent>
        </Dialog>
    )
}

