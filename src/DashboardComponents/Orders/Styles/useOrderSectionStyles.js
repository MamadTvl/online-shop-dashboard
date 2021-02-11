import {makeStyles} from "@material-ui/core/styles";

export const useOrderSectionStyles = makeStyles((theme) => ({
    table: {
        minWidth: '100%',
    },
    paper: {
        paddingTop: theme.spacing(0),
    },
    exportLink: {
        '&:hover': {
            textDecoration: 'none',
        }
    },
    title: {
        fontFamily: 'Shabnam',
        color: '#434343',
        fontSize: 20,
        fontWeight: "bold",
        margin: theme.spacing(3, 3),
        float: "right"
    },
    state: {
        fontFamily: 'Shabnam',
        fontSize: 14,
        color: "white",
    },
    tablePaginationRoot: {
        position: "fixed",
        left: 0,

    },
    caption: {
        fontFamily: 'Shabnam',
    },
    toolbar: {
        fontFamily: 'Shabnam',
    },
    export: {
        margin: theme.spacing(1, 3, 3),
        float: "left"
    }
}), {index: 1});
