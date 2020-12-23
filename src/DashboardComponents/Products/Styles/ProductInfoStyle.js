import {makeStyles} from "@material-ui/styles";

export const useStyle = makeStyles((theme) => ({
    root: {
        display: "flex",
        // direction: "ltr",
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
        width: 172,
        height: 172,
        alignSelf: "center",
        flexGrow: 1
    },
    detail: {
        direction: "rtl",
        // flexGrow  : 3,
    },
    productTitle: {
        fontFamily: 'Shabnam',
        color: '#434343',
        fontSize: 20,
        fontWeight: 500,
    },
    productDetail: {
        fontFamily: 'Shabnam',
        color: '#434343',
        fontSize: 16,
        fontWeight: 500,
    },
    offer: {
        fontFamily: 'Shabnam',
        fontSize: 16,
        color: "white",
        fontWeight: "bold"
    }

}), {index: 1})