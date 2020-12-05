import {makeStyles} from "@material-ui/styles";

export const useStyle = makeStyles((theme) => ({
    root: {
        display: "flex",
        marginBottom: 12,
        justifyContent: "space-between",
    },
    title: {
        fontFamily: 'Shabnam',
        color: '#434343',
        fontSize: 20,
        fontWeight: "bold",

    },
    dialog: {
        padding: "8px 80px"
    },
    description: {
        fontFamily: 'Shabnam',
        color: '#434343',
        fontSize: 16,
        textAlign: 'center',

    },
    previewTitle: {
        fontFamily: 'Shabnam',
        color: '#434343',
        fontSize: 16,
        fontWeight: 400,
        position: "absolute",
        bottom: '79%',
        right: '33%',

    },
    upload: {
        margin: theme.spacing(2, 3),
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
    dialogButton: {
        backgroundColor: '#F16522',
        width: '331px',
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
    cover: {
        width: 64,
        height: 64,
        alignSelf: "center",
        marginRight: 16,
    },
    detail: {
        direction: "rtl",
        flexDirection: 'row',
        display: "inline-flex",
    },
    actions: {
        width: '72px',
        display: "flex",
        flexDirection: 'column',
        // padding : 0,
    },
    fileName: {
        display: "flex",
        flexGrow: 1,
        Width: '159px',
        flexWrap: "wrap",
        marginTop: 55,
        marginRight: 12,
        marginLeft: 107
        // padding : theme.spacing(6.25, 1.5, 0, 0)
    },
    addImage: {
        fontFamily: 'Shabnam',
        fontSize: 16,
        color: "#F16522",
    }

}))