import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    paper: {
        display: "flex",
        padding: theme.spacing(0.5),
    },
    title: {
        fontFamily: 'Shabnam',
        color: '#434343',
        fontSize: 20,
        fontWeight: "bold",
    },
    bannerName: {
        fontFamily: 'Shabnam',
        color: '#50525C',
        opacity: '0.7',
        fontSize: 14,
    },
    bannerDetail: {
        fontFamily: 'Shabnam',
        color: '#50525C',
        fontSize: 16,
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
    product: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        justifyContent: 'center',
        marginRight: theme.spacing(3)
    },
    textField: {
        fontFamily: 'Shabnam',
        fontSize: 14,
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
    },
    cover: {
        width: 275,
        height: 275,
        alignSelf: "center",
        marginRight: theme.spacing(2)
    },
    coverTitle: {
        fontFamily: 'Shabnam',
        color: '#434343',
        fontSize: 16,
    },
    coverSubTitle: {
        fontFamily: 'Shabnam',
        color: '#434343',
        opacity: '0.7',
        fontSize: 12,
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
    cardAction: {
        display: "flex",
        justifyContent: 'flex-end',

    },
}), {index: 1});