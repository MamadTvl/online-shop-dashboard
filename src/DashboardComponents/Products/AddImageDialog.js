import {useStyle} from "./Styles/ImagesStyle";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import {Button, DialogContentText, Typography} from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";

function AddImageDialog(props) {
    const classes = useStyle()
    const {uploadImageHandler, onClose, open} = props;

    const handleClose = () => {
        onClose();
    };
    const clickHandle = (event) => {
        console.log(event.target.files[0])
        if(event.target.files[0].size < 2000000) {
            uploadImageHandler(event.target.files[0])
        }
        else {
            document.getElementById('warning').style.color = '#de3939'
            setTimeout(() => {
                document.getElementById('warning').style.color = '#434343'
            }, 2000)
        }
    }
    return (
        <Dialog className={classes.dialog} onClose={handleClose} aria-labelledby={'upload-image'} open={open}>
            <DialogTitle style={{textAlign: 'center'}}><Typography className={classes.title}>آپلود عکس</Typography></DialogTitle>
            <DialogContentText style={{margin: '0 8px'}}>
                <Typography id={'warning'} className={classes.description}>دقت کنید که حجم عکس کمتر از 2 مگابایت باشد</Typography>
            </DialogContentText>
            <input
                accept="image/*"
                hidden
                id="upload-button-dialog"
                multiple
                type="file"
                onChange={clickHandle}
            />
            <label style={{padding: '18px',}} htmlFor={'upload-button-dialog'}>
                <Button
                    className={classes.dialogButton}
                    fullWidth
                    variant={"contained"}
                    component={'span'}
                >
                    آپلود
                </Button>
            </label>
        </Dialog>
    )

}


AddImageDialog.propTypes = {
    uploadImageHandler: PropTypes.any.isRequired,
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

export default AddImageDialog