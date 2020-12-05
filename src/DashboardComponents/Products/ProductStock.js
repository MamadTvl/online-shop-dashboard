import React, {useEffect} from "react";
import Card from "@material-ui/core/Card";
import {CardContent, CardHeader, Divider, Grid, Typography} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import {StyledRadio, StyledSwitch, useStyle} from "./Styles/ProductStockStyle";

function createData(color, size, count) {
    return {color, size, count};

}

function ProductStock(props) {
    const classes = useStyle()
    const
        {
            colorTags, sizeTags,
            stockValues, setStockValues,
            afterOrderValue, setAfterOrderValue,
            isExist, setIsExist,
            productType, setProductType
        } = props

    const getCountBack = (color, size, products) => {
        for (let i = 0; i < products.length; i++) {
            if (products[i].color === color && products[i].size === size) {
                return products[i].count
            }
        }
        return 0
    }


    useEffect(() => {
        if (colorTags.size !== 0 && sizeTags.size !== 0) {
            let copy = stockValues
            setStockValues([])
            for (let i = 0; i < [...colorTags].length; i++) {
                for (let j = 0; j < [...sizeTags].length; j++) {
                    setStockValues(prevState => {
                        return [...prevState,
                            createData([...colorTags][i],
                                [...sizeTags][j],
                                getCountBack([...colorTags][i], [...sizeTags][j], copy)
                            )]
                    })
                }
            }

        } else {
            setStockValues([])
        }
    }, [colorTags, sizeTags])


    const handleChangeRadio = (event) => {
        setProductType(event.target.value === 'در انبار' ? 1 : 2)
    };
    const handleChangeSwitch = (event) => {
        setIsExist(event.target.checked)
    };


    const handleChange = (props) => (event) => {
        setStockValues(() => {
            let changedProducts = [...stockValues]
            changedProducts[props].count = event.target.value
            return changedProducts
        })
    }
    const handleAfterOrderCount = (event) => {
        setAfterOrderValue(event.target.value)
    }

    const inStock = (
        <Grid direction={"row"} container className={classes.container}>
            <Grid container>
                <Grid item xs={4} style={{textAlign: 'center'}}>
                    <span className={classes.label}>رنگ</span>
                </Grid>
                <Grid item xs={4} style={{textAlign: 'center'}}>
                    <span className={classes.label}>سایز</span>
                </Grid>
                <Grid item xs={4} style={{textAlign: 'center'}}>
                    <span className={classes.label}>تعداد</span>
                </Grid>
            </Grid>
            {
                stockValues.map((product, index) => (
                    <Grid container spacing={1}>
                        <Grid item xs={4}>
                            <TextField
                                value={product.color}
                                margin={'normal'}
                                InputProps={{
                                    classes: {
                                        input: classes.textFieldColor
                                    }
                                }}
                                disabled
                                variant="outlined"

                            />
                        </Grid>
                        <Grid item xs={4} style={{textAlign: 'center'}}>
                            <TextField
                                value={product.size}

                                margin={'normal'}
                                InputProps={{
                                    classes: {
                                        input: classes.textFieldSize
                                    }
                                }}
                                variant="outlined"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={4} style={{textAlign: 'center'}}>
                            <TextField
                                helperText={'برای ناموجود 0 لحاظ کنید'}
                                margin={'normal'}
                                value={product.count}
                                onChange={handleChange(index)}
                                InputProps={{
                                    classes: {
                                        input: classes.textFieldCount
                                    }
                                }}
                                FormHelperTextProps={{
                                    style: {
                                        fontFamily: 'Shabnam',
                                        fontSize: 10,
                                        textAlign: 'center'
                                    }
                                }}
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                ))
            }

        </Grid>
    )


    const afterOrder = (
        <>
            <Typography className={classes.label}>تعداد</Typography>
            <TextField
                dir={'ltr'}
                id={'afterOrder-count'}
                margin={'normal'}
                fullWidth
                onChange={handleAfterOrderCount}
                value={afterOrderValue}
                InputProps={{
                    classes: {
                        input: classes.textFieldCount
                    }
                }}
                FormHelperTextProps={{
                    style: {
                        fontFamily: 'Shabnam',
                        fontSize: 14,
                        textAlign: 'right'
                    }
                }}
                variant="outlined"
            />

        </>
    )


    return (
        <Card>
            <CardHeader
                title={
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography className={classes.title}>موجودی</Typography>
                        <StyledSwitch
                            checked={isExist}
                            onChange={handleChangeSwitch}
                            name="موجودی"
                        />
                    </div>
                }

            />
            {
                isExist ?
                    <CardContent>

                        <StyledRadio
                            checked={productType == 1}
                            onChange={handleChangeRadio}
                            value="در انبار"
                            name="در انبار"
                            inputProps={{'aria-label': 'در انبار'}}
                        />
                        <span className={classes.label}>در انبار</span>
                        <StyledRadio
                            checked={productType == 2}
                            onChange={handleChangeRadio}
                            value="ساخت پس از سفارش"
                            name="ساخت پس از سفارش"
                            inputProps={{'aria-label': 'ساخت پس از سفارش'}}
                        />
                        <span className={classes.label}>ساخت پس از سفارش</span>
                        <Divider/>
                        <br/>
                        {
                            productType == 1 ?
                                stockValues.length > 0 ? inStock : null
                                :
                                afterOrder
                        }
                    </CardContent>
                    :
                    null
            }
        </Card>
    )
}

ProductStock.propTypes = {
    colorTags: PropTypes.any.isRequired,
    sizeTags: PropTypes.any.isRequired,

    stockValues: PropTypes.array.isRequired,
    setStockValues: PropTypes.func.isRequired,

    isExist: PropTypes.bool.isRequired,
    setIsExist: PropTypes.func.isRequired,

    afterOrderValue: PropTypes.string.isRequired,
    setAfterOrderValue: PropTypes.func.isRequired,
    productType: PropTypes.number.isRequired,
    setProductType: PropTypes.func.isRequired,
};

export default ProductStock