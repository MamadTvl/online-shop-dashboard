import React from "react";
import Card from "@material-ui/core/Card";
import {CardContent, CardHeader, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    title: {
        fontFamily: 'Shabnam',
        color: '#434343',
        fontSize: 20,
        fontWeight: "bold",
    },
    subTitle : {
        marginTop : 0,
        fontFamily: 'Shabnam',
        color: '#50525C',
        opacity : '70%',
        fontSize: 14,
        marginBottom : theme.spacing(1),
    },
    body : {
        fontFamily: 'Shabnam',
        color: '#50525C',
        fontSize: 16,
        marginBottom : theme.spacing(3),

    }
}), {index: 1});

const cardDetail = {
    description : 'لطفا تمامی کقش‌ها در سایز ۴۴ باشند.',
    date : '۹۸/۱۱/۱۲'
}


function CartDetail() {
    const classes = useStyles()

    return(
        <Card>
            <CardHeader
            title={
                <Typography className={classes.title}>جزئیات سبد خرید</Typography>
            }
            />
            <CardContent>
                <Typography className={classes.subTitle}>توضیحات</Typography>
                <Typography className={classes.body}>{cardDetail.description}</Typography>
                <Typography className={classes.subTitle}>تاریخ ثبت سبد خرید</Typography>
                <Typography className={classes.body}>{cardDetail.date}</Typography>
            </CardContent>
        </Card>
    )


}

export default CartDetail