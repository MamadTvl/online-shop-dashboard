import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
    },
    title: {
        fontFamily: 'Shabnam',
        color: '#434343',
        fontSize: 20,
        fontWeight: "bold",
    },
    bannerName: {
        fontFamily: 'Shabnam',
        color: '#434343',
        fontSize: 16,
    },
    bannerDetail: {
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
    textField: {
        fontFamily: 'Shabnam',
        fontSize: 14,
    },
    cover: {
        width: 116,
        height: 58,
        alignSelf: "center",
        marginRight: theme.spacing(2)
    },
    cardAction: {
        display: "flex",
        justifyContent: 'flex-end',

    },
    header: {
        display: "flex",
        justifyContent: "space-between",
    }
}), {index: 1});