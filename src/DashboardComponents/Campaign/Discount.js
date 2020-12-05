import React, {useEffect, useState} from "react";
import Card from "@material-ui/core/Card";
import {Button, CardContent, CardHeader, Grid, InputAdornment, Typography,CircularProgress} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import DateFormat from './DateFormat'
import {useStyle} from "./Styles/DiscountStyle";
import {DecimalInput} from "react-hichestan-numberinput";
import moment from "jalali-moment";
import {useAxios} from "../../utills/Hooks/useAxios";
import {useHistory, useLocation} from "react-router-dom"
import PropTypes from "prop-types";

function Discount(props) {
    const classes = useStyle()
    const location = useLocation()
    const history = useHistory()
    const {edit} = props
    const [loading, setLoading] = useState(false)
    const [values, setValues] = React.useState({
        code: '',
        percent: '0',
        date: '',
        usage: '',
    })

    const [, postDiscount] = useAxios({
        url: '/admin/discount_mng/create',
        method: 'POST',
    }, {manual: true})
    const [, pathDiscount] = useAxios({
        url: '/admin/discount_mng/update',
        method: 'PATCH',
    }, {manual: true})

    const handleChange = (value) => (event) => {
        setValues(prevState => {
            return {
                ...prevState,
                [value]: event.target.value,
            }
        })
    }
    const handleSubmit = async () => {
        setLoading(true)
        try {
            if (values.code !== '') {
                await postDiscount({
                    data: {
                        "code": values.code,
                        "expire_date": moment(values.date, 'jDD/jMM/jYYYY').unix(),
                        "discount_percent": parseInt(values.percent) / 100,
                        "usage_capacity": parseInt(values.usage)
                    }
                })
            } else {
                await postDiscount({
                    data: {
                        "expire_date": moment(values.date, 'jDD/jMM/jYYYY').unix(),
                        "discount_percent": parseInt(values.percent) / 100,
                        "usage_capacity": parseInt(values.usage)
                    }
                })
            }

        } catch (err) {
        }
        setLoading(false)
        history.push('/admin/dashboard/campaigns')
    }
    const handleEdit = async () => {
        setLoading(true)
        try {
            await pathDiscount({
                data: {
                    "id": location.state.id,
                    "expire_date": moment(values.date, 'jDD/jMM/jYYYY').unix(),
                    "discount_percent": parseInt(values.percent) / 100,
                    "usage_capacity": parseInt(values.usage)
                }
            })

        } catch (err) {
        }
        setLoading(false)
        history.push('/admin/dashboard/campaigns')
    }

    useEffect(() => {
        if (edit) {
            const discount = location.state
            setValues(prevState => {
                return {
                    ...prevState,
                    code: discount.code,
                    percent: (discount.discount_percent * 100).toString(),
                    date: moment.unix(discount.expire_date).format("jDD/jMM/jYYYY"),
                    usage: (discount.usage_capacity).toString(),
                }
            })
        }
    }, [edit, location.state])


    const discountItems = [
        {title: 'کد تخفیف', id: 'discountCode',},
        {title: 'میزان تخفیف', id: 'discountPercent',},
        {title: 'تاریخ انقضا', id: 'discountExpressionDate',},
        {title: 'تعداد استفاده', id: 'usageCapacity',}
    ]

    return (
        <>
            <Card>
                <CardHeader
                    title={<Typography className={classes.title}>ساخت کد تخفیف جدید</Typography>}
                />
                <CardContent>
                    <Grid container spacing={2}>
                        {
                            discountItems.map((item) => (
                                <Grid item xs={12} md={6}>
                                    <Typography className={classes.label}>{item.title}</Typography>
                                    {
                                        item.id === 'discountCode' ||
                                        item.id === 'usageCapacity' ?
                                            <TextField
                                                id={item.id}
                                                fullWidth
                                                value={item.id === 'discountCode' ? values.code : values.usage}
                                                onChange={handleChange(item.id === 'discountCode' ? 'code' : 'usage')}
                                                margin={'normal'}
                                                InputProps={{
                                                    classes: {
                                                        input: classes.textField
                                                    },
                                                    style: {
                                                        direction: 'ltr'
                                                    }
                                                }}
                                                variant="outlined"
                                            />

                                            :
                                            item.id === 'discountExpressionDate' ?
                                                <TextField
                                                    id={item.id}
                                                    fullWidth
                                                    value={values.date}
                                                    onChange={handleChange('date')}
                                                    margin={'normal'}
                                                    InputProps={{
                                                        classes: {
                                                            input: classes.textField
                                                        },
                                                        inputComponent: DateFormat
                                                    }}
                                                    variant="outlined"
                                                />
                                                :
                                                <TextField //percent
                                                    id={item.id}
                                                    fullWidth
                                                    value={values.percent}
                                                    onChange={handleChange('percent')}
                                                    placeholder={'0'}
                                                    margin={'normal'}
                                                    InputProps={{
                                                        classes: {
                                                            input: classes.textField,
                                                            adornedStart: classes.textField,
                                                        },
                                                        style: {
                                                            direction: 'ltr',
                                                        },
                                                        inputComponent: DecimalInput,
                                                        startAdornment: <InputAdornment
                                                            position={"start"}>%</InputAdornment>
                                                    }}
                                                    variant="outlined"
                                                />
                                    }
                                </Grid>
                            ))

                        }
                    </Grid>
                </CardContent>
            </Card>
            <div style={{position: 'relative', display: 'flex', float: 'left'}}>
                {
                    edit
                        ?
                        <Button disabled={loading} onClick={handleEdit} className={classes.save} variant={"contained"}>ویرایش
                            کد
                            تخفیف</Button>
                        :
                        <Button disabled={loading} onClick={handleSubmit} className={classes.save}
                                variant={"contained"}>ثبت
                            کد تخفیف</Button>
                }
                {loading && <CircularProgress size={38} className={classes.buttonProgress}/>}
            </div>

        </>
    )
}

Discount.propTypes = {
    edit: PropTypes.bool.isRequired,
};

export default Discount