import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    table: {
        width: '100%',
    },
    paper: {
        paddingTop: theme.spacing(0)
    },
    title: {
        fontFamily: 'Shabnam',
        color: '#434343',
        fontSize: 20,
        fontWeight: "bold",
        margin: theme.spacing(3, 3),
        float: "right"
    },
    addProduct: {
        margin: theme.spacing(2, 3),
        float: "left",
        backgroundColor: 'white',
        color: '#F16522',
        borderColor : '#F16522',
        borderWidth : '2px',
        fontSize: '16px',
        fontFamily: 'Shabnam',
        fontWeight: "bold",
        '&:hover': {
            color: 'white',
            backgroundColor: '#F16522',
            borderColor : 'white',
        },
    },
}), {index: 1});