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
    export: {
        margin: theme.spacing(1, 3, 3),
        float: "left"
    },
    addProduct: {
        margin: theme.spacing(2, 3),
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
    loading: {
        color: '#F16522',
        direction: 'rtl',
        position: 'absolute',
        top: '81px',
        right: 'auto',
        width: '82.5%',
    },
}));