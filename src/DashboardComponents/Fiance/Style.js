import {makeStyles} from "@material-ui/styles";

export const useStyle = makeStyles(() => ({
    title: {
        fontFamily: 'Shabnam',
        color: '#434343',
        fontSize: 20,
        fontWeight: "bold",
        marginRight: 12,
        marginTop: 12,
    },
    label: {
        fontFamily: 'Shabnam',
        color: '#434343',
        fontSize: 32,
    },
    textField: {
        fontFamily: 'Shabnam',
        fontSize: 14,
    },
    number: {
        fontFamily: 'Shabnam',
        color: '#434343',
        fontSize: 48,
        fontWeight: 'bold',
    },
    toman: {
        fontFamily: 'Shabnam',
        color: '#434343',
        fontSize: 20,
    },
    export: {
        fontFamily: 'Shabnam',
        color: '#F16522',
        fontSize: 14,
        fontWeight: 'bold',
    },
    subTitle: {
        fontFamily: 'Shabnam',
        color: '#545454',
        fontSize: 14,
    },
    save: {
        // margin: theme.spacing(2, 3),
        // float: "left",

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
    incomes: {
        padding: 80,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },
    header: {
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
    },
    delivery: {
        display: "flex",
        flexDirection: 'column',
    }


}))