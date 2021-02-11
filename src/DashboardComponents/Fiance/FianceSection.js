import React, {useEffect, useState} from "react";
import {Button, CircularProgress, Grid, IconButton, Link, SvgIcon, Typography} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import {DecimalInput} from "react-hichestan-numberinput";
import InputAdornment from "@material-ui/core/InputAdornment";
import {useStyle} from "./Style";
import {useAxios} from "../../utills/Hooks/useAxios";
import {separateDigit} from "../../utills/ToFaDigit";

function FianceSection() {
    const classes = useStyle()
    const [values, setValues] = useState({giftDelivery: 0, freeDelivery: 0})
    const [loading, setLoading] = useState(false)
    const handleChange = (props) => (event) => {
        setValues({...values, [props]: event.target.value})
    }
    const [{data: indexData, loading: indexLoading}, ] = useAxios({
        url: '/admin/financial_mng',
    })
    const [{response: freeDeliveryResponse}, getFreeDelivery] = useAxios({
        url: '/admin/financial_mng/transmission_lb/get',
    })
    const [{response: giftDeliveryResponse}, getGiftDelivery] = useAxios({
        url: '/admin/financial_mng/gift_lb/get'
    })
    const [, updateFreeDelivery] = useAxios({
        url: '/admin/financial_mng/transmission_lb/update',
        method: "PATCH"
    }, {manual: true})

    const [, updateGiftDelivery] = useAxios({
        url: '/admin/financial_mng/gift_lb/update',
        method: "PATCH"
    }, {manual: true})

    useEffect(() => {
        if(!indexLoading){
            document.getElementById('gift-prefix').children[0]
                .style.fontFamily = 'Shabnam'
            document.getElementById('gift-prefix').children[0]
                .style.fontSize = '14px'
            document.getElementById('free-prefix').children[0]
                .style.fontFamily = 'Shabnam'
            document.getElementById('free-prefix').children[0]
                .style.fontSize = '14px'
        }
    }, [indexLoading])


    useEffect(() => {
        if (freeDeliveryResponse !== undefined && giftDeliveryResponse !== undefined) {
            console.log(freeDeliveryResponse)
            setValues({
                giftDelivery: giftDeliveryResponse.data.data.lb,
                freeDelivery: freeDeliveryResponse.data.data.lb
            })
        }
    }, [freeDeliveryResponse, giftDeliveryResponse])


    const submitHandler = async () => {
        try {
            setLoading(true)
            await updateFreeDelivery({
                data: {
                    "lb": values.freeDelivery,
                }
            })
            await updateGiftDelivery({
                data: {
                    "lb": values.giftDelivery
                }
            })
            getFreeDelivery()
            getGiftDelivery()
        } catch (err) {
        }
        setLoading(false)
    }
    if (indexLoading){
        return null
    }
    return (
        <Grid container spacing={3}>
            <Grid xs={12}>
                <div className={classes.header}>
                    <Typography className={classes.title}>امور مالی</Typography>
                </div>
            </Grid>

            <Grid item xs={12} md={6}>
                <Paper elevation={3} className={classes.incomes}>
                    <Typography className={classes.label}>درآمد روزانه</Typography>
                    <Typography className={classes.toman}>{separateDigit(indexData.data.daily_revenue)} تومان</Typography>
                </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
                <Paper elevation={3} className={classes.incomes}>
                    <Typography className={classes.label}>درآمد ماهانه</Typography>
                    <Typography className={classes.toman}>{separateDigit(indexData.data.monthly_revenue)} تومان</Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
                <Paper elevation={3} className={classes.incomes}>
                    <Typography className={classes.label}>درآمد هفتگی</Typography>
                    <Typography className={classes.toman}>{separateDigit(indexData.data.weekly_revenue)} تومان</Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
                <Paper elevation={3} className={classes.incomes}>
                    <Typography className={classes.label}>درآمد سالانه</Typography>
                    <Typography className={classes.toman}>{separateDigit(indexData.data.yearly_revenue)} تومان</Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
                <Paper elevation={3} className={classes.delivery}>
                    <Typography className={classes.title}>ارسال رایگان</Typography>
                    <Typography style={{marginRight: 14}} className={classes.subTitle}>حداقل مبلغ سبدخرید</Typography>
                    <div style={{margin: '12px 24px 24px 24px'}}>
                        <TextField
                            id={'free-delivery'}
                            value={values.freeDelivery}
                            onChange={handleChange('freeDelivery')}
                            margin={'normal'}
                            fullWidth
                            InputProps={{
                                classes: {
                                    input: classes.textField
                                },
                                style: {
                                    direction: 'ltr'
                                },
                                inputComponent: DecimalInput,
                                startAdornment: <InputAdornment id={'free-prefix'} classes={classes.textField}
                                                                position="start">تومان</InputAdornment>,
                            }}
                            variant="outlined"
                        />
                    </div>

                </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
                <Paper elevation={3} className={classes.delivery}>
                    <Typography className={classes.title}>ارسال هدیه</Typography>
                    <Typography style={{marginRight: 14}} className={classes.subTitle}>حداقل مبلغ سبدخرید</Typography>
                    <div style={{margin: '12px 24px 24px 24px'}}>
                        <TextField
                            id={'gift-delivery'}
                            value={values.giftDelivery}
                            onChange={handleChange('giftDelivery')}
                            margin={'normal'}
                            fullWidth
                            InputProps={{
                                classes: {
                                    input: classes.textField
                                },
                                style: {
                                    direction: 'ltr'
                                },
                                inputComponent: DecimalInput,
                                startAdornment: <InputAdornment id={'gift-prefix'} classes={classes.textField}
                                                                position="start">تومان</InputAdornment>,
                            }}
                            variant="outlined"
                        />
                    </div>
                </Paper>
            </Grid>
            <Grid xs={0} md={9}/>
            <Grid style={{position: 'relative',}} xs={12} item md={3}>
                <Button disabled={loading} onClick={submitHandler} fullWidth className={classes.save}
                        variant={"contained"}>ثبت اطلاعات</Button>
                {loading && <CircularProgress size={38} className={classes.buttonProgress}/>}
            </Grid>
        </Grid>
    )
}

export default FianceSection
