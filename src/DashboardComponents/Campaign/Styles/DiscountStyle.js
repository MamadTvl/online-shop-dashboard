import {makeStyles} from "@material-ui/styles";

export const useStyle = makeStyles((theme) => ({
    title: {
        fontFamily: 'Shabnam',
        color: '#434343',
        fontSize: 20,
        fontWeight: "bold",

    },
    label: {
        fontFamily: 'Shabnam',
        color: '#545454',
        fontSize: 14,

    },
    textField: {
        fontFamily: 'Shabnam',
        fontSize: 14,
        direction: 'ltr'
    },
    menu: {
        fontFamily: 'Shabnam',
    },
    save: {
        marginTop: theme.spacing(4),
        float: "left",
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
        right: '42%',
        top: '47%',
        color: '#F16522',
        zIndex: 1,
    },
}), {index: 1})