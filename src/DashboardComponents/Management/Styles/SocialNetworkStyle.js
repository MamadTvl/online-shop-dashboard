import {makeStyles} from "@material-ui/styles";

export const useStyle = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(0, 0, 0, 3),
        direction: "ltr",
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

}), {index: 1})