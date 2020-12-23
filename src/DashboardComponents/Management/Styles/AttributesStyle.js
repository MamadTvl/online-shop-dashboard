import {makeStyles} from "@material-ui/styles";

export const useStyle = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        margin: theme.spacing(0, 3, 3, 3)
    },
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
    cover: {
        width: 132,
        height: 132,
        alignSelf: "center",
        marginTop: theme.spacing(3)
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
    },

}), {index: 1})