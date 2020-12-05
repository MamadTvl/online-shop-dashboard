import {makeStyles} from "@material-ui/styles";

export const useStyle = makeStyles((theme) => ({
    login: {
        display: "flex",
        width: '60%',
        margin: "auto",
        justifyContent: 'center',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: 85
    },
    title: {
        fontFamily: 'Shabnam',
        color: '#434343',
        fontSize: 20,
        fontWeight: "bold",
        margin: theme.spacing(3),
        textAlign: "center"
    },
    label: {
        fontFamily: 'Shabnam',
        color: '#545454',
        fontSize: 14,
    },
    textField: {
        fontFamily: 'Shabnam',
        fontSize: 14,
    },
    image: {
        width: 90,
        height: 90,
        alignSelf: "center",
    },
    signin: {
        marginTop: theme.spacing(4),
        // marginLeft: theme.spacing(30),
        alignSelf: 'center',
        width: 226,
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
        right: '94px',
        top: '33px',
        color: '#F16522',
        zIndex: 1,
    }

}))