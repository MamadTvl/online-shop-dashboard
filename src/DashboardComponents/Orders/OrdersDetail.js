import React from "react";
import {Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import CustomersInfo from "./CustomerInfo";
import OrderState from "./OrderState";
import ProductDetail from "./ProductDetail";
import CartDetail from "./CartDetail";
import CartCost from "./CartCost";
import useOrderDetails from "./FetchData/useOrderDetails";

const useStyles = makeStyles((theme) => ({
    title: {
        fontFamily: 'Shabnam',
        color: '#434343',
        fontSize: 20,
        fontWeight: "bold",
    },
}), {index: 1});


function OrdersDetail({location}) {
    const classes = useStyles();
    const params = new URLSearchParams(location.search)
    const [orderLoading, orderResult] = useOrderDetails(true, params.get('id'))
    if (orderLoading)
        return null
    return (
        <Grid style={{padding: 32}} container direction={"row"} spacing={2}>
            <Grid item md={12}>
                <Typography className={classes.title}>{`جزئیات سفارش ${orderResult.unique_code}`}</Typography>
            </Grid>
            <Grid item sm={12} md={8}>
                <CustomersInfo
                    user={
                        orderResult.basket
                    }
                />
                <ProductDetail
                    products={orderResult.basket.boxes_list}
                />
            </Grid>
            <Grid item sm={12} md={4}>
                <OrderState
                    data={{
                        status: orderResult.status,
                        id: params.get('id'),
                    }}
                />
                <CartDetail
                    data={{
                        payment_date: orderResult.payment_date,
                        details: orderResult.basket.details,
                        hasGift: orderResult.basket.gift,
                    }}
                />
                <CartCost
                    data={{
                        amount: orderResult.amount,
                        productsCost: orderResult.basket.total_basket_price,
                        free_transmission: orderResult.basket.free_transmission,
                        discount: (orderResult.amount - orderResult.basket.total_basket_price),
                    }}
                />
            </Grid>
        </Grid>
    )
}

export default OrdersDetail
