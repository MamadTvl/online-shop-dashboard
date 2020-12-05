import React, {useEffect, useState} from "react";
import Card from "@material-ui/core/Card";
import {CardContent, CardHeader, Typography} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Chip from "@material-ui/core/Chip";
import {DecimalInput} from "react-hichestan-numberinput";
import InputAdornment from "@material-ui/core/InputAdornment";
import PropTypes from "prop-types";
import {useStyle} from './Styles/ProductInfoStyle'

function ProductInfo(props) {
    const classes = useStyle()
    const
        {
            colorTags, sizeTags,
            setColorTags, setSizeTags,
            productInfoValues, setProductInfoValues
        } = props
    const [onColorInputClicked, setOnColorInputClicked] = useState(false)
    const [onSizeTagInputClicked, setOnSizeTagInputClicked] = useState(false)

    const createColorTag = (color) => {
        return <Chip
            dir={'ltr'}
            style={{
                fontFamily: 'Shabnam',
                fontSize: 16,
                color: 'white',
                backgroundColor: '#434343'
            }}
            color={'secondary'}
            label={color}
            onDelete={() => {
                setColorTags(prevState => {
                    prevState.delete(color)
                    return new Set(prevState)
                })

            }}
        />
    }
    const createSizeTag = (size) => {
        return <Chip
            dir={'ltr'}
            style={{
                fontFamily: 'Shabnam',
                fontSize: 16,
                color: 'white',
                backgroundColor: '#434343'
            }}
            color={'secondary'}
            label={size}
            onDelete={() => {
                setSizeTags(prevState => {
                    prevState.delete(size)
                    return new Set(prevState)
                })

            }}
        />
    }

    const handleChangeValues = (props) => (event) => {
        setProductInfoValues({...productInfoValues, [props]: event.target.value})
    }
    const addColorInputEvent = () => {
        if (!onColorInputClicked) {
            const colorInput = document.getElementById('product-color')
            colorInput.addEventListener('keyup', (event) => {
                if (event.keyCode === 13 && colorInput.value !== "") {
                    setColorTags(prevState => {
                        prevState.add(colorInput.value)
                        return new Set(prevState)
                    })
                    document.getElementById('product-color').value = ""

                }
            })
            setOnColorInputClicked(!onColorInputClicked)
        }
    }
    const addSizeTagInputEvent = () => {
        if (!onSizeTagInputClicked) {
            const tagInput = document.getElementById('product-size')
            tagInput.addEventListener('keyup', (event) => {
                if (event.keyCode === 13 && tagInput.value !== "") {
                    setSizeTags(prevState => {
                        prevState.add(tagInput.value)
                        return new Set(prevState)
                    })
                    document.getElementById('product-size').value = ""

                }
            })
            setOnSizeTagInputClicked(!onSizeTagInputClicked)
        }
    }
    //textField prefix style
    useEffect(() => {
        document.getElementById('prefix').children[0]
            .style.fontFamily = 'Shabnam'
        document.getElementById('prefix').children[0]
            .style.fontSize = '14px'
    }, [])


    return (
        <Card>
            <CardHeader
                title={<Typography className={classes.title}>اطلاعات محصول</Typography>}
            />
            <CardContent>
                <Typography className={classes.label}>عنوان محصول</Typography>
                <TextField
                    id={'product-title'}
                    placeholder={'عنوان محصول را وارد کنید'}
                    fullWidth
                    value={productInfoValues.title}
                    onChange={handleChangeValues('title')}
                    margin={'normal'}
                    InputProps={{
                        classes: {
                            input: classes.textField
                        }
                    }}
                    variant="outlined"
                />

                <Typography className={classes.label}>مشخصات محصول</Typography>
                <TextField
                    id={'product-detail'}
                    placeholder={'مشخصات کوتاه محصول را بنویسید'}
                    fullWidth
                    value={productInfoValues.detail}
                    onChange={handleChangeValues('detail')}
                    multiline
                    rows={3}
                    margin={'normal'}
                    InputProps={{
                        classes: {
                            input: classes.textField
                        }
                    }}
                    variant="outlined"
                />

                <Typography className={classes.label}>توضیحات کوتاه</Typography>
                <TextField
                    id={'product-describe'}
                    placeholder={'توضیحات کوتاه محصول را بنویسید'}
                    fullWidth
                    value={productInfoValues.describe}
                    onChange={handleChangeValues('describe')}
                    multiline
                    rows={6}
                    margin={'normal'}
                    InputProps={{
                        classes: {
                            input: classes.textField
                        }
                    }}
                    variant="outlined"
                />
                <div className={classes.root}>
                    <div style={{flexGrow: 3, marginLeft: 24}}>
                        <Typography className={classes.label}>قیمت محصول</Typography>
                        <TextField
                            id={'product-price'}
                            value={productInfoValues.price}
                            onChange={handleChangeValues('price')}
                            margin={'normal'}
                            fullWidth
                            InputProps={{
                                classes: {
                                    input: classes.textField,
                                    adornedStart: classes.textField,
                                },
                                style: {
                                    direction: 'ltr'
                                },
                                inputComponent: DecimalInput,
                                startAdornment: <InputAdornment id={'prefix'} classes={classes.textField}
                                                                position="start">تومان</InputAdornment>,
                            }}
                            variant="outlined"
                        />
                    </div>
                    <div style={{flexGrow: 1}}>
                        <Typography className={classes.label}>میزان تخفیف</Typography>
                        <TextField
                            id={'product-discount'}
                            value={productInfoValues.discount}
                            onChange={handleChangeValues('discount')}
                            placeholder={'0'}
                            margin={'normal'}
                            fullWidth
                            InputProps={{
                                classes: {
                                    input: classes.textField,
                                    adornedStart: classes.textField
                                },
                                style: {
                                    direction: 'ltr'
                                },
                                inputComponent: DecimalInput,
                                startAdornment: <InputAdornment position="start">%</InputAdornment>,

                            }}
                            variant="outlined"
                        />
                    </div>
                </div>

                <div className={classes.root}>
                    <div id={'colorTextField'} style={{flexGrow: 1, marginLeft: 24, maxWidth: "50%"}}>
                        <Typography className={classes.label}>رنگ ها</Typography>
                        <TextField
                            id={'product-color'}
                            onClick={addColorInputEvent}
                            placeholder={'رنگ را بنویسید و اینتر بزنید.'}
                            margin={'normal'}
                            fullWidth
                            InputProps={{
                                classes: {
                                    input: classes.textField
                                },
                            }}
                            variant="outlined"
                        />
                        <div>
                            {
                                [...colorTags].map((color) => (
                                    createColorTag(color)
                                ))
                            }
                        </div>
                    </div>
                    <div style={{flexGrow: 1, maxWidth: "50%"}}>
                        <Typography className={classes.label}>سایز</Typography>
                        <TextField
                            onClick={addSizeTagInputEvent}
                            id={'product-size'}
                            placeholder={'سایز را بنویسید و اینتر بزنید.'}
                            helperText={'برای بدون سایز - اینتر کنید'}
                            margin={'normal'}
                            fullWidth
                            InputProps={{
                                classes: {
                                    input: classes.textField
                                },
                            }}
                            FormHelperTextProps={{
                                style: {
                                    fontFamily: 'Shabnam',
                                    fontSize: 10,
                                    fontWeight: 500,
                                    textAlign: 'center'
                                }
                            }}
                            variant="outlined"
                        />

                        <div>
                            {
                                [...sizeTags].map((size) => (
                                    createSizeTag(size)
                                ))
                            }
                        </div>
                    </div>
                </div>

            </CardContent>
        </Card>
    )


}

ProductInfo.propTypes = {
    colorTags: PropTypes.any.isRequired,
    sizeTags: PropTypes.any.isRequired,
    setColorTags: PropTypes.func.isRequired,
    setSizeTags: PropTypes.func.isRequired,
    productInfoValues: PropTypes.object.isRequired,
    setProductInfoValues: PropTypes.func.isRequired,
};

export default ProductInfo