import { Dialog, DialogActions, DialogContent, DialogTitle, Typography, makeStyles, IconButton } from '@material-ui/core'
import Button from './Button'
import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
    dialog: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(8),
        textAlign: 'center'
    },
    dialogAction: {
        justifyContent: 'center'
    },
    titleIcon: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.warning.main,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
            cursor: 'default'
        },
        '&:focus': {
            outline: 'none',
            border: 'none'
        },
        '& .MuiSvgIcon-root': {
            fontSize: '8rem',
        }
    }
}))

function ConfirmDialog(props) {
    const { confirmDialog, setConfirmDialog } = props;
    const classes = useStyles();

    const handleClose = () => {
        setConfirmDialog({ ...confirmDialog, isOpen: false });
    }

    return (
        <Dialog open={confirmDialog.isOpen} classes={{ paper: classes.dialog }} onClose={handleClose}>
            <DialogTitle>
                <IconButton disableRipple className={classes.titleIcon}>
                    <DeleteIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Typography variant="h5">
                    {confirmDialog.title}
                </Typography>
                <Typography variant="subtitle1">
                    {confirmDialog.subTitle}
                </Typography>
            </DialogContent>
            <DialogActions className={classes.dialogAction}>
                <Button
                    color="secondary"
                    onClick={confirmDialog.onConfirm}
                    text="Yes" />
                <Button
                    onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
                    text="No" />
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDialog
