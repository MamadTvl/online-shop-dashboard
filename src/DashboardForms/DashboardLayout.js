import React, {useState} from "react";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import {Hidden} from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import {useTheme} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import logo from "../img/zimmerman.svg";
import Divider from "@material-ui/core/Divider";
import DashboardMenu from "./DashboardMenu";
import {useLocation} from 'react-router-dom'
import {useStyles} from "./Styles/LayoutStyle";

function DashboardLayout(props) {
    const {window} = props
    const classes = useStyles();
    const theme = useTheme();
    const [isOpen, setOpen] = useState(false)

    const handleDrawerToggle = () => {
        setOpen(!isOpen)
    }

    const drawer = (
        <>
            <AppBar className={classes.appBarLogo}>
                <Toolbar>
                    <img className={classes.logo} src={logo} alt={'zimmerman'}/>
                </Toolbar>
            </AppBar>
            <Divider/>
            <DashboardMenu/>
        </>

    )
    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>

            <AppBar position="fixed" className={classes.appBar}>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    className={classes.menuButton}
                >
                    <MenuIcon/>
                </IconButton>
                {
                    useLocation().pathname === '/admin/dashboard' &&
                        <Typography className={classes.textStyle}>به پنل مدیریت فروشگاه خوش آمدید !
                        </Typography>

                }

            </AppBar>
            <nav className={classes.drawer} aria-label={"Dashboard"}>
                {/*Mobile Version*/}

                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'left' : 'right'}
                        open={isOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true,
                        }}
                    >
                        {drawer}
                    </Drawer>

                </Hidden>

                {/*Desktop Version*/}
                <Hidden xsDown implementation="css">
                    <Drawer variant="permanent" classes={{paper: classes.drawerPaper,}}>
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>

            <main className={classes.content}>
                <div className={classes.main}>
                    {props.children}
                </div>
            </main>
        </div>
    )

}

export default DashboardLayout