import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexGrow: 1,
        width: '100%',
        // justifyContent : "space-around",
    },
    container: {
        justifyContent: "space-around",
    },
    title: {
        fontFamily: 'Shabnam',
        color: '#434343',
        fontSize: 20,
        fontWeight: "bold",
    },
    save: {
        position: 'relative',
        width: 226,
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
    buttonProgress: {
        position: 'absolute',
        left: '90px',
        top: '14%',
        color: '#F16522',
        zIndex: 1,
    },
    loading: {
        color: '#F16522',
        direction: 'rtl',
        position: 'absolute',
        top: '81px',
        right: 'auto',
        width: '82.5%',
    },
}), {index: 1});