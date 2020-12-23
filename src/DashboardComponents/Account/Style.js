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
    loading: {
        color: '#F16522',
        direction: 'rtl',
        position: 'absolute',
        top: '81px',
        right: 'auto',
        width: '82.5%',
    },
}), {index: 1})