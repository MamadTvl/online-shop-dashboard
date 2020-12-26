import React, {useEffect, useState} from "react";
import {Button, CircularProgress, Grid, IconButton, Link, SvgIcon, Typography} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import {DecimalInput} from "react-hichestan-numberinput";
import InputAdornment from "@material-ui/core/InputAdornment";
import {useStyle} from "./Style";
import {useAxios} from "../../utills/Hooks/useAxios";

const incomes = {
    today: '۰',
    month: '۰',
    week: '۰',
    year: '۰',
}

function FianceSection() {
    const classes = useStyle()
    const [values, setValues] = useState({giftDelivery: 0, freeDelivery: 0})
    const [loading, setLoading] = useState(false)
    const handleChange = (props) => (event) => {
        setValues({...values, [props]: event.target.value})
    }
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

    const [{data: excelLink, loading: exportLoading}, exportExcel] = useAxios({
        url: '/admin/financial_mng/export_exel',
    })

    useEffect(() => {
        document.getElementById('gift-prefix').children[0]
            .style.fontFamily = 'Shabnam'
        document.getElementById('gift-prefix').children[0]
            .style.fontSize = '14px'
        document.getElementById('free-prefix').children[0]
            .style.fontFamily = 'Shabnam'
        document.getElementById('free-prefix').children[0]
            .style.fontSize = '14px'
    }, [])


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
    return (
        <Grid container spacing={3}>
            <Grid xs={12}>
                <div className={classes.header}>
                    <Typography className={classes.title}>امور مالی</Typography>
                    <Link
                        href={`${!exportLoading && excelLink !== undefined && excelLink.data.file_dir}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <IconButton>
                            <SvgIcon xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17">
                                <g id="common-file-text-download" transform="translate(-0.25 -0.25)">
                                    <circle id="Ellipse_128" data-name="Ellipse 128" cx="4.267" cy="4.267" r="4.267"
                                            transform="translate(8.217 8.217)" fill="none" stroke="#f16522"
                                            strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                                    <path id="Path_30125" data-name="Path 30125" d="M17.25,14.25v4.267"
                                          transform="translate(-4.767 -3.9)" fill="none" stroke="#f16522"
                                          strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                                    <path id="Path_30126" data-name="Path 30126" d="M16.6,19.6,15,18"
                                          transform="translate(-4.117 -4.983)" fill="none" stroke="#f16522"
                                          strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                                    <path id="Path_30127" data-name="Path 30127" d="M17.25,19.6l1.6-1.6"
                                          transform="translate(-4.767 -4.983)" fill="none" stroke="#f16522"
                                          strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                                    <path id="Path_30128" data-name="Path 30128" d="M3.75,6.75h7.467"
                                          transform="translate(-0.867 -1.733)" fill="none" stroke="#f16522"
                                          strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                                    <path id="Path_30129" data-name="Path 30129" d="M3.75,11.25H8.017"
                                          transform="translate(-0.867 -3.033)" fill="none" stroke="#f16522"
                                          strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                                    <path id="Path_30130" data-name="Path 30130" d="M3.75,15.75H6.417"
                                          transform="translate(-0.867 -4.333)" fill="none" stroke="#f16522"
                                          strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                                    <path id="Path_30131" data-name="Path 30131"
                                          d="M5.55,14.617H1.817A1.067,1.067,0,0,1,.75,13.55V1.817A1.067,1.067,0,0,1,1.817.75H9.375a1.067,1.067,0,0,1,.754.312L12.171,3.1a1.067,1.067,0,0,1,.312.754V5.55"
                                          fill="none" stroke="#f16522" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="1"/>
                                </g>
                            </SvgIcon>
                            <Typography
                                style={{
                                    color: '#F16522',
                                    fontSize: '14px',
                                    fontFamily: 'Shabnam',
                                    fontWeight: "bold",
                                    margin: '8px 8px'
                                }}
                                component={'span'}
                            >اکسپورت
                            </Typography>
                        </IconButton>
                    </Link>
                </div>
            </Grid>

            <Grid item xs={12} md={6}>
                <Paper elevation={3} className={classes.incomes}>
                    <Typography className={classes.label}>درآمد روزانه</Typography>
                    <Typography className={classes.toman}>{incomes.today} تومان</Typography>
                </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
                <Paper elevation={3} className={classes.incomes}>
                    <Typography className={classes.label}>درآمد ماهانه</Typography>
                    <Typography className={classes.toman}>{incomes.month} تومان</Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
                <Paper elevation={3} className={classes.incomes}>
                    <Typography className={classes.label}>درآمد هفتگی</Typography>
                    <Typography className={classes.toman}>{incomes.week} تومان</Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
                <Paper elevation={3} className={classes.incomes}>
                    <Typography className={classes.label}>درآمد سالانه</Typography>
                    <Typography className={classes.toman}>{incomes.year} تومان</Typography>
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