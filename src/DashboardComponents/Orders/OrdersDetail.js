import React from "react";
import {Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import CustomersInfo from "./CustomerInfo";
import OrderState from "./OrderState";
import ProductDetail from "./ProductDetail";
import CartDetail from "./CartDetail";
import CartCost from "./CartCost";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexGrow: 1,
        width: '100%',
        // justifyContent : "space-around",
    },
    container: {
        justifyContent: "space-around",
    },
    title: {
        fontFamily: 'Shabnam',
        color: '#434343',
        fontSize: 20,
        fontWeight: "bold",
        margin: theme.spacing(1, 5.25, 1, 1)
    },
    card: {
        // display : 'flex',
        padding: theme.spacing(10),
        textAlign: 'center',
    },
    gridRight: {
        flexBasis: '726px'
        // Width : '726px',

    },
    gridLeft: {
        flexBasis: '726px',
        marginBottom: theme.spacing(28)
        // Width : '386px',
    },
    state: {

        [theme.breakpoints.up("xs")]: {
            margin: theme.spacing(2, 1, 2)
        }
    },
    cartDetail: {
        [theme.breakpoints.up("xs")]: {
            margin: theme.spacing(2, 1, 2)
        }
    },
    cardCost: {
        [theme.breakpoints.up("xs")]: {
            margin: theme.spacing(2, 1, 2)
        }
    },
}), {index: 1});


function OrdersDetail(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>

            <Grid container direction={"row"} className={classes.container} spacing={2}>
                <Grid item md={12}>
                    <Typography className={classes.title}>{`جزئیات سفارش ${props.code}`}</Typography>
                </Grid>
                <Grid container xs={12} md={8} className={classes.gridRight} spacing={2}>
                    <Grid item xs={12} md={12}><CustomersInfo/></Grid>
                    <Grid item xs={12} md={12}><ProductDetail/></Grid>
                </Grid>
                <Grid container xs={12} md={4} className={classes.gridLeft}>
                    <Grid item xs={12} md={12} className={classes.state}><OrderState/></Grid>
                    <Grid item xs={12} md={12} className={classes.cartDetail}><CartDetail/></Grid>
                    <Grid item xs={12} md={12} className={classes.cardCost}><CartCost/></Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default OrdersDetail