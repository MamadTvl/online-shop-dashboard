import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexGrow: 1,
        width: '100%',
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
        top: '5%',
        color: '#F16522',
        zIndex: 1,
    },
    gridRight: {
        flexBasis: '726px',
    },
    gridLeft: {
        flexBasis: '726px',
        marginBottom: theme.spacing(28)
    },
    gridLeftElements: {
        margin: theme.spacing(0, 0, 2),
        position: 'relative'
    },
    skeleton: {
        // position: "absolute",
    }
}));