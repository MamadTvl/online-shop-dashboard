import React from "react";
import {Button, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";

const useStyle = makeStyles((theme) => ({
    root: {
        display: "flex",
        marginBottom: 12,
    },
    title: {
        fontFamily: 'Shabnam',
        color: '#434343',
        fontSize: 20,
        fontWeight: "bold",

    },
    textField: {
        fontFamily: 'Shabnam',
        fontSize: 14,
    },
    label: {
        fontFamily: 'Shabnam',
        fontSize: 14,
        marginRight: 24,
    },
    save: {
        marginRight: 12,
        marginLeft: theme.spacing(3),
        float: "left",
        backgroundColor: '#F16522',
        color: 'white',
        fontSize: '16px',
        fontFamily: 'Shabnam',
        fontWeight: "bold",
        '&:hover': {
            backgroundColor: '#F16522',
            opacity: '70%'
        },

    },
    close: {
        // margin: theme.spacing(2, 3),
        float: "left",
        backgroundColor: '#B9B9B9',
        color: 'white',
        fontSize: '16px',
        fontFamily: 'Shabnam',
        fontWeight: "bold",
        '&:hover': {
            backgroundColor: '#B9B9B9',
            opacity: '70%'
        },

    },
    dialog: {
        display: "flex",
        flexDirection: 'column',
        [theme.breakpoints.up('sm')]: {
            width: '417px'
        },
    }

}))


export default function AddCategoryDialog(props) {
    const classes = useStyle()
    const {onClose, add, open, title, defaultValue} = props;

    const handleClose = () => {
        onClose();
    };
    const clickHandle = () => {
        add(document.getElementById('category-title').value)
    }
    return (
        <Dialog onClose={handleClose} aria-labelledby={'upload-image'} open={open}>
            <div className={classes.dialog}>
                <DialogTitle><Typography className={classes.title}>{title}</Typography></DialogTitle>
                <Typography className={classes.label} component={'span'}>نام دسته بندی</Typography>
                <div style={{marginLeft: 24, marginRight: 24}}>
                    <TextField
                        autoFocus
                        id={'category-title'}
                        fullWidth
                        defaultValue={defaultValue}
                        margin={'normal'}
                        InputProps={{
                            classes: {
                                input: classes.textField
                            }
                        }}
                        variant="outlined"
                    />
                </div>
                <div style={{justifyContent: 'flex-end', display: 'flex', marginTop: 12, marginBottom: 24}}>
                    <Button
                        onClick={handleClose}
                        className={classes.close}
                        variant={"contained"}
                        size={"large"}
                    >
                        بستن
                    </Button>
                    <Button
                        onClick={clickHandle}
                        className={classes.save}
                        variant={"contained"}
                        size={"large"}
                    >
                        ثبت
                    </Button>
                </div>
            </div>
        </Dialog>

    )
}
AddCategoryDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    add: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    defaultValue: PropTypes.string.isRequired
};