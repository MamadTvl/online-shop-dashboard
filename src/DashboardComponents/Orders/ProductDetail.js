import React from 'react'
import Card from "@material-ui/core/Card";
import {CardContent, CardHeader, CardMedia, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import Chip from "@material-ui/core/Chip";
import {separateDigit, toFaDigit} from "../../utills/ToFaDigit";

const useStyle = makeStyles((theme) => ({
    root: {
        display: "flex",
        marginBottom: theme.spacing(2),
        justifyContent: 'space-between',
        width: '100%',
    },
    title: {
        fontFamily: 'Shabnam',
        color: '#434343',
        fontSize: 20,
        fontWeight: "bold",
    },
    cover: {
        width: '10vw',
        height: '10vw',
        alignSelf: "center",
    },
    detail: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
    },
    productTitle: {
        fontFamily: 'Shabnam',
        color: '#545454',
        fontSize: 20,
        fontWeight: 500,
        lineHeight: '32px',
    },
    productDetail: {
        fontFamily: 'Shabnam',
        color: '#434343',
        fontSize: 16,
        fontWeight: 500,
        marginRight: 4
    },
    discountChip: {
        '&.MuiChip-root': {
            color: 'white',
            width: 43,
            height: 24,
            backgroundColor: '#F16522',
            fontFamily: 'Shabnam',
            fontWeight: 'bold',
            fontSize: 16,
            marginRight: 12,
            marginTop: 1,
        },

        '& .MuiChip-label': {
            padding: 0,
        }
    },
    price: {
        fontFamily: 'Shabnam',
        fontWeight: 'bold',
        fontSize: 24,
        color: '#343434'
    },

}), {index: 1})

function ProductDetail(props) {
    const classes = useStyle()

    return (
        <Card>
            <CardHeader
                title={<Typography className={classes.title}>محصولات سبد خرید</Typography>}
            />
            <CardContent>
                {
                    props.products.map((product) => (
                        <Card className={classes.root}>
                            <CardContent className={classes.detail}>
                                <div style={{display: 'flex'}}>
                                    <CardMedia
                                        className={classes.cover}
                                        image={product.merchandise.preview_image}
                                        title={product.merchandise.title}
                                    />
                                    <div style={{marginRight: 16}}>
                                        <Typography
                                            className={classes.productTitle}>{product.merchandise.title}</Typography>
                                        <div style={{marginTop: 16}}>
                                            <Typography
                                                style={{opacity: '68%'}}
                                                className={classes.productDetail}
                                                component={"span"}
                                            >
                                                {`رنگ  : ${product.color} `}
                                            </Typography>

                                            <Typography
                                                style={{opacity: '68%'}}
                                                className={classes.productDetail}
                                                component={"span"}
                                            >
                                                {`سایز  : ${product.size}`}
                                            </Typography>
                                            <br/>
                                            <Typography
                                                style={{opacity: '68%'}}
                                                className={classes.productDetail}
                                                component={"span"}
                                            >
                                                {`تعداد  : ${toFaDigit(product.count.toString())}`}
                                            </Typography>
                                        </div>
                                    </div>
                                </div>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-end',
                                }}>
                                    {
                                        product.merchandise.has_discount &&
                                        <div style={{display: 'flex'}}>
                                            <Typography
                                                className={classes.price}
                                                style={{fontSize: 20, textDecoration: 'line-through', opacity: 0.6}}
                                                component={'span'}
                                            >
                                                {`${separateDigit(product.merchandise_price)}`}
                                            </Typography>
                                            <Chip
                                                style={{'background-color': '#F16522'}}
                                                className={classes.discountChip}
                                                label={
                                                    `٪${toFaDigit((product.merchandise_percent_of_discount * 100).toString())}`
                                                }
                                            />
                                        </div>
                                    }
                                    <div>
                                        <Typography
                                            className={classes.price}
                                            component={'span'}
                                        >
                                            {`${separateDigit(product.merchandise_price_with_discount)}`}
                                        </Typography>
                                        <span style={{
                                            fontFamily: 'Shabnam',
                                            fontSize: 14,
                                            color: '#545454',
                                            marginRight: 6,
                                        }}>
                                            تومان
                                        </span>
                                    </div>
                                </div>
                            </CardContent>

                        </Card>
                    ))
                }
            </CardContent>
        </Card>
    )
}


export default ProductDetail
