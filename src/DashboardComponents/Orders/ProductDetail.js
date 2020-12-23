import React from 'react'
import Card from "@material-ui/core/Card";
import {CardContent, CardHeader, CardMedia, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import img from '../../img/img.png'
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";

const useStyle = makeStyles((theme) => ({
    root: {
        display: "flex",
        direction: "ltr",
        marginBottom: theme.spacing(2)
    },
    title: {
        fontFamily: 'Shabnam',
        color: '#434343',
        fontSize: 20,
        fontWeight: "bold",

    },
    cover: {
        width: 172,
        height: 172,
        alignSelf: "center",
        flexGrow : 1
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

function createData(title, image, color, size, count, hasOffer, offer, price) {
    return {title, image, color, size, count, hasOffer, offer, price};
}

const cartContent = [
    createData(
        'کتانی نایک اسموکی Nike Smooky مدل لاین ۲۰۲۰ کد ۱۹۴۸۷', img,
        'مشکی', '۳۳', '۳', true, '%۱۵', '۲٫۶۵۹٫۰۰۰'),
    createData(
        'کتانی نایک اسموکی Nike Smooky مدل لاین ۲۰۲۰ کد ۱۹۴۸۷', img,
        'مشکی', '۳۳', '۳', true, '%۱۵', '۲٫۶۵۹٫۰۰۰'),
    createData(
        'کتانی نایک اسموکی Nike Smooky مدل لاین ۲۰۲۰ کد ۱۹۴۸۷', img,
        'مشکی', '۳۳', '۳', true, '%۱۵', '۲٫۶۵۹٫۰۰۰'),
]

function ProductDetail() {
    const classes = useStyle()

    return (
        <Card>
            <CardHeader
                title={<Typography className={classes.title}>محصولات سبد خرید</Typography>}
            />
            <CardContent>
                {
                    cartContent.map((cart) => (
                        <Card className={classes.root}>
                            <CardContent className={classes.detail}>
                                <Typography className={classes.productTitle}>{cart.title}</Typography>
                                <Grid container>
                                    <Grid xs={12}>
                                        <Typography
                                            style={{opacity: '68%'}}
                                            className={classes.productDetail}
                                            component={"span"}
                                        >
                                            {`رنگ  : ${cart.color} `}
                                        </Typography>

                                        <Typography
                                            style={{opacity: '68%'}}
                                            className={classes.productDetail}
                                            component={"span"}
                                        >
                                            {`سایز  : ${cart.size}`}
                                        </Typography>
                                    </Grid>
                                    {cart.hasOffer ?
                                        <Grid xs={12} dir={'ltr'}>
                                            <Chip style={{'background-color': '#F16522'}} className={classes.offer}
                                                  label={cart.offer}/>
                                            <br/>
                                            <Typography className={classes.title}
                                                        style={{fontSize: 24, textDecoration: 'line-through'}}
                                                        component={'span'}>{cart.price}</Typography>
                                        </Grid>
                                        : null
                                    }
                                    <Grid dir={'ltr'} xs={12}>
                                        <Typography className={classes.title} style={{fontSize: 24}} component={'span'}>
                                            {`${cart.price}`}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <CardMedia
                                className={classes.cover}
                                image={cart.image}
                                title={cart.title}
                            />
                        </Card>
                    ))
                }
            </CardContent>
        </Card>
    )
}


export default ProductDetail