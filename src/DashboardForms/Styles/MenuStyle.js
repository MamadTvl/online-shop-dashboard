import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    root: {},
    textStyle: {
        color: '#434343',
        fontFamily: "Shabnam",
        direction: "rtl",
        textAlign: "right"
    },
    exit: {
        position: "fixed",
        bottom: 0,
        width: '240px',
    },
}))