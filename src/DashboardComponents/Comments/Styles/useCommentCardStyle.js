import {makeStyles} from "@material-ui/core/styles";

export const useCommentCardStyles = makeStyles((theme) => ({
    header: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    content: {
        display: "flex",
        flexDirection: 'row',
    },
    detail: {
        display: "flex",
    },
    title: {
        fontFamily: 'Shabnam',
        color: '#888888',
        fontSize: 12,
        margin: 'auto'
    },
    username: {
        fontFamily: 'Shabnam',
        color: '#444444',
        fontSize: 18,
        fontWeight: 500,
        // margin: theme.spacing(3, 3),
        float: "right"
    },
    statusText: {
        fontFamily: 'Shabnam',
        color: 'white',
        fontSize: 12,
        margin: '5px 5px 5px'
    },
    profile: {
        width: 96,
        height: 96
    },
    comment: {
        fontFamily: 'Shabnam',
        color: '#888888',
        fontSize: 16,
        float: "right",
        whiteSpace: 'pre-wrap'
    },
    actions: {
        alignItems: 'center',
        display: "flex",
        flexDirection: 'row-reverse',
        flexFlow: '70%',
        [theme.breakpoints.down("xs")]: {
            flexDirection: 'column-reverse',
            justifyContent: 'space-around'
        }
    },
    decline: {
        float: "left",
        backgroundColor: 'white',
        minWidth: 90,
        color: '#F16522',
        borderColor: '#F16522',
        borderWidth: '2px',
        fontSize: '12px',
        fontFamily: 'Shabnam',
    },
    accept: {
        minWidth: 90,
        margin: theme.spacing(0, 1),
        float: "left",
        backgroundColor: 'white',
        color: '#22B132',
        borderColor: '#22B132',
        borderWidth: '2px',
        fontSize: '12px',
        fontFamily: 'Shabnam',

    },
    statusRec: {
        minWidth: 80,
        maxHeight: 28,
        borderRadius: 4,
        display: "flex",
        justifyContent: 'center',
        marginRight: theme.spacing(1)
    },
    statusIcon: {
        marginBottom: 5,
        marginTop: 5,
        marginLeft: 5,
        width: 12,
        height: 12,
    }
}), {index: 1});