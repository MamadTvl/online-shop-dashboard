import React, {useState} from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {Button, CardHeader, Snackbar, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import {useAxios} from "../../utills/Hooks/useAxios";
import {Alert} from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginBottom: 16,
    },
    title: {
        fontFamily: 'Shabnam',
        color: '#434343',
        fontSize: 20,
        fontWeight: "bold",
        margin: theme.spacing(0, 0)
    },
    menu: {
        fontFamily: 'Shabnam',
    },
    textField: {
        display: "flex",
        justifyContent: "center",
        fontFamily: 'Shabnam'

    },
    textFieldFont: {
        fontFamily: 'Shabnam',
        fontSize: 16,
        color: '#545454',
    },
    save: {
        color: "white",
        fontFamily: 'Shabnam',
        fontWeight: 'bold',
        fontSize: 20,
        width: 109,
        height: 48,
        marginTop: 24,
        marginBottom: 34,
        float: "left"
    }
}), {index: 1});

const states = [
    {
        id: 1,
        label: 'در حال بررسی',
    },
    {
        id: 2,
        label: 'تحویل داده شده',
    },
    {
        id: 3,
        label: 'لغو شده',
    },
];


function OrderState(props) {
    const [{loading}, pathStatus] = useAxios({
        url: `/admin/payment_mng/update_payment`,
        method: 'PATCH',
    }, {manual: true})
    const classes = useStyles()
    const setStatus = (status) => {
        switch (status) {
            case 1:
                return states[0]
            case 2:
                return states[1]
            case 3:
                return states[2]
            default:
                return {
                    id: null,
                    label: '',
                }
        }
    }
    const [state, setState] = useState(setStatus(props.data.status))
    const [snackbar, setSnackbar] = useState({
        open: false,
        alertMessage: 'با موفقیت ثبت شد',
        type: 'success',

    })
    return (
        <>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() =>
                    setSnackbar({
                        ...snackbar,
                        openSnackbar: false
                    })}
            >
                <Alert
                    dir={'ltr'}
                    variant={'filled'}
                    style={{fontFamily: 'Shabnam'}}
                    onClose={() =>
                        setSnackbar({
                            ...snackbar,
                            open: false
                        })}
                    severity={snackbar.type}
                >
                    {snackbar.alertMessage}
                </Alert>
            </Snackbar>
            <Card className={classes.root}>
                <CardHeader
                    title={
                        <Typography className={classes.title}>وضعیت سفارش</Typography>
                    }
                />
                <CardContent>
                    <div className={classes.textField}>
                        <TextField
                            style={{flexGrow: 1}}
                            id="OrderState"
                            select
                            value={state.label}
                            onChange={(event =>
                                    setState(states.find(element => element.label === event.target.value))
                            )}
                            InputProps={{
                                classes: {
                                    input: classes.textFieldFont
                                }
                            }}
                            variant="outlined"
                        >
                            {states.map((option) => (
                                <MenuItem className={classes.menu} key={option.id} value={option.label}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <Button
                        style={{backgroundColor: '#F16522'}}
                        disabled={loading}
                        variant="contained"
                        className={classes.save}
                        onClick={async () => {
                            try {
                                const response = await pathStatus({
                                    data: {
                                        "payment_id": props.data.id,
                                        "status": state.id
                                    }
                                })
                                if (response.data.status === 'success') {
                                    setSnackbar({
                                        open: true,
                                        alertMessage: 'با موفقیت ثبت شد',
                                        type: 'success',
                                    })
                                } else {
                                    setSnackbar({
                                        open: true,
                                        alertMessage: 'مشکلی پیش آمده دوباره تلاش کنید',
                                        type: 'error',
                                    })
                                }
                            } catch (err) {
                                setSnackbar({
                                    open: true,
                                    alertMessage: 'مشکلی پیش آمده دوباره تلاش کنید',
                                    type: 'error',
                                })
                            }
                        }}
                    >ثبت
                    </Button>
                </CardContent>
            </Card>
        </>
    )

}

export default OrderState
