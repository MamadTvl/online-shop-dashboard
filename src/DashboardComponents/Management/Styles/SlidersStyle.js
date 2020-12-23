import {makeStyles} from "@material-ui/styles";

export const useStyle = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "space-between",
        margin: theme.spacing(0, 3, 3, 3),
        height: 90
    },
    title: {
        fontFamily: 'Shabnam',
        color: '#434343',
        fontSize: 20,
        fontWeight: "bold",

    },
    textField: {
        fontFamily: 'Shabnam',
        fontSize: 14,
    },
    cover: {
        maxWidth: '72px',
        width: '100%',
        minHeight: '80%',
        alignSelf: "center",
        marginRight: theme.spacing(2)
    },
    upload: {
        // margin: theme.spacing(2, 3),
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
    delete: {
        fontFamily: 'Shabnam',
        fontSize: 16,
        color: '#434343',
        width: '100%'
    },

}), {index: 1})