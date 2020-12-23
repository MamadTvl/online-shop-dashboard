import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    save: {
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
        position: "absolute",
        right: '45%',
        top: '20%',
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