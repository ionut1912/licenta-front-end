import React from 'react'
import { Dialog, DialogContent, DialogTitle, makeStyles, Typography } from '@material-ui/core'
import Button from './Button'
import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 0,
        margin: theme.spacing(0.5)
    },
    dialogWrapper: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: '50%'
    },
    dialogTitle: {
        paddingRight: '10px',
        margin: '10px'
    }


}))


function FormPopup(props) {

    const { title, children, openPopup, setOpenPopup } = props;
    const classes = useStyles();

    const handleClose = () => {
        setOpenPopup(false);
    }

    return (
        <Dialog open={openPopup} maxWidth="md" className={classes.dialogWrapper} onClose={handleClose} >
            <DialogTitle className={classes.dialogTitle}>
                <div style={{ display: "flex" }}>
                    <Typography variant="h5" color="primary" component="div" style={{ flexGrow: "1", marginTop: '10px' }}>
                        {title}
                    </Typography>
                    <Button
                        className={`${classes.root} `}
                        color='secondary'
                        onClick={() => setOpenPopup(false)}
                        text={<CloseIcon fontSize="small" />}
                    />
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    )
}

export default FormPopup
