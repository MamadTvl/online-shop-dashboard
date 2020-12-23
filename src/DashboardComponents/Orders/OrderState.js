import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {Button, CardHeader, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
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
    textField : {
        display : "flex",
        justifyContent : "center",
        fontFamily : 'Shabnam'

    },
    textFieldFont: {
        fontFamily : 'Shabnam',
        fontSize : 16,
        color : '#545454',
    },
    save : {
        color : "white",
        fontFamily : 'Shabnam',
        fontWeight : 'bold',
        fontSize : 20,
        width : 109,
        height : 48,
        marginTop : 24,
        marginBottom : 34,
        float : "left"
    }
}), {index: 1});

const states = [
    {
        value: 'جدید',
        label: 'جدید',
    },
    {
        value: 'ارسال شده',
        label: 'ارسال شده',
    },
    {
        value: 'ارسال نشده',
        label: 'ارسال نشده',
    },
];


function OrderState() {
    const classes = useStyles()
    const [state, setState] = React.useState('ارسال نشده');

    const handleChange = (event) => {
        setState(event.target.value);
    };

    return (
        <Card className={classes.root}>
            <CardHeader
                title={
                    <Typography className={classes.title}>وضعیت سفارش</Typography>
                }
            />
            <CardContent>
                <div className={classes.textField}>
                    <TextField
                        style={{flexGrow  : 1}}
                        id="OrderState"
                        select
                        value={state}
                        defaultValue={'ارسال نشده'}
                        onChange={handleChange}
                        InputProps={{
                            classes: {
                                input: classes.textFieldFont
                            }
                        }}
                        variant="outlined"

                    >
                        {states.map((option) => (
                            <MenuItem className={classes.menu} key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
                <Button style={{backgroundColor : '#F16522'}} variant="contained" className={classes.save} >ثبت</Button>
            </CardContent>
        </Card>
    )

}

export default OrderState