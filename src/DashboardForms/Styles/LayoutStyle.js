import {makeStyles} from "@material-ui/core/styles";


const drawerWidth = 240

export const useStyles = makeStyles((theme) => ({
    root: {

    },
    appBar: {
        display: "block",
        color: '#5C5C5C',
        fontFamily: '',
        fontSize: '16px',
        background: 'white',
        padding: theme.spacing(3.5),
        height: '80px',
        width: "100%",
        boxShadow: '10px rgb(0, 0, 0)',
        [theme.breakpoints.up('xs')]: {
            marginLeft: 0,
        },
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginRight: drawerWidth,
        }
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    drawerPaper: {
        width: drawerWidth,
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        '&::-webkit-scrollbar': {
            display: "none"
        }
    },
    toolbar: theme.mixins.toolbar,
    appBarLogo: {
        //for keep it fix on bottom and necessary for content to be below bar
        offset: theme.mixins.toolbar,
        position: 'sticky',
        display: 'flex',
        width: drawerWidth,
        alignItems: 'center',
        background: '#FFFFFF',
        padding: theme.spacing(1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    logo: {
        width: 175,
    },
    main: {
        // display: 'flex',
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(0, 2),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        display: 'flex',
        position: "relative",
        flexGrow: 1,
        backgroundColor: "#F9F9FC",
        flexBasis: '100%',
        padding: theme.spacing(17, 0, 0, 0),
        [theme.breakpoints.up('sm')]: {
            padding: theme.spacing(17, 30, 0, 0),
        },
    },
    textStyle: {
        color: '#5C5C5C',
        fontFamily: "Shabnam",
        fontSize: "16px",
        direction: "rtl",
        textAlign: "right",
        display: "inline-flex"
    },
    menuButton: {
        justifyContent: 'flex-start',
        color: '#424242',
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
}));